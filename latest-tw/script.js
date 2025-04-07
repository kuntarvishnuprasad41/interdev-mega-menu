document.addEventListener('DOMContentLoaded', function () {
    // Desktop menu variables
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    const whatWeDoItem = document.querySelector('.nav-item.has-dropdown:nth-child(2)');
    const whatWeDoLink = whatWeDoItem.querySelector('.nav-link');
    const megaDropdown = document.getElementById('mega-dropdown');
    const menuCategories = document.querySelectorAll('.menu-category');

    // Mobile menu variables
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuItems = document.querySelectorAll('.mobile-menu-item');
    const mobileSubmenuItems = document.querySelectorAll('.mobile-submenu-item');

    // Desktop menu hover functionality
    let isOverMenu = false;
    let isOverDropdown = false;
    let timeoutId = null;

    // Function to check if we should show or hide the dropdown
    function updateDropdownVisibility() {
        if (isOverMenu || isOverDropdown) {
            megaDropdown.classList.add('active');
        } else {
            megaDropdown.classList.remove('active');
        }
    }

    // Mouse enter/leave for the menu item
    whatWeDoItem.addEventListener('mouseenter', function () {
        isOverMenu = true;
        clearTimeout(timeoutId);
        updateDropdownVisibility();
    });

    whatWeDoItem.addEventListener('mouseleave', function () {
        isOverMenu = false;
        // Small delay to allow mouse to enter the dropdown
        timeoutId = setTimeout(updateDropdownVisibility, 100);
    });

    // Mouse enter/leave for the dropdown
    megaDropdown.addEventListener('mouseenter', function () {
        isOverDropdown = true;
        clearTimeout(timeoutId);
        updateDropdownVisibility();
    });

    megaDropdown.addEventListener('mouseleave', function () {
        isOverDropdown = false;
        // Small delay to allow mouse to enter the menu item
        timeoutId = setTimeout(updateDropdownVisibility, 100);
    });

    // Handle category hover on desktop
    menuCategories.forEach(category => {
        category.addEventListener('mouseenter', function () {
            // Remove active class from all categories
            menuCategories.forEach(cat => cat.classList.remove('active'));

            // Add active class to current category
            this.classList.add('active');

            // Get category ID
            const categoryId = this.getAttribute('data-category');

            // Hide all content sections
            document.querySelectorAll('.category-content').forEach(content => {
                content.classList.remove('active');
            });

            // Show the corresponding content section
            document.getElementById(`${categoryId}-content`).classList.add('active');
        });
    });

    // Mobile menu toggle
    mobileMenuToggle.addEventListener('click', function () {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });

    // Mobile menu item click handlers
    mobileMenuItems.forEach(item => {
        const link = item.querySelector('.mobile-menu-link');
        const submenu = item.querySelector('.mobile-submenu');

        if (submenu) {
            link.addEventListener('click', function (e) {
                e.preventDefault();

                // Toggle active class for this item
                item.classList.toggle('active');
                submenu.classList.toggle('active');

                // Toggle dropdown icon direction
                const icon = this.querySelector('.mobile-dropdown-icon');
                if (icon) {
                    icon.classList.toggle('down');
                }

                // Close other items at the same level
                mobileMenuItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.mobile-submenu').classList.remove('active');
                        const otherIcon = otherItem.querySelector('.mobile-dropdown-icon');
                        if (otherIcon) {
                            otherIcon.classList.remove('down');
                        }
                    }
                });
            });
        }
    });

    // Mobile submenu item click handlers
    mobileSubmenuItems.forEach(item => {
        const link = item.querySelector('.mobile-submenu-link');
        const subsubmenu = item.querySelector('.mobile-subsubmenu');

        if (subsubmenu) {
            link.addEventListener('click', function (e) {
                e.preventDefault();

                // Toggle active class for this item
                item.classList.toggle('active');
                subsubmenu.classList.toggle('active');

                // Toggle dropdown icon direction
                const icon = this.querySelector('.mobile-dropdown-icon');
                if (icon) {
                    icon.classList.toggle('down');
                }

                // Close other items at the same level
                const parentSubmenu = item.closest('.mobile-submenu');
                parentSubmenu.querySelectorAll('.mobile-submenu-item').forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.mobile-subsubmenu').classList.remove('active');
                        const otherIcon = otherItem.querySelector('.mobile-dropdown-icon');
                        if (otherIcon) {
                            otherIcon.classList.remove('down');
                        }
                    }
                });
            });
        }
    });

    // Handle window resize
    window.addEventListener('resize', function () {
        if (window.innerWidth > 991) {
            // Reset mobile menu state
            mobileMenuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');

            // Reset dropdown states for mobile
            document.querySelectorAll('.mobile-submenu.active, .mobile-subsubmenu.active').forEach(el => {
                el.classList.remove('active');
            });

            document.querySelectorAll('.mobile-dropdown-icon.down').forEach(icon => {
                icon.classList.remove('down');
            });
        } else {
            // Reset hover states on mobile
            isOverMenu = false;
            isOverDropdown = false;
            megaDropdown.classList.remove('active');
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (e) {
        if (window.innerWidth <= 991) {
            if (!e.target.closest('.mobile-menu') && !e.target.closest('.mobile-menu-toggle') && mobileMenu.classList.contains('active')) {
                mobileMenuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
            }
        }
    });
});