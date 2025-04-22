// Home page specific functionality for OEM Rebuilds website

document.addEventListener("DOMContentLoaded", () => {
  // Mock data - replace with actual data loading or imports
  const carData = {
  makes: ["Toyota", "Honda", "Ford", "BMW", "Mercedes", "Audi", "Nissan", "Tata",
    "Hyundai", "Maruti", "Kia", "Volkswagen", "Chevrolet", "Renault", "Skoda",
    "Fiat", "Mahindra", "Isuzu", "Bajaj_Auto", "Ashok_Leyland", "Hindustan_Motors",
    "Royal_Enfield", "Ferrari", "Lamborghini", "Porsche", "Ducati", "KTM", "Yamaha",
    "Rolls_Royce", "Aston_Martin", "Bugatti", "Maserati", "Mitsubishi", "MG",
    "Koenigsegg", "Dodge", "Volvo", "Land_Rover", "Subaru", "Audi", "Ola",
    "Ather", "Bajaj", "TVS" ],
  models: {
    Toyota: ["Camry", "Corolla", "RAV4", "Highlander", "Tacoma","Innova", "Fortuner", "Yaris", "Land Cruiser", "Hilux","Etios", "Etios-Liva", "Glanza", "Supra MK5", "Urban Cruiser","C-HR", "Vios", "Avanza", "Rush", "Agya"],
    Honda: ["Civic", "Accord", "CR-V", "Pilot", "Odyssey", "Brio","City", "Jazz", "Amaze", "WR-V","BR-V", "HR-V", "ZRV", "Legend", "Crosstour"],
    Ford: ["F-150", "Mustang", "Explorer", "Escape", "Focus", "Fusion","Endeavour", "EcoSport", "Fiesta", "Mondeo","Ranger", "Everest", "Mustang Mach-E", "Bronco", "Transit"],
    BMW: ["3 Series", "5 Series", "X3", "X5", "7 Series", "X1","Z4", "M3", "M5", "X7","i3", "i4", "iX", "M4", "M8"],
    Mercedes: ["C-Class", "E-Class", "S-Class", "GLC", "GLE", "GLS","A-Class", "B-Class", "CLA", "GLA","SL-Class", "SLC", "EQC", "AMG GT", "G-Class"],
    Audi: ["A4", "A6", "Q5", "Q7", "A8", "Q3", "TT","A3", "A5", "Q8", "e-tron","RS5", "RS7", "S4", "S6", "S8"],
    Nissan: ["Altima", "Maxima", "Rogue", "Patrol", "Sentra", "Murano","370Z", "GT-R", "Armada", "Magnite","Juke", "Kicks", "Leaf", "Frontier", "Titan","Sunny", "Micra", "Teana", "X-Trail", "Datsun GO"],
    Tata: ["Nexon", "Harrier", "Safari", "Altroz", "Tiago","Tigor", "Hexa", "Zest", "Indica", "Indigo","Punch", "Magic IRIS", "Venture"],
    Hyundai: ["Creta", "Verna", "i20", "Tucson", "Kona","Elantra", "Venue", "Sonata", "Santa Fe","i10", "i30", "i40", "iX35"],
    Maruti: ["Swift", "Dzire", "Baleno", "Vitara Brezza", "Alto","Wagon R", "Ertiga", "S-Cross", "Celerio","XL6", "Ignis", "Kizashi"],
    Kia: ["Seltos", "Sonet", "Carnival", "Sportage", "Stinger","Rio", "Forte", "Optima", "Cadenza"],
    Volkswagen: ["Polo", "Vento", "Tiguan", "T-Roc", "Jetta","Passat", "Virtus", "Taigun", "ID.4"],
    Chevrolet: ["Sail", "Beat", "Cruze", "Tavera", "Captiva","Trailblazer", "Equinox", "Tracker"],
    Renault: ["Duster", "Kwid", "Captur", "Triber", "Lodgy","Kiger", "Fluence", "Scala"],
    Skoda: ["Octavia", "Superb", "Kodiaq", "Kushaq", "Rapid","Fabia", "Slavia", "Laura"],
    Fiat: ["Punto", "Linea", "Abarth", "500", "Panda","Tipo", "Ducato"],
    Mahindra: ["Thar", "XUV700", "Scorpio", "Bolero", "TUV300","KUV100", "Marazzo", "Alturas G4"],
    Isuzu: ["D-Max", "MU-X", "V-Cross", "D-Max S-Cab"],
    Bajaj_Auto: ["Pulsar", "Dominar", "Avenger", "Discover","Platina", "CT100", "V15"],
    Ashok_Leyland: ["Dost", "Partner", "Stile", "Boss","Comet", "Ecomet", "U-Truck"],
    Hindustan_Motors: ["Ambassador", "Contessa", "Landmaster","Morris Oxford", "Hindustan Trekker"],
    Royal_Enfield: ["Classic", "Bullet", "Himalayan", "Interceptor","Continental GT", "Thunderbird", "Meteor"],
    Ferrari: ["488", "F8", "Portofino", "Roma","SF90 Stradale", "LaFerrari", "California"],
    Lamborghini: ["Huracan", "Aventador", "Urus", "Gallardo","Sián", "Countach", "Murcielago"],
    Porsche: ["911", "Cayenne", "Macan", "Panamera","Boxster", "Cayman", "Taycan"],
    Ducati: ["Panigale", "Monster", "Multistrada", "Scrambler","Diavel", "Streetfighter", "XDiavel"],
    KTM: ["Duke", "RC", "Adventure", "390 Duke","250 Duke", "390 Adventure", "RC 200"],
    Yamaha: ["YZF-R1", "YZF-R3", "MT-09", "FZ-07","FZ-09", "Tracer 900", "XSR900"],
    Rolls_Royce: ["Phantom", "Ghost", "Cullinan","Wraith", "Dawn", "Silver Shadow"],
    Aston_Martin: ["DB11", "Vantage", "DBS", "Rapide","DBX", "Valkyrie", "One-77"],
    Bugatti: ["Chiron", "Veyron", "Divo", "Centodieci","La Voiture Noire", "EB110", "Chiron Super Sport"],
    Maserati: ["Ghibli", "Quattroporte", "Levante","Alfieri", "MC20", "GranTurismo"],
    Tesla: ["Model S", "Model 3", "Model X", "Model Y","Cybertruck", "Roadster"],
    Mithsubishi: ["Pajero", "Outlander", "ASX", "Eclipse Cross","Lancer", "Montero", "Galant"],
    Tata_Motors: ["Nexon EV", "Tigor EV", "Tiago EV","Harrier EV", "Safari EV"],
    Konigsegg: ["Agera", "Regera", "Jesko", "Gemera","CCX", "One:1", "CCXR"],
    Dodge: ["Charger", "Challenger", "Durango","Ram 1500", "Viper", "Dart"],
    Jeep: ["Wrangler", "Cherokee", "Grand Cherokee","Renegade", "Compass", "Gladiator"],
    Volvo: ["XC90", "XC60", "S60", "S90","V60", "V90", "C40 Recharge"],
    Land_Rover: ["Range Rover", "Discovery", "Defender","Evoque", "Velar", "Sport"],
    Subaru: ["Outback", "Forester", "Crosstrek","Impreza", "Legacy", "Ascent"],
    Audi: ["A4", "A6", "Q5", "Q7","A8", "Q3", "TT"],
    Ola: ["S1 Pro", "S1 Air", "S1X","S1 Ultra"],
    Ather: ["450X", "450 Plus", "450S","450R"],
    Bajaj: ["Chetak", "Pulsar EV", "Urbanite","Avenger EV"],
    TVS: ["iQube", "Zephyr", "Xtreme","Apache EV"],
  },
}

  const categories = [
    {
      id: "brakes",
      name: "Brakes",
      description: "High-quality brake pads and rotors.",
      icon: "disc",
      color: "var(--primary)",
    },
    {
      id: "engine",
      name: "Engine Parts",
      description: "Essential components for engine maintenance.",
      icon: "cpu",
      color: "var(--secondary)",
    },
    {
      id: "suspension",
      name: "Suspension",
      description: "Upgrade your vehicle's suspension system.",
      icon: "sliders",
      color: "var(--tertiary)",
    },
    {
      id: "exhaust",
      name: "Exhaust",
      description: "Performance exhaust systems for enhanced sound.",
      icon: "wind",
      color: "var(--quaternary)",
    },
  ]

  const products = [
    {
      id: "brake-pad-1",
      name: "Brake Pads - Ceramic",
      brand: "Akebono",
      price: 49.99,
      image: "https://via.placeholder.com/150",
      inStock: true,
    },
    {
      id: "rotor-1",
      name: "Brake Rotor - Drilled",
      brand: "Brembo",
      price: 79.99,
      image: "https://via.placeholder.com/150",
      inStock: true,
    },
    {
      id: "spark-plug-1",
      name: "Spark Plug - Iridium",
      brand: "NGK",
      price: 9.99,
      image: "https://via.placeholder.com/150",
      inStock: true,
    },
    {
      id: "air-filter-1",
      name: "Air Filter - High Flow",
      brand: "K&N",
      price: 24.99,
      image: "https://via.placeholder.com/150",
      inStock: false,
    },
    {
      id: "shock-absorber-1",
      name: "Shock Absorber - Front",
      brand: "Bilstein",
      price: 99.99,
      image: "https://via.placeholder.com/150",
      inStock: true,
    },
  ]

  // Vehicle selector elements
  const carMakeSelect = document.getElementById("car-make")
  const carModelSelect = document.getElementById("car-model")
  const carConditionSelect = document.getElementById("car-condition")
  const findPartsButton = document.getElementById("find-parts-button")

  // Category grid
  const categoryGrid = document.getElementById("category-grid")

  // Featured products
  const featuredProductsGrid = document.getElementById("featured-products")

  // Populate car makes dropdown
  const populateCarMakes = () => {
    carData.makes.forEach((make) => {
      const option = document.createElement("option")
      option.value = make
      option.textContent = make
      carMakeSelect.appendChild(option)
    })
  }

  // Update car models based on selected make
  const updateCarModels = () => {
    // Clear current options
    carModelSelect.innerHTML = '<option value="">Select Model</option>'

    const selectedMake = carMakeSelect.value
    if (selectedMake) {
      // Enable select
      carModelSelect.disabled = false

      // Add options
      const models = carData.models[selectedMake]
      models.forEach((model) => {
        const option = document.createElement("option")
        option.value = model
        option.textContent = model
        carModelSelect.appendChild(option)
      })
    } else {
      // Disable select if no make is selected
      carModelSelect.disabled = true
    }

    // Update find parts button state
    updateFindPartsButton()
  }

  // Update find parts button state
  const updateFindPartsButton = () => {
    const makeSelected = carMakeSelect.value !== ""
    const modelSelected = carModelSelect.value !== ""

    findPartsButton.disabled = !(makeSelected && modelSelected)
  }

  // Handle find parts button click
  const handleFindParts = () => {
    const make = carMakeSelect.value
    const model = carModelSelect.value
    const condition = carConditionSelect.value

    // Redirect to products page with query parameters
    window.location.href = `products.html?make=${encodeURIComponent(make)}&model=${encodeURIComponent(model)}&condition=${encodeURIComponent(condition)}`
  }

  // Render categories
  const renderCategories = () => {
    categories.forEach((category, index) => {
      const categoryCard = document.createElement("div")
      categoryCard.className = `category-card ${category.color}`
      categoryCard.dataset.delay = index * 100
      categoryCard.innerHTML = `
        <div class="category-icon">
          <i data-feather="${category.icon}" width="48" height="48"></i>
        </div>
        <h3 class="category-title">${category.name}</h3>
        <p class="category-description">${category.description}</p>
      `

      categoryGrid.appendChild(categoryCard)

      // Add click event
      categoryCard.addEventListener("click", () => {
        window.location.href = `products.html?category=${category.id}`
      })
    })

    // Initialize Feather icons
    feather.replace()

    // Animate categories on scroll
    observeElements(document.querySelectorAll(".category-card"), "visible")
  }

  // Render featured products
  const renderFeaturedProducts = () => {
    // Get first 4 products
    const featuredProducts = products.slice(0, 4)

    featuredProducts.forEach((product, index) => {
      const productCard = document.createElement("div")
      productCard.className = "product-card"
      productCard.dataset.delay = index * 100
      productCard.innerHTML = `
        <div class="product-image-container">
          <img src="${product.image}" alt="${product.name}" class="product-image">
          <button class="product-favorite">
            <i data-feather="heart"></i>
          </button>
          ${!product.inStock ? '<div class="product-out-of-stock">Out of Stock</div>' : ""}
        </div>
        
        <div class="product-details">
          <h3 class="product-name">${product.name}</h3>
          <p class="product-brand">${product.brand}</p>
          <p class="product-price">$${product.price.toFixed(2)}</p>
          
          <button 
            class="add-to-cart-button ${product.inStock ? "in-stock" : "out-of-stock"}" 
            ${!product.inStock ? "disabled" : ""}
            data-product-id="${product.id}"
            onclick="addToCart(${JSON.stringify(product).replace(/"/g, "&quot;")})">
            <i data-feather="shopping-cart" class="add-to-cart-icon"></i>
            Add to Cart
          </button>
        </div>
      `

      featuredProductsGrid.appendChild(productCard)
    })

    // Initialize Feather icons
    feather.replace()

    // Animate products on scroll
    observeElements(document.querySelectorAll(".product-card"), "visible")
  }

  // Intersection Observer for animations
  const observeElements = (elements, className) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Add delay based on index
            const delay = entry.target.dataset.delay || 0
            setTimeout(() => {
              entry.target.classList.add(className)
            }, delay)
          }
        })
      },
      { threshold: 0.1 },
    )

    elements.forEach((element) => {
      observer.observe(element)
    })
  }

  // Event listeners
  carMakeSelect.addEventListener("change", updateCarModels)
  carModelSelect.addEventListener("change", updateFindPartsButton)
  findPartsButton.addEventListener("click", handleFindParts)

  // Initialize
  populateCarMakes()
  renderCategories()
  renderFeaturedProducts()

  // Initialize Feather icons (moved here to ensure it's called after elements are rendered)
  feather.replace()
})

// Mock addToCart function
function addToCart(product) {
  console.log("Added to cart:", product)
  alert(`${product.name} added to cart!`)
}

