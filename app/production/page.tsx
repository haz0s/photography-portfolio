"use client"

import { useState, useEffect, useLayoutEffect } from "react"
import Image from "next/image"
import { Play } from "lucide-react"
import {
  projects,
  projectVideos,
  getYouTubeId,
  isYouTube,
  posterFor,
  type Project,
  type VideoAsset,
} from "@/lib/production-projects"

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

function Poster({ src, alt }: { src: string; alt: string }) {
  if (!src) return <div className="absolute inset-0 bg-neutral-900" />
  if (src.startsWith("/")) {
    return <Image src={src} alt={alt} fill className="object-cover" />
  }
  return <img src={src} alt={alt} className="absolute inset-0 h-full w-full object-cover" />
}

function VideoFrame({ url, title }: { url: string; title?: string }) {
  const id = getYouTubeId(url)
  if (id) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${id}`}
        title={title || "YouTube video player"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="h-full w-full"
      />
    )
  }
  const driveMatch = url.match(/drive\.google\.com\/file\/d\/([^/]+)/)
  if (driveMatch) {
    const src = /\/preview(?:\?|$)/.test(url)
      ? url
      : `https://drive.google.com/file/d/${driveMatch[1]}/preview`
    return (
      <iframe
        src={src}
        title={title || "Video"}
        allow="autoplay"
        allowFullScreen
        className="h-full w-full"
      />
    )
  }
  return (
    <div className="flex h-full items-center justify-center p-6 text-center">
      <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
        View Video
      </a>
    </div>
  )
}

function VideoGallery({
  videos,
  activeVideo,
  onSelect,
}: {
  videos: VideoAsset[]
  activeVideo: number
  onSelect: (index: number) => void
}) {
  const current = videos[Math.min(activeVideo, videos.length - 1)]
  const multiple = videos.length > 1
  const allPortrait = videos.every((video) => video.portrait)
  return (
    <div className="mt-8 space-y-6">
      <h3 className="text-xl font-semibold">{multiple && allPortrait ? "Reels" : multiple ? "Videos" : "Video"}</h3>
      <div className="aspect-video w-full overflow-hidden rounded-lg bg-black shadow-lg">
        <VideoFrame url={current.url} title={current.title} />
      </div>
      {multiple && (
        <div className={`grid gap-4 ${allPortrait ? "grid-cols-2 sm:grid-cols-3" : "grid-cols-1 sm:grid-cols-2"}`}>
          {videos.map((video, idx) => {
            const selected = idx === activeVideo
            const poster = posterFor(video)
            return (
              <button
                key={`${video.url}-${idx}`}
                type="button"
                onClick={() => onSelect(idx)}
                className={`overflow-hidden rounded-lg border text-left transition ${
                  selected ? "border-[#8305a6] ring-2 ring-[#8305a6]" : "border-white/10 hover:border-[#8305a6]"
                }`}
                aria-pressed={selected}
                aria-label={video.title || `Play video ${idx + 1}`}
              >
                <div className={`relative bg-black ${video.portrait ? "aspect-[9/16]" : "aspect-video"}`}>
                  <Poster src={poster} alt={video.title || "Video"} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Play className="h-10 w-10 rounded-full bg-black/50 p-2 text-white/90" />
                  </div>
                </div>
                {video.title && <p className="px-2 py-2 text-sm text-foreground">{video.title}</p>}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default function ProductionPage() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [fullscreenBts, setFullscreenBts] = useState<{ src: string; idx: number } | null>(null)
  const [activeVideo, setActiveVideo] = useState(0)
  const btsManifest = useBtsManifest()

  useLayoutEffect(() => {
    const sync = () => {
      const slug = new URLSearchParams(window.location.search).get("project")
      const match = slug ? projects.find((item) => item.slug === slug) ?? null : null
      setSelectedProject(match)
      setActiveVideo(0)
    }
    sync()
    window.addEventListener("popstate", sync)
    return () => window.removeEventListener("popstate", sync)
  }, [])

  const openProject = (project: Project) => {
    setSelectedProject(project)
    setActiveVideo(0)
    window.history.pushState({}, "", `/production?project=${encodeURIComponent(project.slug)}`)
  }

  const closeProject = () => {
    setSelectedProject(null)
    setFullscreenBts(null)
    setActiveVideo(0)
    window.history.pushState({}, "", "/production")
  }

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
              const media = projectVideos(project)
              const first = media[0]
              let videoThumb: string | null = null
              if (first && isYouTube(first.url)) {
                const videoId = getYouTubeId(first.url)
                if (videoId) {
                  videoThumb = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
                }
              }
              if (!videoThumb && project.thumbnail) {
                videoThumb = project.thumbnail
              }
              if (!videoThumb && first) {
                const poster = posterFor(first)
                if (poster) videoThumb = poster
              }
              const btsImages = project.btsFolder ? btsManifest[project.btsFolder] || [] : []
              const portraitCover = project.slug === "social-reels"
              return (
                <div
                  key={project.id}
                  className="group relative rounded-xl overflow-hidden bg-secondary shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
                  onClick={() => openProject(project)}
                >
                  <div className="relative aspect-video bg-black">
                    {videoThumb ? (
                      <Image
                        src={videoThumb}
                        alt={project.title}
                        fill
                        className={portraitCover ? "object-cover object-top" : "object-cover object-center"}
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
                    {media.length > 0 && (
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
            <div className="relative w-full max-w-6xl bg-background rounded-xl shadow-lg p-8 overflow-y-auto max-h-[90vh]">
              <button
                className="absolute top-4 right-4 text-3xl text-white bg-black/60 rounded-full px-4 py-2 hover:bg-black/80 transition"
                onClick={closeProject}
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

              {projectVideos(selectedProject).length > 0 && (
                <VideoGallery
                  videos={projectVideos(selectedProject)}
                  activeVideo={activeVideo}
                  onSelect={setActiveVideo}
                />
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
