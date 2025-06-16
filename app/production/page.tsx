"use client"

import { useState } from "react"
import { Play, Pause, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"

const categories = ["All", "Fashion Films", "Commercial", "Music Videos", "Documentary", "Brand Stories"]

const videoItems = [
  {
    id: 1,
    category: "Fashion Films",
    title: "Ethereal Elegance",
    duration: "2:34",
    thumbnail: "/placeholder.svg?height=400&width=600",
    description: "A cinematic journey through modern fashion aesthetics",
  },
  {
    id: 2,
    category: "Commercial",
    title: "Brand Evolution",
    duration: "1:45",
    thumbnail: "/placeholder.svg?height=400&width=600",
    description: "Corporate storytelling that connects with audiences",
  },
  {
    id: 3,
    category: "Music Videos",
    title: "Rhythm & Light",
    duration: "3:22",
    thumbnail: "/placeholder.svg?height=400&width=600",
    description: "Visual symphony combining music and motion",
  },
  {
    id: 4,
    category: "Documentary",
    title: "Behind the Lens",
    duration: "4:18",
    thumbnail: "/placeholder.svg?height=400&width=600",
    description: "Authentic stories from the creative process",
  },
  {
    id: 5,
    category: "Brand Stories",
    title: "Heritage Craft",
    duration: "2:56",
    thumbnail: "/placeholder.svg?height=400&width=600",
    description: "Celebrating traditional craftsmanship in modern times",
  },
  {
    id: 6,
    category: "Fashion Films",
    title: "Urban Poetry",
    duration: "3:12",
    thumbnail: "/placeholder.svg?height=400&width=600",
    description: "Street fashion meets cinematic storytelling",
  },
  {
    id: 7,
    category: "Commercial",
    title: "Innovation Showcase",
    duration: "1:28",
    thumbnail: "/placeholder.svg?height=400&width=600",
    description: "Highlighting cutting-edge technology and design",
  },
  {
    id: 8,
    category: "Music Videos",
    title: "Neon Dreams",
    duration: "4:05",
    thumbnail: "/placeholder.svg?height=400&width=600",
    description: "Vibrant visuals synchronized with electronic beats",
  },
  {
    id: 9,
    category: "Documentary",
    title: "Artist's Journey",
    duration: "5:33",
    thumbnail: "/placeholder.svg?height=400&width=600",
    description: "Following creative minds through their artistic process",
  },
]

export default function ProductionPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [playingVideo, setPlayingVideo] = useState<number | null>(null)
  const [mutedVideos, setMutedVideos] = useState<Set<number>>(new Set())

  const filteredItems =
    activeCategory === "All" ? videoItems : videoItems.filter((item) => item.category === activeCategory)

  const togglePlay = (videoId: number) => {
    setPlayingVideo(playingVideo === videoId ? null : videoId)
  }

  const toggleMute = (videoId: number) => {
    const newMutedVideos = new Set(mutedVideos)
    if (newMutedVideos.has(videoId)) {
      newMutedVideos.delete(videoId)
    } else {
      newMutedVideos.add(videoId)
    }
    setMutedVideos(newMutedVideos)
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-light mb-6">Production</h1>
          <div className="w-16 h-0.5 bg-gradient-to-r from-[#f29f05] to-[#f27405] mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Cinematic storytelling through motion, creating compelling video content that brings brands and stories to
            life.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 transition-all duration-300 ${
                activeCategory === category
                  ? "bg-[#f29f05] text-white hover:bg-[#f27405]"
                  : "border-[#f29f05] text-[#f29f05] hover:bg-[#f29f05] hover:text-white"
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className="group cursor-pointer animate-fade-in-on-scroll"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div className="relative aspect-video overflow-hidden rounded-xl bg-gray-100 mb-4">
                {/* Video Thumbnail */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                  style={{ backgroundImage: `url(${item.thumbnail})` }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />

                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={() => togglePlay(item.id)}
                    className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center transform group-hover:scale-110 transition-all duration-300 shadow-lg"
                  >
                    {playingVideo === item.id ? (
                      <Pause className="h-6 w-6 text-gray-800 ml-0" />
                    ) : (
                      <Play className="h-6 w-6 text-gray-800 ml-1" />
                    )}
                  </button>
                </div>

                {/* Duration Badge */}
                <div className="absolute top-4 right-4 bg-black/70 text-white text-sm px-2 py-1 rounded">
                  {item.duration}
                </div>

                {/* Controls */}
                <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleMute(item.id)
                    }}
                    className="w-8 h-8 bg-black/70 text-white rounded-full flex items-center justify-center hover:bg-black/90 transition-colors"
                  >
                    {mutedVideos.has(item.id) ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Video Info */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-medium text-gray-900 group-hover:text-[#f29f05] transition-colors">
                    {item.title}
                  </h3>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">{item.category}</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-16">
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-[#f29f05] text-[#f29f05] hover:bg-[#f29f05] hover:text-white transition-all duration-300"
          >
            Load More Videos
          </Button>
        </div>

        {/* Video Stats */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl">
            <div className="text-3xl font-light text-[#f29f05] mb-2">50+</div>
            <div className="text-gray-600">Videos Produced</div>
          </div>
          <div className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl">
            <div className="text-3xl font-light text-[#f27405] mb-2">2M+</div>
            <div className="text-gray-600">Total Views</div>
          </div>
          <div className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl">
            <div className="text-3xl font-light text-[#f24405] mb-2">25+</div>
            <div className="text-gray-600">Brand Partners</div>
          </div>
        </div>
      </div>
    </div>
  )
}
