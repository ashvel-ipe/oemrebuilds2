import Image from "next/image"
import VehicleSelector from "@/components/vehicle-selector"
import CategorySection from "@/components/category-section"
import FeaturedProducts from "@/components/featured-products"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <div className="relative h-[80vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="OEM Rebuilds Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="container mx-auto px-4 z-10 relative">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Original Parts. <br />
              Perfect Rebuilds.
            </h1>
            <p className="text-xl text-white/80 mb-8">
              Find genuine OEM parts for your vehicle, delivered to your doorstep.
            </p>

            <VehicleSelector />
          </div>
        </div>
      </div>

      {/* Category Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Shop by Category</h2>
          <CategorySection />
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Featured Parts</h2>
          <FeaturedProducts />
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </main>
  )
}

