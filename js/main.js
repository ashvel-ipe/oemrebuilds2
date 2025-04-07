// Main JavaScript file for OEM Rebuilds website

document.addEventListener("DOMContentLoaded", () => {
  // Import Feather icons
  import feather from 'feather-icons';

  // Initialize Feather icons
  feather.replace()

  // Set current year in footer
  document.getElementById("current-year").textContent = new Date().getFullYear()

  // Header scroll effect
  const header = document.querySelector(".header")
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })

  // Mobile menu toggle
  const mobileMenuButton = document.getElementById("mobile-menu-button")
  const mobileMenu = document.getElementById("mobile-menu")

  mobileMenuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("active")

    // Toggle icon between menu and x
    const icon = mobileMenuButton.querySelector("i")
    if (mobileMenu.classList.contains("active")) {
      icon.setAttribute("data-feather", "x")
    } else {
      icon.setAttribute("data-feather", "menu")
    }
    feather.replace()
  })

  // Close mobile menu when clicking a link
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active")
      mobileMenuButton.querySelector("i").setAttribute("data-feather", "menu")
      feather.replace()
    })
  })

  // Intersection Observer for animations
  const observeElements = (elements, className) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(className)
          }
        })
      },
      { threshold: 0.1 },
    )

    elements.forEach((element) => {
      observer.observe(element)
    })
  }
})

