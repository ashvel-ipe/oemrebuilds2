"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import { CogIcon as Engine, Car, Lightbulb, Settings } from "lucide-react"

const categories = [
  {
    id: "engine",
    name: "Engine Parts",
    icon: Engine,
    description: "Pistons, Gaskets, Valves & more",
    color: "bg-red-500",
    hoverColor: "hover:bg-red-600",
  },
  {
    id: "body",
    name: "Body Parts",
    icon: Car,
    description: "Bumpers, Doors, Mirrors & more",
    color: "bg-blue-500",
    hoverColor: "hover:bg-blue-600",
  },
  {
    id: "accessories",
    name: "Accessories",
    icon: Lightbulb,
    description: "Lights, Wipers, Mats & more",
    color: "bg-amber-500",
    hoverColor: "hover:bg-amber-600",
  },
  {
    id: "other",
    name: "Other Parts",
    icon: Settings,
    description: "Filters, Belts, Sensors & more",
    color: "bg-green-500",
    hoverColor: "hover:bg-green-600",
  },
]

export default function CategorySection() {
  const categoryRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "translate-y-0")
            entry.target.classList.remove("opacity-0", "translate-y-10")
          }
        })
      },
      { threshold: 0.1 },
    )

    categoryRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => {
      categoryRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {categories.map((category, index) => (
       <div
       key={category.id}
       ref={(el) => {
         if (categoryRefs.current) {
           categoryRefs.current[index] = el;
         }
       }}
       className={`opacity-0 translate-y-10 transition-all duration-500 ease-out delay-${index * 100}`}
       style={{ transitionDelay: `${index * 100}ms` }}
     >
          <Link href={`/categories/${category.id}`}>
            <div
              className={`${category.color} ${category.hoverColor} text-white rounded-lg p-6 h-full shadow-lg transform transition-transform duration-300 hover:scale-105 cursor-pointer`}
            >
              <div className="flex items-center justify-center mb-4">
                <category.icon size={48} />
              </div>
              <h3 className="text-xl font-bold text-center mb-2">{category.name}</h3>
              <p className="text-center text-white/80">{category.description}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}

