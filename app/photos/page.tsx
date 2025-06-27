"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
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
const categories = [
	{ label: "All", folder: null },
	{ label: "Corporate", folder: "Corprate" },
	{ label: "Fashion", folder: "Fashion" },
	{ label: "Food Photography", folder: "Food Photography" },
	{ label: "Moments", folder: "Moments" },
	{ label: "Portraits", folder: "Portraits" },
	{ label: "Product Photography", folder: "Product Photography" },
]

// Number of photos to load per batch
const PHOTOS_PER_LOAD = 14

export default function PhotosPage() {
	const [activeCategory, setActiveCategory] = useState<string>("All")
	const [loadedCount, setLoadedCount] = useState(PHOTOS_PER_LOAD)
	const [fullscreenPhoto, setFullscreenPhoto] = useState<null | string>(null)
	const [imageSizes, setImageSizes] = useState<Record<string, { width: number; height: number }>>({})

	// Get the photo list for the current category from the manifest
	let photos: string[] = []
	if (activeCategory === "All") {
		photos = categories
			.filter((c) => c.folder)
			.flatMap((cat) => photoManifest[cat.folder as keyof PhotoManifest] || [])
			.filter((src): src is string => typeof src === "string")
			.slice(0, loadedCount)
	} else {
		const folder = categories.find((c) => c.label === activeCategory)?.folder
		if (folder) {
			photos = (photoManifest[folder as keyof PhotoManifest] || [])
				.filter((src): src is string => typeof src === "string")
				.slice(0, loadedCount)
		}
	}

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

	function getCollageClasses(index: number) {
		// First row: always 1x1 to fill the grid
		if (index < 4) return "row-span-1 col-span-1"
		// Collage pattern for the rest
		if (index % 6 === 1) return "row-span-1 col-span-1"
		if (index % 6 === 2) return "row-span-2 col-span-1"
		if (index % 6 === 3) return "row-span-1 col-span-2"
		if (index % 6 === 4) return "row-span-1 col-span-1"
		return "row-span-1 col-span-1"
	}

	return (
		<div className="min-h-screen pt-24 pb-16 bg-background text-foreground">
			<div className="max-w-7xl mx-auto px-4">
				{/* Header */}
				<div className="text-center mb-16">
					<h1 className="text-4xl md:text-6xl font-light mb-6">Photos</h1>
					<div className="w-16 h-0.5 bg-gradient-to-r from-[#8305a6] to-[#442273] mx-auto mb-6"></div>
					<p className="text-lg text-muted-foreground max-w-2xl mx-auto">
						A curated collection of visual stories, each frame carefully crafted to capture emotion, beauty, and
						authenticity.
					</p>
				</div>

				{/* Filter Buttons */}
				<div className="flex flex-wrap justify-center gap-4 mb-12">
					{categories.map((category) => (
						<Button
							key={category.label}
							variant={activeCategory === category.label ? "default" : "outline"}
							onClick={() => {
								setActiveCategory(category.label)
								setLoadedCount(PHOTOS_PER_LOAD)
							}}
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

				{/* Natural Collage Photo Grid */}
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

				{/* Load More */}
				<div className="text-center mt-16">
					<Button
						variant="outline"
						size="lg"
						className="border-2 border-[#8305a6] text-[#8305a6] hover:bg-[#8305a6] hover:text-white transition-all duration-300"
						onClick={() => setLoadedCount(loadedCount + PHOTOS_PER_LOAD)}
						disabled={
							activeCategory === "All"
								? photos.length >= categories
										.filter((c) => c.folder)
										.reduce((acc, cat) => acc + (photoManifest[cat.folder as keyof PhotoManifest] || []).length, 0)
								: photos.length >= (photoManifest[categories.find((c) => c.label === activeCategory)?.folder as keyof PhotoManifest] || []).length
						}
					>
						Load More Photos
					</Button>
				</div>
			</div>
		</div>
	)
}
