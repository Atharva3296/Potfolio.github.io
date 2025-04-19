document.addEventListener("DOMContentLoaded", () => {
    const burger = document.querySelector(".burger")
    const nav = document.querySelector(".nav-links")
    const navLinks = document.querySelectorAll(".nav-links li")
    const header = document.querySelector("header")
    const formStatus = document.getElementById("form-status")
  
    // Toggle mobile menu
    burger.addEventListener("click", () => {
      nav.classList.toggle("nav-active")
  
      // Animate links
      navLinks.forEach((link, index) => {
        if (link.style.animation) {
          link.style.animation = ""
        } else {
          link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`
        }
      })
  
      // Burger animation
      burger.classList.toggle("toggle")
    })
  
    // Close mobile menu when clicking outside
    document.addEventListener("click", (e) => {
      if (nav.classList.contains("nav-active") && !e.target.closest(".nav-links") && !e.target.closest(".burger")) {
        nav.classList.remove("nav-active")
        burger.classList.remove("toggle")
  
        navLinks.forEach((link) => {
          link.style.animation = ""
        })
      }
    })
  
    // Header scroll effect
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        header.classList.add("scrolled")
      } else {
        header.classList.remove("scrolled")
      }
    })
  
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
  
        // Close mobile menu if open
        if (nav.classList.contains("nav-active")) {
          nav.classList.remove("nav-active")
          burger.classList.remove("toggle")
        }
  
        const targetId = this.getAttribute("href")
        const targetElement = document.querySelector(targetId)
  
        if (targetElement) {
          const headerHeight = document.querySelector("header").offsetHeight
          const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight
  
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          })
        }
      })
    })
  
    // Enhanced form submission with validation and feedback
    const form = document.getElementById("contact-form")
    form.addEventListener("submit", (e) => {
      e.preventDefault()
  
      // Basic form validation
      const name = document.getElementById("name").value.trim()
      const email = document.getElementById("email").value.trim()
      const message = document.getElementById("message").value.trim()
  
      if (!name || !email || !message) {
        showFormStatus("Please fill in all fields", "error")
        return
      }
  
      if (!isValidEmail(email)) {
        showFormStatus("Please enter a valid email address", "error")
        return
      }
  
      // Simulate form submission (replace with actual submission logic)
      showFormStatus("Sending message...", "pending")
  
      // Simulate API call with timeout
      setTimeout(() => {
        showFormStatus("Your message has been sent successfully! I will get back to you soon.", "success")
        form.reset()
      }, 1500)
    })
  
    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    }
  
    function showFormStatus(message, status) {
      formStatus.textContent = message
      formStatus.className = "form-status"
      formStatus.classList.add(status)
  
      if (status === "success" || status === "error") {
        setTimeout(() => {
          formStatus.classList.remove(status)
          formStatus.textContent = ""
        }, 5000)
      }
    }
  
    // Testimonial slider - enhanced for touch devices
    const testimonials = document.querySelector(".testimonials-slider")
    let isDown = false
    let startX
    let scrollLeft
  
    testimonials.addEventListener("mousedown", (e) => {
      isDown = true
      testimonials.style.cursor = "grabbing"
      startX = e.pageX - testimonials.offsetLeft
      scrollLeft = testimonials.scrollLeft
    })
  
    testimonials.addEventListener("mouseleave", () => {
      isDown = false
      testimonials.style.cursor = "grab"
    })
  
    testimonials.addEventListener("mouseup", () => {
      isDown = false
      testimonials.style.cursor = "grab"
    })
  
    testimonials.addEventListener("mousemove", (e) => {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX - testimonials.offsetLeft
      const walk = (x - startX) * 2
      testimonials.scrollLeft = scrollLeft - walk
    })
  
    // Touch events for testimonials slider
    testimonials.addEventListener("touchstart", (e) => {
      isDown = true
      startX = e.touches[0].pageX - testimonials.offsetLeft
      scrollLeft = testimonials.scrollLeft
    })
  
    testimonials.addEventListener("touchend", () => {
      isDown = false
    })
  
    testimonials.addEventListener("touchmove", (e) => {
      if (!isDown) return
      const x = e.touches[0].pageX - testimonials.offsetLeft
      const walk = (x - startX) * 2
      testimonials.scrollLeft = scrollLeft - walk
    })
  
    // Resume download
    const resumeBtn = document.getElementById("resume-btn")
    resumeBtn.addEventListener("click", (e) => {
      // The download attribute in the anchor tag handles the download
      // This is just for additional feedback
      setTimeout(() => {
        alert("Thank you for downloading my resume!")
      }, 500)
    })
  
    // Add animation to skills on scroll
    const skills = document.querySelectorAll(".skill")
  
    const observerOptions = {
      threshold: 0.2,
    }
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)
  
    skills.forEach((skill) => {
      skill.style.opacity = "0"
      skill.style.transform = "translateY(30px)"
      skill.style.transition = "opacity 0.5s ease, transform 0.5s ease"
      observer.observe(skill)
    })
  })
  
