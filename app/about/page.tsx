import Image from "next/image"
import { Award, Camera, Users, Zap } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h1 className="text-4xl md:text-6xl font-light mb-6">About Sarah</h1>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              With over 8 years of experience in visual storytelling, I specialize in capturing authentic moments that
              resonate with audiences. My work spans fashion, lifestyle, and commercial photography, always with a focus
              on creating compelling narratives through imagery.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Based in New York City, I work with brands and individuals worldwide to bring their visions to life. Every
              project is an opportunity to explore new creative territories and push the boundaries of visual
              communication.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 text-gray-700">
                <Camera className="h-5 w-5" />
                <span>8+ Years Experience</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Users className="h-5 w-5" />
                <span>200+ Happy Clients</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Award className="h-5 w-5" />
                <span>15+ Awards</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[3/4] relative overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=800&width=600"
                alt="Sarah Chen Portrait"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Philosophy Section */}
        <div className="bg-gray-50 rounded-2xl p-8 md:p-12 mb-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-light mb-6">My Philosophy</h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              "Photography is not just about capturing what you see, but revealing what you feel. Every frame tells a
              story, and every story deserves to be told with authenticity, creativity, and passion. I believe in the
              power of visual narrative to connect, inspire, and transform."
            </p>
            <div className="w-16 h-1 bg-gray-300 mx-auto"></div>
          </div>
        </div>

        {/* Skills & Expertise */}
        <div className="mb-20">
          <h2 className="text-3xl md:text-4xl font-light text-center mb-12">Skills & Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Camera className="h-8 w-8 text-gray-700" />
              </div>
              <h3 className="text-lg font-medium mb-2">Photography</h3>
              <p className="text-gray-600 text-sm">Fashion, Portrait, Commercial, Lifestyle</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Zap className="h-8 w-8 text-gray-700" />
              </div>
              <h3 className="text-lg font-medium mb-2">Post-Production</h3>
              <p className="text-gray-600 text-sm">Adobe Creative Suite, Color Grading</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Users className="h-8 w-8 text-gray-700" />
              </div>
              <h3 className="text-lg font-medium mb-2">Direction</h3>
              <p className="text-gray-600 text-sm">Creative Direction, Art Direction</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                <Award className="h-8 w-8 text-gray-700" />
              </div>
              <h3 className="text-lg font-medium mb-2">Recognition</h3>
              <p className="text-gray-600 text-sm">International Awards, Publications</p>
            </div>
          </div>
        </div>

        {/* Client Testimonials */}
        <div className="bg-white">
          <h2 className="text-3xl md:text-4xl font-light text-center mb-12">What Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gray-50 p-8 rounded-lg">
              <p className="text-gray-600 mb-4 italic">
                "Sarah's ability to capture the essence of our brand was remarkable. Her creative vision and
                professional approach made the entire process seamless and enjoyable."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div>
                  <p className="font-medium">Emma Rodriguez</p>
                  <p className="text-sm text-gray-600">Creative Director, Luxe Fashion</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <p className="text-gray-600 mb-4 italic">
                "Working with Sarah was transformative. She didn't just take photos; she told our story in a way that
                resonated with our audience and elevated our brand."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div>
                  <p className="font-medium">Michael Chen</p>
                  <p className="text-sm text-gray-600">Founder, Artisan Collective</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
