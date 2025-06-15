"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const categories = ["All", "Fashion", "Lifestyle", "Commercial", "Portrait"]

const portfolioItems = [
  { id: 1, category: "Fashion", title: "Urban Elegance", image: "/placeholder.svg?height=600&width=400" },
  { id: 2, category: "Lifestyle", title: "Morning Light", image: "/placeholder.svg?height=600&width=400" },
  { id: 3, category: "Commercial", title: "Brand Story", image: "/placeholder.svg?height=600&width=400" },
  { id: 4, category: "Portrait", title: "Character Study", image: "/placeholder.svg?height=600&width=400" },
  { id: 5, category: "Fashion", title: "Minimalist Chic", image: "/placeholder.svg?height=600&width=400" },
  { id: 6, category: "Lifestyle", title: "Golden Hour", image: "/placeholder.svg?height=600&width=400" },
  { id: 7, category: "Commercial", title: "Product Essence", image: "/placeholder.svg?height=600&width=400" },
  { id: 8, category: "Portrait", title: "Authentic Moments", image: "/placeholder.svg?height=600&width=400" },
  { id: 9, category: "Fashion", title: "Street Couture", image: "/placeholder.svg?height=600&width=400" },
  { id: 10, category: "Lifestyle", title: "Natural Beauty", image: "/placeholder.svg?height=600&width=400" },
  { id: 11, category: "Commercial", title: "Brand Vision", image: "/placeholder.svg?height=600&width=400" },
  { id: 12, category: "Portrait", title: "Soul Capture", image: "/placeholder.svg?height=600&width=400" },
]

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("All")

  const filteredItems =
    activeCategory === "All" ? portfolioItems : portfolioItems.filter((item) => item.category === activeCategory)

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-light mb-6">Portfolio</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A collection of visual stories, each frame carefully crafted to capture emotion, beauty, and authenticity.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className="px-6 py-2"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="group cursor-pointer"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />
                <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-white">
                    <h3 className="text-lg font-medium mb-1">{item.title}</h3>
                    <p className="text-sm opacity-90">{item.category}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-16">
          <Button variant="outline" size="lg">
            Load More Work
          </Button>
        </div>
      </div>
    </div>
  )
}
