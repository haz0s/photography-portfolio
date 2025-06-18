"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Camera, Play, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import ConveyorBelt from "@/components/ConveyorBelt" // <-- Import the new component

export default function HomePage() {
  const [isPaused, setIsPaused] = useState(false)
  const [animationKey, setAnimationKey] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<HTMLDivElement>(null)

  const featuredWorks = [
    {
      id: 1,
      title: "Fashion",
      category: "Fashion Photography",
      color: "#8305a6",
      photo: "photos/Photography/Fashion/DSC00553-edited.jpg",
    },
    {
      id: 2,
      title: "Corporate",
      category: "Corporate Photography",
      color: "#442273",
      photo: "/photos/Photography/Corprate/Snapins.ai_448847749_785279570345628_4420180342164272469_n_1080.jpg",
    },
    {
      id: 3,
      title: "Food",
      category: "Food Photography",
      color: "#f29f05",
      photo: "/photos/Photography/Food Photography/1a1f97c6-a2f5-482e-b396-4243fcaf592a_rw_1920.jpg",
    },
    {
      id: 4,
      title: "Portrait",
      category: "Portrait Photography",
      color: "#f27405",
      photo: "/photos/Photography/Portraits/0cae67ba-6090-44e1-bdba-f921f2a80df9_rw_1920.jpg",
    },
    {
      id: 5,
      title: "Product",
      category: "Product Photography",
      color: "#f24405",
      photo: "photos/Photography/Product Photography/5a76a877-79eb-4552-8829-aa0ec5e3dafd_rw_1920.jpg",
    },
    {
      id: 6,
      title: "Moments",
      category: "Moments Photography",
      color: "#8305a6",
      photo: "/photos/Photography/Moments/01a104d7-5896-4d06-8600-96ed068ee6d1_rw_1920.png",
    },
  ]

  const clients = [
    { name: "Sephora", logo: "/logos/sephora-logo.png" },
    { name: "Isuzu", logo: "/logos/isuzu-logo.png" },
    { name: "Ocitanne", logo: "/logos/occitanne-logo.png" },
    { name: "Erborian", logo: "/logos/erborian-logo.png" },
    { name: "FourSeasons", logo: "/logos/fourseasons-logo.png" },
    { name: "Adidas", logo: "/logos/adidas-logo.png" },
    
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-start overflow-hidden bg-background">
        {/* Background Photo */}
        <Image
          src="/photos/hero-bg.jpg" // <-- Replace with your hero image path
          alt="Hero Background"
          fill
          priority
          className="object-cover object-center absolute inset-0 z-0"
        />
        {/* Optional: Overlay for darkening the image */}
        <div className="absolute inset-0 bg-black/60 z-10" />

        <div className="relative z-20 text-left px-4 md:pl-24 animate-fade-in-up max-w-2xl">
          <div className="animate-slide-down">
            <h1 className="text-6xl md:text-8xl font-extralight mb-6 tracking-wide">Hi! it's Judy Abdrabo</h1>
            <div className="w-24 h-0.5 bg-gradient-to-r from-white/80 to-white/40 mb-6 animate-expand"></div>
            <p className="text-xl md:text-2xl font-light mb-12 opacity-90 leading-relaxed">
              Capturing authentic moments through the lens of creativity and passion
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 animate-fade-in-delayed">
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
              className="bg-white/10 backdrop-blur-md border border-white/20 text-white/60 hover:bg-white hover:text-[#8305a6] transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Link href="/contact">Get In Touch</Link>
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-24 animate-bounce z-20">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 px-4 bg-background text-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <div className="animate-fade-in-on-scroll">
            <h2 className="text-4xl md:text-5xl font-light mb-8 text-foreground">About</h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-[#f29f05] to-[#f27405] mx-auto mb-8"></div>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 max-w-3xl mx-auto">
              Hi! I’m Judy — a Syrian photographer and producer based in Dubai, with 6 years of experience in the creative world. I’ve worked with over 70 clients and brands, from fashion and food to events and large-scale campaigns.
              I hear it all the time: “We’re not photogenic!” But I truly believe that with the right light, angle, and approach — everyone can look and feel their best on camera. That mindset shapes everything I do, whether I’m shooting real moments, crafting the perfect food shot, or leading full productions for ads and music videos.
              I love what I do, and I bring energy, creativity, and care to every project I take on
              From first idea to final shot — I’ve got you. Drop me a message and let’s get started.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section className="py-24 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-on-scroll">
            <h2 className="text-4xl md:text-5xl font-light mb-4 text-foreground">Featured Work</h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-[#442273] to-[#8305a6] mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A curated selection showcasing different styles and approaches across various photography genres
            </p>
          </div>
          <ConveyorBelt featuredWorks={featuredWorks} />
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
      <section className="py-24 px-4 bg-secondary">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-on-scroll">
            <h2 className="text-4xl md:text-5xl font-light mb-4 text-foreground">Trusted by Leading Brands</h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-[#8305a6] to-[#442273] mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Collaborating with industry leaders to create compelling visual narratives that drive results
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 items-center">
            {clients.map((client, index) => (
              <div
                key={index}
                className="flex items-center justify-center p-6 bg-gradient-to-r from-[#1a1026] to-[#442273] rounded-xl shadow-sm hover:shadow-md transition-all duration-300 group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative w-full h-12 group-hover:grayscale-0 transition-all duration-300 opacity-60 group-hover:opacity-100">
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
          <div className="mt-16 text-center animate-fade-in-on-scroll">
            <div className="bg-card rounded-2xl p-8 shadow-sm max-w-3xl mx-auto">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-5 h-5 text-[#f29f05]">
                    ⭐
                  </div>
                ))}
              </div>
              <blockquote className="text-lg text-muted-foreground italic mb-6">
                "Judy's ability to capture our brand essence was remarkable. Her creative vision and professional
                approach transformed our campaign into something truly extraordinary."
              </blockquote>
              <div className="flex items-center justify-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#8305a6] to-[#442273] rounded-full"></div>
                <div className="text-left">
                  <p className="font-medium text-foreground">Emma Rodriguez</p>
                  <p className="text-sm text-muted-foreground">Creative Director, Luxe Fashion</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-on-scroll">
            <h2 className="text-4xl md:text-5xl font-light mb-4 text-foreground">Services</h2>
            <div className="w-16 h-0.5 bg-gradient-to-r from-[#f27405] to-[#f24405] mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground">Bringing your vision to life through lens and creativity</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group animate-fade-in-on-scroll">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#8305a6] to-[#442273] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Camera className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-medium mb-4 text-foreground">Photography</h3>
              <p className="text-muted-foreground leading-relaxed">
                Fashion, lifestyle, and commercial photography that captures the essence of your brand and story.
              </p>
            </div>
            <div className="text-center group animate-fade-in-on-scroll">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#f29f05] to-[#f27405] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Play className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-medium mb-4 text-foreground">Video Production</h3>
              <p className="text-muted-foreground leading-relaxed">
                Cinematic storytelling through motion, creating compelling video content for brands and individuals.
              </p>
            </div>
            <div className="text-center group animate-fade-in-on-scroll">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-[#f27405] to-[#f24405] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <ArrowRight className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-medium mb-4 text-foreground">Creative Direction</h3>
              <p className="text-muted-foreground leading-relaxed">
                End-to-end creative direction for campaigns, ensuring cohesive visual narratives that resonate.
              </p>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        .conveyor-container {
          overflow: hidden;
          width: 100vw; /* or your desired width */
          /* Do NOT animate or transform this */
        }

        .conveyor-belt {
          display: flex;
          width: max-content;
          animation: conveyor-scroll 30s linear infinite;
        }

        .conveyor-container:hover .conveyor-belt {
          animation-play-state: paused;
        }

        @keyframes conveyor-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  )
}
