"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Play } from "lucide-react"

// Helper to extract YouTube ID from URL
const getYouTubeId = (url: string) => {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|v\/))([\w-]{11})/)
  return match ? match[1] : ""
}

// Helper to check if link is YouTube
const isYouTube = (url: string) => /youtu\.be|youtube\.com/.test(url)

type Project = {
  id: number
  title: string
  description: string
  category: string
  videoUrl?: string | string[]
  btsFolder?: string // Folder name for BTS images
  reelsFolder?: string // Folder name for reels videos
  thumbnail?: string // Optional thumbnail image path
}

const projects: Project[] = [
  {
    id: 1,
    title: "Boomph – Live Session",
    category: "Music / Live Session",
    description: "Recorded a live session with the Syrian rapper Bitter Mouthfeel using 3 Sony a7 IV and a 360 camera.",
    videoUrl: "https://youtu.be/5aVHGmSvLTI?si=uWUPqUjKxujSVJZn",
    // No thumbnail needed (YouTube)
  },
  {
    id: 2,
    title: "EGA – Break The Mold",
    category: "Commercial",
    description: "Produced 'Break The Mold' campaign video with Burson Agency.",
    videoUrl: "https://youtu.be/z9INTKS8CAw",
    // No thumbnail needed (YouTube)
  },
  {
    id: 3,
    title: "Isuzu – Ad",
    category: "Commercial",
    description: "Director assistant on an Isuzu ad.",
    videoUrl: "https://youtu.be/BcNLcqvKfqg",
    btsFolder: "isuzubts",
    // No thumbnail needed (YouTube)
  },
  {
    id: 4,
    title: "Wedding Promo",
    category: "Event / Wedding",
    description: "Wedding Promo for Alaa Khashi.",
    videoUrl: "https://youtu.be/uqFkYPU8q7Q",
    // No thumbnail needed (YouTube)
  },
  {
    id: 5,
    title: "Jetex – FIFA",
    category: "Commercial",
    description: "Producer with Flick for Jetex FIFA campaign.",
    videoUrl: [
      "https://youtu.be/JOt_bjWkc0Q",
      "https://www.instagram.com/reel/Cj27WC1DlhG/?igsh=dXRpeXdqcjAza2V1"
    ],
    // No thumbnail needed (YouTube)
  },
  {
    id: 6,
    title: "Lucid",
    category: "Commercial",
    description: "Producer with Burson Agency.",
    videoUrl: "https://youtu.be/bns37rr7ytQ",
    // No thumbnail needed (YouTube)
  },
  {
    id: 7,
    title: "Sing in The Sky",
    category: "Music / Live Event",
    description: "Director Assistant.",
    videoUrl: "https://shahid.mbc.net/en/shows/Ghannili-Bil-Jaw/show-957168",
    thumbnail: "/thumbnails/sing-in-the-sky.png",
  },
  {
    id: 8,
    title: "How To Series",
    category: "Educational / Series",
    description: "Created a 10-episode tips series.",
    videoUrl: [
      "https://youtu.be/TSX9Asn1m6A",
      "https://youtu.be/n82a5MxMu9Q"
    ],
    // No thumbnail needed (YouTube)
  },
  {
    id: 9,
    title: "Podcast with Advanced Media",
    category: "Podcast",
    description: "Hosted an episode of Advanced Podcast at Advanced Media with director Nadine Yasir.",
    videoUrl: [
      "https://drive.google.com/file/d/1wxUXJ7HCdiIq2QkJRoETCeEAarcEZC6h/preview",
      "https://drive.google.com/file/d/18ALQeipVqcdQ3-Y_I1FnLIpCHIIVSYc7/preview"
    ],
    thumbnail: "/thumbnails/podcast-with-advanced-media.png",
  },
  {
    id: 10,
    title: "Centre Point",
    category: "Art Direction / Commercial",
    description: "Art Direction alongside Jad Ezzi. Designs on set, end results, and BTS shots.",
    videoUrl: [
      "https://youtu.be/5rh7CPMHo5Q",
      "https://youtu.be/OgWyrkQRvxI"
    ],
    btsFolder: "centrepointbts",
    // No thumbnail needed (YouTube)
  },
  {
    id: 11,
    title: "Unboxing Canon R5",
    category: "Product / Unboxing",
    description: "Unboxing and first impressions of the Canon R5. Includes BTS and vertical reels.",
    btsFolder: "canonr5bts",
    videoUrl: [
      "https://drive.google.com/file/d/1Q0dDLhVP4QTrAYwmPkpwpYzD2v1fZMqa/preview"
    ],
    thumbnail: "/thumbnails/unboxing-canon-r5.png",
  },
  {
    id: 12,
    title: "Tecom Reels",
    category: "Corporate / Reels",
    description: "A series of vertical reels produced for Tecom.",
    btsFolder: "tecombts",
    videoUrl: [
      "https://drive.google.com/file/d/1CK6oeNkoiNNgjVqMb1Pdax-1NoY37Y8-/preview",
      "https://drive.google.com/file/d/186ahLwdIBNhgXVpHMIpl6kKqJdbo3Lyo/preview",
      "https://drive.google.com/file/d/1E77P5eDp-tQnf7z-yqXlUZeatu7pXmA6/preview",
      "https://drive.google.com/file/d/1ZAvgV-aWyR9O5NP4UebNzhV75iaaF0r_/preview",
      "https://drive.google.com/file/d/1_-ojVimRT524JsCM1nKvknXpNnXEIfgE/preview",
      "https://drive.google.com/file/d/1ShIRfBK8Lc-Ldnyv1ewUS1ud3HUX_Tvi/preview",
      "https://drive.google.com/file/d/1lo9lDSeqMBEqhYXtm4vLqPXzoqqrnExX/preview",
      "https://drive.google.com/file/d/12U-OrdZet7eDpI5jmeZOoUSssGRLU-aR/preview",
      "https://drive.google.com/file/d/1O8BAlMrQIcbwidlE-ng7hdFsBwqJiuZj/preview",
      "https://drive.google.com/file/d/1TuoEeuMeaeXoT7H6Y0PKCd5V5G9QXc4k/preview",
      "https://drive.google.com/file/d/1vI4i_8FZ2DqEreeubKN90X7YcaN67N8s/preview",
      "https://drive.google.com/file/d/1DvTV3ATq1GxhQfd1oZoyLsl6dTwCYSde/preview",
    ],
    thumbnail: "/thumbnails/tecom-reels.png",
  },
  {
    id: 13,
    title: "L'occitane - Ramadan",
    category: "Commercial / Campaign",
    description: "Ramadan campaign for L'occitane. Includes vertical video reels.",
    videoUrl: "https://youtu.be/R88ZT66jsA0",
    btsFolder: "loccitanebts",
    reelsFolder: "loccitanereels",
    // No thumbnail needed (YouTube)
  },
  {
    id: 14,
    title: "Advanced Media Campaign",
    category: "Commercial / Campaign",
    description: "Advanced Media campaign with vertical reels and BTS.",
    btsFolder: "advancedmediabts",
    videoUrl: [
      "https://drive.google.com/file/d/16zItmXTxmwaN9lx_mh7H4BaLhIHAEDLN/preview"
    ],
    thumbnail: "/thumbnails/advanced-media-campaign.png",
  },
]

// Dynamically import all BTS images from the /public/bts folder and subfolders
function useBtsManifest() {
  const [manifest, setManifest] = useState<Record<string, string[]>>({})

  useEffect(() => {
    // @ts-ignore: webpack specific require.context
    const req = require.context("../../public/bts", true, /\.(jpe?g|png|webp)$/)
    const map: Record<string, string[]> = {}
    req.keys().forEach((key: string) => {
      // key example: './isuzubts/1.jpg'
      const match = key.match(/^\.\/([^/]+)\/(.+)$/)
      if (match) {
        const folder = match[1]
        const file = match[2]
        if (!map[folder]) map[folder] = []
        map[folder].push(`/bts/${folder}/${file}`)
      }
    })
    // Sort images in each folder by filename
    Object.keys(map).forEach(folder => {
      map[folder].sort((a, b) => {
        const getNum = (s: string) => parseInt(s.match(/(\d+)/)?.[1] || "0", 10);
        return getNum(a) - getNum(b);
      });
    });
    setManifest(map)
  }, [])

  return manifest
}

export default function ProductionPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [fullscreenBts, setFullscreenBts] = useState<{ src: string; idx: number } | null>(null)
  const btsManifest = useBtsManifest()

  // Collage grid styling helper for dynamic layouts
  function getCollageClass(folder: string, idx: number) {
    // Collage feature commented out for now
    // if (idx % 7 === 0) return "col-span-2 row-span-2"
    // if (idx % 5 === 0) return "col-span-2"
    // if (idx % 3 === 0) return "row-span-2"
    return ""
  }

  return (
    <div className="min-h-screen pt-24 pb-16 bg-background text-foreground">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-light mb-6">Production</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A selection of video productions, campaigns, and creative direction for brands, artists, and events.
          </p>
        </div>

        {/* Project Grid */}
        {!selectedProject && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project) => {
              // Determine if project has a YouTube video
              let videoThumb: string | null = null
              let videoId: string | null = null
              if (project.videoUrl) {
                const url = Array.isArray(project.videoUrl) ? project.videoUrl[0] : project.videoUrl
                if (isYouTube(url)) {
                  videoId = getYouTubeId(url)
                  if (videoId) {
                    videoThumb = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
                  }
                }
              }
              if (!videoThumb && project.thumbnail) {
                videoThumb = project.thumbnail
              }
              // Use first BTS image as fallback if available
              const btsImages = project.btsFolder ? btsManifest[project.btsFolder] || [] : []
              return (
                <div
                  key={project.id}
                  className="group relative rounded-xl overflow-hidden bg-secondary shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative aspect-video bg-black">
                    {/* Show YouTube thumbnail if available, else first BTS photo */}
                    {videoThumb ? (
                      <Image
                        src={videoThumb}
                        alt={project.title}
                        fill
                        className="object-cover object-center"
                      />
                    ) : btsImages.length > 0 ? (
                      <Image
                        src={btsImages[0]}
                        alt={project.title}
                        fill
                        className="object-cover object-center"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}
                    {/* Play icon if video */}
                    {project.videoUrl && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Play className="h-16 w-16 text-white/80 bg-black/50 rounded-full p-4" />
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-medium mb-2">{project.title}</h3>
                    <div className="text-sm text-accent mb-2">{project.category}</div>
                    <p className="text-muted-foreground mb-2">{project.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        

        {/* Project Modal */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm">
            <div className="relative w-full max-w-4xl bg-background rounded-xl shadow-lg p-8 overflow-y-auto max-h-[90vh]">
              <button
                className="absolute top-4 right-4 text-3xl text-white bg-black/60 rounded-full px-4 py-2 hover:bg-black/80 transition"
                onClick={() => {
                  setSelectedProject(null)
                  setFullscreenBts(null)
                }}
                aria-label="Close"
              >
                ×
              </button>
              <h2 className="text-3xl font-bold mb-4">{selectedProject.title}</h2>
              <div className="text-accent mb-2">{selectedProject.category}</div>
              <p className="mb-6 text-muted-foreground">{selectedProject.description}</p>

              {/* BTS Collage Gallery */}
              {selectedProject.btsFolder && btsManifest[selectedProject.btsFolder] && (
                <div className="mb-8">
                  <h3 className="text-xl font-semibold mb-4">Behind the Scenes</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 auto-rows-[220px] md:auto-rows-[320px] gap-3 md:gap-4">
                    {btsManifest[selectedProject.btsFolder].map((src, idx) => (
                      <div
                        key={idx}
                        className={`relative rounded-lg overflow-hidden cursor-pointer group transition-all duration-200 hover:z-20 hover:scale-105 shadow ${getCollageClass(selectedProject.btsFolder!, idx)}`}
                        onClick={() => setFullscreenBts({ src, idx })}
                        tabIndex={0}
                        aria-label={`View BTS photo ${idx + 1} full screen`}
                      >
                        <Image
                          src={src}
                          alt={`BTS ${idx + 1}`}
                          fill
                          // Use object-cover for default, but add bg-white and object-center to help with verticals
                          className="object-cover object-center bg-white transition-all duration-300 group-hover:brightness-110"
                          sizes="(max-width: 768px) 50vw, 300px"
                          style={{ backgroundColor: "#fff" }}
                        />
                        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-40 transition" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Video Embed */}
              {selectedProject.videoUrl && (
                <div className="mt-8 space-y-8">
                  <h3 className="text-xl font-semibold mb-4">Video</h3>
                  {(Array.isArray(selectedProject.videoUrl)
                    ? selectedProject.videoUrl
                    : [selectedProject.videoUrl]
                  ).map((url, idx) => {
                    const id = getYouTubeId(url)
                    if (id) {
                      // YouTube embed
                      return (
                        <div key={idx} className="aspect-video w-full rounded-lg overflow-hidden shadow-lg">
                          <iframe
                            src={`https://www.youtube.com/embed/${id}`}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full"
                          />
                        </div>
                      )
                    }
                    // Google Drive embed
                    const driveMatch = url.match(/drive\.google\.com\/file\/d\/([^/]+)/)
                    if (driveMatch) {
                      return (
                        <div key={idx} className="aspect-video w-full rounded-lg overflow-hidden shadow-lg">
                          <iframe
                            src={url}
                            allow="autoplay"
                            allowFullScreen
                            className="w-full h-full"
                          />
                        </div>
                      )
                    }
                    // Fallback: show as external link
                    return (
                      <div key={idx} className="my-4">
                        <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                          View Video
                        </a>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Fullscreen BTS Modal */}
            {fullscreenBts && (
              <div
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
                onClick={() => setFullscreenBts(null)}
                tabIndex={-1}
                aria-modal="true"
                role="dialog"
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <button
                    className="absolute top-8 right-8 text-4xl text-white bg-black/60 rounded-full px-4 py-2 hover:bg-black/80 transition z-10"
                    onClick={e => {
                      e.stopPropagation()
                      setFullscreenBts(null)
                    }}
                    aria-label="Close full screen"
                  >
                    ×
                  </button>
                  <Image
                    src={fullscreenBts.src}
                    alt={`BTS Full ${fullscreenBts.idx + 1}`}
                    fill
                    className="object-contain"
                    style={{ maxHeight: "90vh" }}
                  />
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
