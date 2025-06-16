"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Camera, Play, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  const [isPaused, setIsPaused] = useState(false)
  const [animationKey, setAnimationKey] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<HTMLDivElement>(null)

  const featuredWorks = [
    { title: "Fashion", category: "Fashion Photography", color: "#8305a6" },
    { title: "Lifestyle", category: "Lifestyle Photography", color: "#442273" },
    { title: "Commercial", category: "Commercial Photography", color: "#f29f05" },
    { title: "Portrait", category: "Portrait Photography", color: "#f27405" },
    { title: "Editorial", category: "Editorial Photography", color: "#f24405" },
    { title: "Events", category: "Event Photography", color: "#8305a6" },
  ]

  const clients = [
    { name: "Vogue", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Nike", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Chanel", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Apple", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Mercedes", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Dior", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Tesla", logo: "/placeholder.svg?height=60&width=120" },
    { name: "Gucci", logo: "/placeholder.svg?height=60&width=120" },
  ]

  // Reset animation and scroll position when animation completes
  useEffect(() => {
    const handleAnimationIteration = () => {
      // Reset manual scroll position
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft = 0
      }
      // Force re-render to reset animation
      setAnimationKey((prev) => prev + 1)
    }

    const animationElement = animationRef.current
    if (animationElement) {
      animationElement.addEventListener("animationiteration", handleAnimationIteration)
      return () => {
        animationElement.removeEventListener("animationiteration", handleAnimationIteration)
      }
    }
  }, [])

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 332 // width of one item (320px) plus margin (12px)
      const currentScroll = scrollContainerRef.current.scrollLeft
      const maxScroll = scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth

      let newScroll: number
      if (direction === "left") {
        newScroll = Math.max(0, currentScroll - scrollAmount)
      } else {
        newScroll = Math.min(maxScroll, currentScroll + scrollAmount)
      }

      scrollContainerRef.current.scrollTo({
        left: newScroll,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section with Gradient Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#8305a6] via-[#442273] to-[#f29f05] animate-gradient-shift"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10"></div>
        </div>

        <div className="relative z-10 text-center text-white px-4 animate-fade-in-up">
          <div className="animate-slide-down">
            <h1 className="text-6xl md:text-8xl font-extralight mb-6 tracking-wide">Sarah Chen</h1>
            <div className="w-24 h-0.5 bg-gradient-to-r from-white/80 to-white/40 mx-auto mb-6 animate-expand"></div>
            <p className="text-xl md:text-2xl font-light mb-12 opacity-90 max-w-2xl mx-auto leading-relaxed">
              Capturing authentic moments through the lens of creativity and passion
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in-delayed">
            <Button
              asChild
              size="lg"
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-[#8305a6] transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Link href="/photos">
                View Portfolio <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white/30 text-white hover:bg-white/10 hover:border-white transition-all duration-300 backdrop-blur-sm"
            >
              <Link href="/contact">Get In Touch</Link>
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in-on-scroll">
            <h2 className="text-4xl md:text-5xl font-light mb-8 text-gray-900">About</h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-[#f29f05] to-[#f27405] mx-auto mb-8"></div>
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8 max-w-3xl mx-auto">
              With over 8 years of experience in visual storytelling, I specialize in capturing authentic moments that
              resonate with audiences. Based in New York City, I work with brands and individuals worldwide to create
              compelling narratives through photography and video production.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#8305a6] rounded-full"></div>
                <span>8+ Years Experience</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#f29f05] rounded-full"></div>
                <span>200+ Happy Clients</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#f24405] rounded-full"></div>
                <span>15+ Awards</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work - Seamless Infinite Loop with Reset */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-on-scroll">
            <h2 className="text-4xl md:text-5xl font-light mb-4 text-gray-900">Featured Work</h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-[#442273] to-[#8305a6] mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A curated selection showcasing different styles and approaches across various photography genres
            </p>
          </div>

          {/* Carousel Container */}
          <div className="relative overflow-hidden">
            {/* Navigation Arrows */}
            <button
              onClick={() => handleScroll("left")}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-all duration-300 group"
            >
              <ChevronLeft className="h-6 w-6 text-gray-700 group-hover:text-[#8305a6]" />
            </button>
            <button
              onClick={() => handleScroll("right")}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg hover:bg-white transition-all duration-300 group"
            >
              <ChevronRight className="h-6 w-6 text-gray-700 group-hover:text-[#8305a6]" />
            </button>

            {/* Conveyor Belt Container */}
            <div
              ref={scrollContainerRef}
              className="overflow-x-auto scrollbar-hide scroll-smooth"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div
                key={animationKey}
                ref={animationRef}
                className={`flex animate-conveyor-belt ${isPaused ? "animation-paused" : ""}`}
              >
                {/* Duplicate the items twice for seamless loop */}
                {[...featuredWorks, ...featuredWorks].map((item, index) => (
                  <div
                    key={`${animationKey}-${index}`}
                    className="flex-none w-80 mx-3 group cursor-pointer"
                    onClick={() => {
                      console.log(`Clicked on ${item.title}`)
                    }}
                  >
                    <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                      <Image
                        src={`/placeholder.svg?height=640&width=480`}
                        alt={item.title}
                        fill
                        className="object-cover transition-all duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-all duration-500" />

                      {/* Overlay Content */}
                      <div className="absolute inset-0 flex flex-col justify-end p-8">
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          <div
                            className="w-12 h-1 mb-4 transition-all duration-500"
                            style={{ backgroundColor: item.color }}
                          ></div>
                          <h3 className="text-2xl font-light text-white mb-2">{item.title}</h3>
                          <p className="text-white/80 text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            {item.category}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center mt-12 animate-fade-in-on-scroll">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-[#8305a6] text-[#8305a6] hover:bg-[#8305a6] hover:text-white transition-all duration-300 font-medium"
            >
              <Link href="/photos">
                Explore Full Portfolio <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-on-scroll">
            <h2 className="text-4xl md:text-5xl font-light mb-4 text-gray-900">Trusted by Leading Brands</h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-[#8305a6] to-[#442273] mx-auto mb-6"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Collaborating with industry leaders to create compelling visual narratives that drive results
            </p>
          </div>

          {/* Client Logos Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
            {clients.map((client, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative w-full h-12 grayscale group-hover:grayscale-0 transition-all duration-300 opacity-60 group-hover:opacity-100">
                  <Image
                    src={client.logo || "/placeholder.svg"}
                    alt={`${client.name} logo`}
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Client Testimonial */}
          <div className="mt-16 text-center animate-fade-in-on-scroll">
            <div className="bg-white rounded-2xl p-8 shadow-sm max-w-3xl mx-auto">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-5 h-5 text-[#f29f05]">
                    ⭐
                  </div>
                ))}
              </div>
              <blockquote className="text-lg text-gray-600 italic mb-6">
                "Sarah's ability to capture our brand essence was remarkable. Her creative vision and professional
                approach transformed our campaign into something truly extraordinary."
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#8305a6] to-[#442273] rounded-full"></div>
                <div className="text-left">
                  <p className="font-medium text-gray-900">Emma Rodriguez</p>
                  <p className="text-sm text-gray-600">Creative Director, Luxe Fashion</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-on-scroll">
            <h2 className="text-4xl md:text-5xl font-light mb-4 text-gray-900">Services</h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-[#f27405] to-[#f24405] mx-auto mb-6"></div>
            <p className="text-lg text-gray-600">Bringing your vision to life through lens and creativity</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group animate-fade-in-on-scroll">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#8305a6] to-[#442273] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Camera className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-medium mb-4 text-gray-900">Photography</h3>
              <p className="text-gray-600 leading-relaxed">
                Fashion, lifestyle, and commercial photography that captures the essence of your brand and story.
              </p>
            </div>

            <div className="text-center group animate-fade-in-on-scroll">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#f29f05] to-[#f27405] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Play className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-medium mb-4 text-gray-900">Video Production</h3>
              <p className="text-gray-600 leading-relaxed">
                Cinematic storytelling through motion, creating compelling video content for brands and individuals.
              </p>
            </div>

            <div className="text-center group animate-fade-in-on-scroll">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#f27405] to-[#f24405] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <ArrowRight className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-medium mb-4 text-gray-900">Creative Direction</h3>
              <p className="text-gray-600 leading-relaxed">
                End-to-end creative direction for campaigns, ensuring cohesive visual narratives that resonate.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
