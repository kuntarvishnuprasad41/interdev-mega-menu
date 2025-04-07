window.addEventListener("DOMContentLoaded", () => {
    const burger = document.querySelector(".header__burger");
    const navWrapper = document.querySelector(".header__navigation-wrapper");

    if (burger && navWrapper) {
        burger.addEventListener("click", () => {
            burger.classList.toggle("active");
            navWrapper.classList.toggle("open");
        });
    }

    // Main menu items with submenu
    document.querySelectorAll(".header__list-item.has-submenu").forEach((item) => {
        item.addEventListener("click", (e) => {
            if (window.innerWidth > 1025) return;

            // Don't trigger if clicking on a child submenu item
            if (e.target.closest(".submenu-list__item") && e.target !== item) {
                return;
            }

            item.classList.toggle("active");

            const submenuWrapper = item.querySelector(".submenu-wrapper");

            if (submenuWrapper.style.maxHeight) {
                submenuWrapper.style.maxHeight = null;
            } else {
                submenuWrapper.style.maxHeight = `${submenuWrapper.scrollHeight}px`;
            }
        });
    });

    // Handle submenu items with further submenus
    document.querySelectorAll(".submenu-list__item.has-submenu").forEach((subItem) => {
        subItem.addEventListener("click", (e) => {
            if (window.innerWidth > 1025) return;
            e.stopPropagation(); // Prevent triggering parent menu toggle

            subItem.classList.toggle("active");

            // Toggle visibility of submenu content
            const submenuContent = subItem.querySelector(".submenu-content");
            if (submenuContent) {
                if (submenuContent.style.display === "block") {
                    submenuContent.style.display = "none";
                } else {
                    submenuContent.style.display = "block";

                    // Update parent submenu wrapper height to accommodate the new content
                    const parentSubmenuWrapper = subItem.closest(".submenu-wrapper");
                    if (parentSubmenuWrapper && parentSubmenuWrapper.style.maxHeight) {
                        parentSubmenuWrapper.style.maxHeight = `${parentSubmenuWrapper.scrollHeight}px`;
                    }
                }
            }
        });
    });

    // Handle window resize
    window.addEventListener("resize", () => {
        if (window.innerWidth <= 1025) {
            document
                .querySelectorAll(".header__list-item.has-submenu.active")
                .forEach((item) => {
                    const submenuWrapper = item.querySelector(".submenu-wrapper");

                    if (submenuWrapper) {
                        submenuWrapper.style.maxHeight = `${submenuWrapper.scrollHeight}px`;
                    }
                });
        } else {
            document.querySelectorAll(".submenu-wrapper").forEach((wrapper) => {
                wrapper.style.maxHeight = null;
            });

            // Reset mobile-specific styles when returning to desktop
            document.querySelectorAll(".submenu-content").forEach((content) => {
                content.style.display = "";
            });
        }
    });

    // Prevent default action for placeholder links
    document.querySelectorAll('a[href="#"]').forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
        });
    });

    // Desktop hover functionality for submenu items
    const submenuWrappers = document.querySelectorAll(".submenu-wrapper");

    submenuWrappers.forEach((submenuWrapper) => {
        const submenuItems = submenuWrapper.querySelectorAll(
            ".submenu-list__item.has-submenu"
        );
        const defaultActiveItem = submenuWrapper.querySelector(
            ".submenu-list__item.has-submenu.active"
        );

        let returnTimeout;

        submenuItems.forEach((item) => {
            item.addEventListener("mouseenter", () => {
                if (window.innerWidth <= 1025) return; // Skip for mobile
                clearTimeout(returnTimeout);

                submenuItems.forEach((i) => i.classList.remove("active"));

                item.classList.add("active");
            });
        });

        submenuWrapper.addEventListener("mouseleave", () => {
            if (window.innerWidth <= 1025) return; // Skip for mobile
            submenuItems.forEach((i) => i.classList.remove("active"));

            returnTimeout = setTimeout(() => {
                if (defaultActiveItem) {
                    defaultActiveItem.classList.add("active");
                }
            }, 300);
        });
    });
});