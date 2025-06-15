import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Camera, Play } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Hero photography"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="relative z-10 text-center text-white px-4">
          <h1 className="text-5xl md:text-7xl font-light mb-6 animate-fade-in">Sarah Chen</h1>
          <p className="text-xl md:text-2xl font-light mb-8 opacity-90">Visual Storyteller & Creative Director</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-black hover:bg-gray-100">
              <Link href="/portfolio">
                View Portfolio <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-black"
            >
              <Link href="/contact">Get In Touch</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Work */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-4">Featured Work</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A curated selection of recent projects spanning fashion, lifestyle, and commercial photography
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="group cursor-pointer">
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                  <Image
                    src={`/placeholder.svg?height=600&width=480`}
                    alt={`Featured work ${item}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white rounded-full p-3">
                      <Camera className="h-6 w-6 text-black" />
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-medium">Project Title {item}</h3>
                  <p className="text-gray-600">Fashion Photography</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="outline" size="lg">
              <Link href="/portfolio">
                View All Work <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light mb-4">Services</h2>
            <p className="text-lg text-gray-600">Bringing your vision to life through lens and creativity</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                <Camera className="h-10 w-10 text-gray-700" />
              </div>
              <h3 className="text-xl font-medium mb-4">Photography</h3>
              <p className="text-gray-600 leading-relaxed">
                Fashion, lifestyle, and commercial photography that captures the essence of your brand and story.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                <Play className="h-10 w-10 text-gray-700" />
              </div>
              <h3 className="text-xl font-medium mb-4">Video Production</h3>
              <p className="text-gray-600 leading-relaxed">
                Cinematic storytelling through motion, creating compelling video content for brands and individuals.
              </p>
            </div>

            <div className="text-center group">
              <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-200 transition-colors">
                <ArrowRight className="h-10 w-10 text-gray-700" />
              </div>
              <h3 className="text-xl font-medium mb-4">Creative Direction</h3>
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
