"use client"

import { useState } from "react"
import { Play } from "lucide-react"
import { Button } from "@/components/ui/button"

type Project = {
  title: string
  description: string
  category: string
  videoUrl?: string
  thumbnail?: string
  details?: string[]
}

const projects: Project[] = [
  {
    title: "Boomph – Live Session",
    category: "Music / Live Session",
    description:
      "Recorded a live session with the Syrian rapper Bitter Mouthfeel using 3 Sony a7 IV and a 360 camera.",
    videoUrl: "", // Add video link if available
    thumbnail: "/projects/boomph.jpg", // Replace with your actual thumbnail
  },
  {
    title: "EGA – Break The Mold",
    category: "Commercial",
    description:
      "Produced 'Break The Mold' campaign video with Burson Agency.",
    videoUrl: "",
    thumbnail: "/projects/ega.jpg",
  },
  {
    title: "Isuzu – Ad",
    category: "Commercial",
    description:
      "Director assistant on an Isuzu ad.",
    videoUrl: "",
    thumbnail: "/projects/isuzu.jpg",
  },
  {
    title: "The Journey of Happiness / Wedding Promo / Alaa Khashi",
    category: "Event / Wedding",
    description:
      "Filmed using Canon Mark4. (We can drop this video if needed.)",
    videoUrl: "",
    thumbnail: "/projects/journey-of-happiness.jpg",
  },
  {
    title: "Jetex – FIFA",
    category: "Commercial",
    description:
      "Producer with Flick for Jetex FIFA campaign.",
    videoUrl: "",
    thumbnail: "/projects/jetex.jpg",
  },
  {
    title: "Lucid",
    category: "Commercial",
    description:
      "Producer with Burson Agency.",
    videoUrl: "",
    thumbnail: "/projects/lucid.jpg",
  },
  {
    title: "Sing in The Sky",
    category: "Music / Live Event",
    description:
      "Director Assistant.",
    videoUrl: "",
    thumbnail: "/projects/sing-in-the-sky.jpg",
  },
  {
    title: "How To Series",
    category: "Educational / Series",
    description:
      "Created a 10-episode tips series.",
    videoUrl: "",
    thumbnail: "/projects/how-to-series.jpg",
  },
  {
    title: "Podcast with Advanced Media",
    category: "Podcast",
    description:
      "Hosted an episode of Advanced Podcast at Advanced Media with director Nadine Yasir.",
    videoUrl: "",
    thumbnail: "/projects/podcast-advanced-media.jpg",
  },
  {
    title: "Centre Point",
    category: "Art Direction / Commercial",
    description:
      "Art Direction alongside Jad Ezzi. Designs on set, end results, and BTS shots.",
    videoUrl: "",
    thumbnail: "/projects/centre-point.jpg",
  },
  {
    title: "Corporate",
    category: "Corporate",
    description:
      "Corporate reels.",
    videoUrl: "",
    thumbnail: "/projects/corporate.jpg",
  },
  {
    title: "Photography",
    category: "Photography",
    description:
      "Photography galleries. (If there is anything specific to add, will discuss on the call after the first draft.)",
    videoUrl: "",
    thumbnail: "/projects/photography.jpg",
  },
  // Add more projects as needed
]

const categories = [
  "All",
  ...Array.from(new Set(projects.map((p) => p.category))),
]

export default function ProductionPage() {
  const [activeCategory, setActiveCategory] = useState("All")
  const [playingIndex, setPlayingIndex] = useState<number | null>(null)

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory)

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-light mb-6">Production</h1>
          <div className="w-16 h-0.5 bg-gradient-to-r from-[#f29f05] to-[#f27405] mx-auto mb-6"></div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A selection of video productions, campaigns, and creative direction for brands, artists, and events.
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

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.title}
              className="group relative rounded-xl overflow-hidden bg-secondary shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Thumbnail or Video */}
              <div className="relative aspect-video bg-black">
                {project.videoUrl ? (
                  <video
                    src={project.videoUrl}
                    controls
                    className="w-full h-full object-cover"
                    poster={project.thumbnail}
                  />
                ) : (
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover object-center"
                  />
                )}
                {/* Play Button if video */}
                {project.videoUrl && (
                  <button
                    className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/60 transition"
                    onClick={() => setPlayingIndex(playingIndex === idx ? null : idx)}
                  >
                    <Play className="h-12 w-12 text-white" />
                  </button>
                )}
              </div>
              {/* Project Info */}
              <div className="p-6">
                <h3 className="text-2xl font-medium mb-2">{project.title}</h3>
                <div className="text-sm text-accent mb-2">{project.category}</div>
                <p className="text-muted-foreground mb-2">{project.description}</p>
                {project.details && (
                  <ul className="list-disc list-inside text-muted-foreground text-sm">
                    {project.details.map((d, i) => (
                      <li key={i}>{d}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
