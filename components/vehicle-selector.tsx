"use client"

import { useState, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import { useRouter } from "next/navigation"

// Mock data for vehicle selection
const carMakes = ["Toyota", "Honda", "Ford", "BMW", "Mercedes", "Audi", "Nissan"]
const carModels = {
  Toyota: ["Camry", "Corolla", "RAV4", "Highlander", "Tacoma"],
  Honda: ["Civic", "Accord", "CR-V", "Pilot", "Odyssey"],
  Ford: ["F-150", "Mustang", "Explorer", "Escape", "Focus"],
  BMW: ["3 Series", "5 Series", "X3", "X5", "7 Series"],
  Mercedes: ["C-Class", "E-Class", "S-Class", "GLC", "GLE"],
  Audi: ["A4", "A6", "Q5", "Q7", "A8"],
  Nissan: ["Altima", "Maxima", "Rogue", "Pathfinder", "Sentra"],
}
const conditions = ["Running", "Stopped"]

export default function VehicleSelector() {
  const [selectedMake, setSelectedMake] = useState("")
  const [selectedModel, setSelectedModel] = useState("")
  const [selectedCondition, setSelectedCondition] = useState("")
  const [availableModels, setAvailableModels] = useState<string[]>([])
  const router = useRouter()

  useEffect(() => {
    if (selectedMake && carModels[selectedMake as keyof typeof carModels]) {
      setAvailableModels(carModels[selectedMake as keyof typeof carModels])
    } else {
      setAvailableModels([])
    }
    setSelectedModel("")
  }, [selectedMake])

  const handleSearch = () => {
    if (selectedMake && selectedModel) {
      // In a real app, we would navigate to a filtered products page
      // For now, we'll just navigate to the products page
      router.push(`/products?make=${selectedMake}&model=${selectedModel}&condition=${selectedCondition}`)
    }
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg animate-fade-in">
      <h2 className="text-xl font-semibold mb-4">Find Parts for Your Vehicle</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {/* Car Make Dropdown */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Car Make</label>
          <div className="relative">
            <select
              value={selectedMake}
              onChange={(e) => setSelectedMake(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
            >
              <option value="">Select Make</option>
              {carMakes.map((make) => (
                <option key={make} value={make}>
                  {make}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <ChevronDown size={16} className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* Car Model Dropdown */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Car Model</label>
          <div className="relative">
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              disabled={!selectedMake}
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md disabled:bg-gray-100 disabled:text-gray-500"
            >
              <option value="">Select Model</option>
              {availableModels.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <ChevronDown size={16} className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* Condition Dropdown */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
          <div className="relative">
            <select
              value={selectedCondition}
              onChange={(e) => setSelectedCondition(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md"
            >
              <option value="">Select Condition</option>
              {conditions.map((condition) => (
                <option key={condition} value={condition}>
                  {condition}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <ChevronDown size={16} className="text-gray-400" />
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleSearch}
        disabled={!selectedMake || !selectedModel}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors duration-300 disabled:bg-gray-400"
      >
        Find Parts
      </button>
    </div>
  )
}

