// Authentication functionality for OEM Rebuilds website

document.addEventListener("DOMContentLoaded", () => {
  // Auth elements
  const userButton = document.getElementById("user-button")
  const userDropdown = document.getElementById("user-dropdown")
  const userInfo = document.getElementById("user-info")
  const loginButton = document.getElementById("login-button")
  const logoutButton = document.getElementById("logout-button")
  const loginModal = document.getElementById("login-modal")
  const loginModalOverlay = document.getElementById("login-modal-overlay")
  const closeLoginModalButton = document.getElementById("close-login-modal")
  const authForm = document.getElementById("auth-form")
  const authModalTitle = document.getElementById("auth-modal-title")
  const authSubmitButton = document.getElementById("auth-submit-button")
  const toggleAuthModeButton = document.getElementById("toggle-auth-mode")
  const nameGroup = document.getElementById("name-group")
  const nameInput = document.getElementById("name")
  const emailInput = document.getElementById("email")
  const passwordInput = document.getElementById("password")
  const authError = document.getElementById("auth-error")

  // Auth state
  let isRegistering = false
  let isLoggedIn = false
  let currentUser = null

  // Check if user is logged in
  const checkAuth = () => {
    const userData = localStorage.getItem("user")
    if (userData) {
      try {
        currentUser = JSON.parse(userData)
        isLoggedIn = true
        userInfo.textContent = `Hello, ${currentUser.name}`
        loginButton.style.display = "none"
        logoutButton.style.display = "block"
      } catch (error) {
        console.error("Failed to parse user data:", error)
        isLoggedIn = false
        currentUser = null
      }
    } else {
      isLoggedIn = false
      currentUser = null
      userInfo.textContent = "Hello, Guest"
      loginButton.style.display = "block"
      logoutButton.style.display = "none"
    }
  }

  // Open login modal
  const openLoginModal = () => {
    loginModal.classList.add("active")
    loginModalOverlay.classList.add("active")
    document.body.style.overflow = "hidden"
    resetAuthForm()
  }

  // Close login modal
  const closeLoginModal = () => {
    loginModal.classList.remove("active")
    loginModalOverlay.classList.remove("active")
    document.body.style.overflow = "auto"
  }

  // Reset auth form
  const resetAuthForm = () => {
    authForm.reset()
    authError.style.display = "none"
    updateAuthFormMode()
  }

  // Update auth form mode (login/register)
  const updateAuthFormMode = () => {
    if (isRegistering) {
      authModalTitle.textContent = "Create Account"
      authSubmitButton.textContent = "Create Account"
      toggleAuthModeButton.textContent = "Already have an account? Login"
      nameGroup.style.display = "block"
    } else {
      authModalTitle.textContent = "Login"
      authSubmitButton.textContent = "Login"
      toggleAuthModeButton.textContent = "Don't have an account? Register"
      nameGroup.style.display = "none"
    }
  }

  // Toggle auth mode
  const toggleAuthMode = () => {
    isRegistering = !isRegistering
    updateAuthFormMode()
  }

  // Handle login/register
  const handleAuth = (e) => {
    e.preventDefault()
    authError.style.display = "none"

    const email = emailInput.value.trim()
    const password = passwordInput.value.trim()

    if (isRegistering) {
      // Register new user
      const name = nameInput.value.trim()

      if (!name || !email || !password) {
        authError.textContent = "All fields are required"
        authError.style.display = "block"
        return
      }

      // Save user to localStorage
      const user = { name, email, password }
      localStorage.setItem("user", JSON.stringify(user))

      // Update auth state
      currentUser = user
      isLoggedIn = true

      // Close modal and update UI
      closeLoginModal()
      checkAuth()
    } else {
      // Login existing user
      const storedUser = localStorage.getItem("user")

      if (!storedUser) {
        authError.textContent = "No account found. Please register."
        authError.style.display = "block"
        return
      }

      const user = JSON.parse(storedUser)

      if (user.email === email && user.password === password) {
        // Update auth state
        currentUser = user
        isLoggedIn = true

        // Close modal and update UI
        closeLoginModal()
        checkAuth()
      } else {
        authError.textContent = "Invalid email or password"
        authError.style.display = "block"
      }
    }
  }

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user")
    isLoggedIn = false
    currentUser = null
    checkAuth()
  }

  // Event listeners
  loginButton.addEventListener("click", openLoginModal)
  closeLoginModalButton.addEventListener("click", closeLoginModal)
  loginModalOverlay.addEventListener("click", closeLoginModal)
  toggleAuthModeButton.addEventListener("click", toggleAuthMode)
  authForm.addEventListener("submit", handleAuth)
  logoutButton.addEventListener("click", handleLogout)

  // Close modal when pressing Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && loginModal.classList.contains("active")) {
      closeLoginModal()
    }
  })

  // Check auth on page load
  checkAuth()
})

