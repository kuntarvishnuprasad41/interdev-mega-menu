window.addEventListener("DOMContentLoaded", () => {
    const burger = document.querySelector(".header__burger")
    const navWrapper = document.querySelector(".header__navigation-wrapper")

    if (burger && navWrapper) {
        burger.addEventListener("click", () => {
            burger.classList.toggle("active")
            navWrapper.classList.toggle("open")
        })
    }

    // Main menu items with submenu
    document.querySelectorAll(".header__list-item.has-submenu").forEach((item) => {
        const link = item.querySelector(".header__link")

        // Fix hover issue by using mouseenter/mouseleave instead of hover
        if (window.innerWidth > 1024) {
            // Use mouseenter/mouseleave for more precise hover control
            item.addEventListener("mouseenter", () => {
                if (window.innerWidth > 1024) {
                    // Close other open menus first
                    document.querySelectorAll(".header__list-item.has-submenu").forEach((otherItem) => {
                        if (otherItem !== item) {
                            otherItem.classList.remove("hover")
                        }
                    })
                    item.classList.add("hover")
                }
            })

            item.addEventListener("mouseleave", () => {
                if (window.innerWidth > 1024) {
                    item.classList.remove("hover")
                }
            })
        }

        if (link) {
            link.addEventListener("click", (e) => {
                if (window.innerWidth <= 1024) {
                    e.preventDefault()

                    // Close other open menus
                    document.querySelectorAll(".header__list-item.has-submenu.active").forEach((activeItem) => {
                        if (activeItem !== item) {
                            activeItem.classList.remove("active")
                            const activeSubmenu = activeItem.querySelector(".submenu-wrapper")
                            if (activeSubmenu) {
                                activeSubmenu.style.maxHeight = null
                            }
                        }
                    })

                    // Toggle current menu
                    item.classList.toggle("active")

                    const submenuWrapper = item.querySelector(".submenu-wrapper")
                    if (submenuWrapper) {
                        if (submenuWrapper.style.maxHeight) {
                            submenuWrapper.style.maxHeight = null
                        } else {
                            submenuWrapper.style.maxHeight = `${submenuWrapper.scrollHeight}px`
                        }
                    }
                }
            })
        }
    })

    // Handle submenu items with further submenus
    document.querySelectorAll(".submenu-list__item.has-submenu").forEach((subItem) => {
        subItem.addEventListener("click", (e) => {
            if (window.innerWidth <= 1024) {
                e.stopPropagation() // Prevent triggering parent menu toggle

                // Close other open submenus at the same level
                const parentList = subItem.closest(".submenu-list")
                if (parentList) {
                    parentList.querySelectorAll(".submenu-list__item.has-submenu.active").forEach((activeSubItem) => {
                        if (activeSubItem !== subItem) {
                            activeSubItem.classList.remove("active")
                            const activeContent = activeSubItem.querySelector(".submenu-content")
                            if (activeContent) {
                                activeContent.style.display = "none"
                            }
                        }
                    })
                }

                // Toggle current submenu
                subItem.classList.toggle("active")

                // Toggle visibility of submenu content
                const submenuContent = subItem.querySelector(".submenu-content")
                if (submenuContent) {
                    if (submenuContent.style.display === "block") {
                        submenuContent.style.display = "none"
                    } else {
                        submenuContent.style.display = "block"

                        // Update parent submenu wrapper height to accommodate the new content
                        setTimeout(() => {
                            const parentSubmenuWrapper = subItem.closest(".submenu-wrapper")
                            if (parentSubmenuWrapper && parentSubmenuWrapper.style.maxHeight) {
                                parentSubmenuWrapper.style.maxHeight = `${parentSubmenuWrapper.scrollHeight}px`
                            }
                        }, 10)
                    }
                }
            }
        })
    })

    // Handle window resize
    window.addEventListener("resize", () => {
        if (window.innerWidth <= 1024) {
            document.querySelectorAll(".header__list-item.has-submenu.active").forEach((item) => {
                const submenuWrapper = item.querySelector(".submenu-wrapper")
                if (submenuWrapper) {
                    submenuWrapper.style.maxHeight = `${submenuWrapper.scrollHeight}px`
                }
            })
        } else {
            // Reset mobile-specific styles when returning to desktop
            document.querySelectorAll(".submenu-wrapper").forEach((wrapper) => {
                wrapper.style.maxHeight = null
            })

            document.querySelectorAll(".submenu-content").forEach((content) => {
                content.style.display = ""
            })

            // Reset burger menu when switching to desktop
            if (burger && navWrapper) {
                burger.classList.remove("active")
                navWrapper.classList.remove("open")
            }
        }
    })

    // Prevent default action for placeholder links
    document.querySelectorAll('a[href="#"]').forEach((link) => {
        link.addEventListener("click", (e) => {
            if (!link.closest(".submenu-list__item.has-submenu") || window.innerWidth > 1024) {
                e.preventDefault()
            }
        })
    })

    // Desktop hover functionality for submenu items
    const submenuWrappers = document.querySelectorAll(".submenu-wrapper")

    submenuWrappers.forEach((submenuWrapper) => {
        const submenuItems = submenuWrapper.querySelectorAll(".submenu-list__item.has-submenu")
        const defaultActiveItem = submenuWrapper.querySelector(".submenu-list__item.has-submenu.active")

        let returnTimeout

        submenuItems.forEach((item) => {
            item.addEventListener("mouseenter", () => {
                if (window.innerWidth <= 1024) return // Skip for mobile
                clearTimeout(returnTimeout)

                submenuItems.forEach((i) => i.classList.remove("active"))
                item.classList.add("active")
            })
        })

        submenuWrapper.addEventListener("mouseleave", () => {
            if (window.innerWidth <= 1024) return // Skip for mobile

            submenuItems.forEach((i) => i.classList.remove("active"))

            returnTimeout = setTimeout(() => {
                if (defaultActiveItem) {
                    defaultActiveItem.classList.add("active")
                }
            }, 300)
        })
    })
})

