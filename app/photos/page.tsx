"use client"

import { useState, useEffect, useLayoutEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import photoManifestJson from "../../photoManifest.json"

type PhotoManifest = {
	Corprate: string[]
	Fashion: string[]
	"Food Photography": string[]
	Moments: string[]
	Portraits: string[]
	"Product Photography": string[]
}

const photoManifest = photoManifestJson as PhotoManifest

// Define your categories and their folder names
const categories: { label: string; folder: string | null; cover?: string }[] = [
	{ label: "All", folder: null },
	{ label: "Corporate", folder: "Corprate", cover: "/photos/Photography/Corprate/main-corporate.jpg" },
	{ label: "Fashion", folder: "Fashion", cover: "/photos/Photography/Fashion/main-fashion.jpg" },
	{ label: "Food Photography", folder: "Food Photography", cover: "/photos/Photography/Food Photography/main-food.jpg" },
	{ label: "Moments", folder: "Moments", cover: "/photos/Photography/Moments/main-moments.JPG" },
	{ label: "Portraits", folder: "Portraits", cover: "/photos/Photography/Portraits/main-portrait.jpg" },
	{ label: "Product Photography", folder: "Product Photography", cover: "/photos/Photography/Product Photography/main-product.jpg" },
]

// Number of photos to load per batch
const PHOTOS_PER_PAGE = 20

export default function PhotosPage() {
	const [activeCategory, setActiveCategory] = useState<string>("All")
	const [page, setPage] = useState(0)
	const [fullscreenPhoto, setFullscreenPhoto] = useState<null | string>(null)
	const [imageSizes, setImageSizes] = useState<Record<string, { width: number; height: number }>>({})

	useLayoutEffect(() => {
		const apply = () => {
			const value = new URLSearchParams(window.location.search).get("category")
			const match = categories.find((category) => category.label === value)
			setActiveCategory(match ? match.label : "All")
			setPage(0)
		}
		apply()
		window.addEventListener("popstate", apply)
		return () => window.removeEventListener("popstate", apply)
	}, [])

	const openCategory = (label: string) => {
		setActiveCategory(label)
		setPage(0)
		setFullscreenPhoto(null)
		const url = label === "All" ? "/photos" : `/photos?category=${encodeURIComponent(label)}`
		window.history.pushState({}, "", url)
	}

	// Landing shows one cover per gallery. A selected category shows that gallery only.
	let allPhotos: string[] = []
	if (activeCategory !== "All") {
		const folder = categories.find((c) => c.label === activeCategory)?.folder
		if (folder) {
			allPhotos = (photoManifest[folder as keyof PhotoManifest] || [])
				.filter((src): src is string => typeof src === "string")
		}
	}
	const totalPages = Math.ceil(allPhotos.length / PHOTOS_PER_PAGE)
	const photos = allPhotos.slice(page * PHOTOS_PER_PAGE, (page + 1) * PHOTOS_PER_PAGE)

	// Dynamically get image sizes for natural collage effect
	useEffect(() => {
		const newSizes: Record<string, { width: number; height: number }> = {}
		let isMounted = true

		async function fetchSizes() {
			await Promise.all(
				photos.map(
					(src) =>
						new Promise<void>((resolve) => {
							const img = new window.Image()
							img.src = src
							img.onload = () => {
								if (isMounted) {
									newSizes[src] = { width: img.naturalWidth, height: img.naturalHeight }
								}
								resolve()
							}
							img.onerror = () => resolve()
						})
				)
			)
			if (isMounted) setImageSizes((prev) => ({ ...prev, ...newSizes }))
		}

		fetchSizes()
		return () => {
			isMounted = false
		}
	}, [photos])

	return (
		<div className="min-h-screen pt-24 pb-16 bg-background text-foreground">
			<div className="max-w-7xl mx-auto px-4">
				{/* Header */}
				<div className="text-center mb-16">
					<h1 className="text-4xl md:text-6xl font-light mb-6">Photos</h1>
					<p className="text-lg text-gray-600 max-w-2xl mx-auto">
						Each series opens its own gallery.
					</p>
				</div>

				{/* Filter Buttons */}
				<div className="flex flex-wrap justify-center gap-4 mb-12">
					{categories.map((category) => (
						<Button
							key={category.label}
							variant={activeCategory === category.label ? "default" : "outline"}
							onClick={() => openCategory(category.label)}
							className={`px-6 py-2 transition-all duration-300 ${
								activeCategory === category.label
									? "bg-[#8305a6] text-white hover:bg-[#442273]"
									: "border-[#8305a6] text-[#8305a6] hover:bg-[#8305a6] hover:text-white"
							}`}
						>
							{category.label}
						</Button>
					))}
				</div>

				{activeCategory === "All" ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{categories
							.filter((category) => category.cover)
							.map((category) => (
								<Link
									key={category.label}
									href={`/photos?category=${encodeURIComponent(category.label)}`}
									onClick={(event) => {
										if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return
										event.preventDefault()
										openCategory(category.label)
									}}
									className="group relative aspect-[16/9] overflow-hidden rounded-2xl shadow-lg"
								>
									<Image
										src={category.cover!}
										alt={category.label}
										fill
										className="object-cover grayscale transition-all duration-700 group-hover:grayscale-0"
										sizes="(max-width: 768px) 90vw, 400px"
									/>
									<div className="absolute inset-0 flex items-center justify-center bg-black/60 transition-all duration-500 group-hover:bg-black/0">
										<span className="px-4 text-center text-4xl font-bold text-white transition-all duration-500 group-hover:scale-90 group-hover:opacity-0">
											{category.label}
										</span>
									</div>
								</Link>
							))}
					</div>
				) : (
				<div className="flex flex-wrap gap-3 md:gap-4 justify-center">
					{photos.map((src, index) => {
						const size = imageSizes[src]
						const aspect = size ? size.width / size.height : 1
						const width = size ? Math.round(180 * aspect) : 180
						const height = 180

						return (
							<div
								key={src}
								className="relative cursor-pointer group overflow-hidden rounded-lg bg-black"
								style={{
									width: `${width}px`,
									height: `${height}px`,
									flex: "0 0 auto",
								}}
								onClick={() => setFullscreenPhoto(src)}
							>
								<Image
									src={src}
									alt=""
									fill
									className="object-contain object-center transition-transform duration-700"
									sizes={`${width}px`}
									priority={index < 8}
								/>
								<div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
							</div>
						)
					})}
				</div>
				)}

				{/* Pagination Controls */}
				{activeCategory !== "All" && totalPages > 1 && (
				<div className="flex justify-center items-center gap-6 mt-16">
					<Button
						variant="outline"
						size="lg"
						className="border-2 border-[#8305a6] text-[#8305a6] hover:bg-[#8305a6] hover:text-white transition-all duration-300"
						onClick={() => setPage((p) => Math.max(0, p - 1))}
						disabled={page === 0}
					>
						Previous
					</Button>
					<span className="text-lg text-gray-600">
						Page {page + 1} of {totalPages}
					</span>
					<Button
						variant="outline"
						size="lg"
						className="border-2 border-[#8305a6] text-[#8305a6] hover:bg-[#8305a6] hover:text-white transition-all duration-300"
						onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
						disabled={page >= totalPages - 1}
					>
						Next
					</Button>
				</div>
				)}

				{/* Fullscreen Modal */}
				{fullscreenPhoto && (
					<div
						className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm"
						onClick={() => setFullscreenPhoto(null)}
					>
						<div className="relative w-full h-full flex items-center justify-center">
							<Image
								src={fullscreenPhoto}
								alt=""
								fill
								className="object-contain"
								priority
							/>
							<button
								className="absolute top-8 right-8 text-white text-3xl font-bold bg-black/60 rounded-full px-4 py-2 hover:bg-black/80 transition"
								onClick={(e) => {
									e.stopPropagation()
									setFullscreenPhoto(null)
								}}
								aria-label="Close"
							>
								×
							</button>
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
