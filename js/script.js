(function () {
    // Run when DOM is ready
    document.addEventListener("DOMContentLoaded", initNavbar);

    function initNavbar() {
        // Mega menu and navbar logic (runs for all users)
        let navLinks = document.querySelectorAll(
            ".mof-navbar .nav-link[data-target]"
        );
        let menuToggleContent = document.querySelector(
            ".mof-navbar .navbar-collapse"
        );
        const overlay = document.getElementById("overlay");
        let body = document.body;
        let activeMenu = null;
        let firstInteraction = true;

        const toggler = document.querySelector(".mof-navbar .navbar-toggler");
        const menu = document.querySelector("#navbarNavDropdown");

        if (toggler && menu) {
            toggler.addEventListener("click", function (e) {
                e.stopPropagation();
                menu.classList.toggle("show");

                if (menu.classList.contains("show")) {
                    body.classList.add("no-scroll");
                } else {
                    body.classList.remove("no-scroll");
                }
            });

            document.addEventListener("click", function (e) {
                const clickedInside =
                    menu.contains(e.target) || toggler.contains(e.target);
                if (!clickedInside) {
                    menu.classList.remove("show");
                    body.classList.remove("no-scroll");
                }
            });
        }

        let searchOnMobile = document.querySelector("#searchOnMobile");
        if (searchOnMobile && menuToggleContent) {
            searchOnMobile.addEventListener("click", function () {
                if (menuToggleContent.classList.contains("show")) {
                    menuToggleContent.classList.remove("show");
                }
            });
        }

        navLinks.forEach(function (link) {
            link.addEventListener("click", function (event) {
                event.preventDefault();

                let targetMenu = document.querySelector(
                    this.getAttribute("data-target")
                );
                if (!targetMenu) return;

                if (firstInteraction) {
                    enableTransition();
                    firstInteraction = false;
                }

                if (activeMenu === targetMenu) {
                    closeMenu(targetMenu);
                    this.classList.remove("active");
                    activeMenu = null;
                } else {
                    if (activeMenu) {
                        closeMenu(activeMenu);
                        let activeLink = document.querySelector(
                            ".mof-navbar .nav-link.active"
                        );
                        if (activeLink) activeLink.classList.remove("active");
                    }
                    openMenu(targetMenu);
                    this.classList.add("active");
                    activeMenu = targetMenu;
                }
            });
        });

        document.addEventListener("click", function (event) {
            if (
                activeMenu &&
                !activeMenu.contains(event.target) &&
                !event.target.matches(".nav-link")
            ) {
                closeMenu(activeMenu);
                let activeLink = document.querySelector(".mof-navbar .nav-link.active");
                if (activeLink) activeLink.classList.remove("active");
                activeMenu = null;
            }
        });

        function enableTransition() {
            document.querySelectorAll(".mega-menu-content").forEach(function (menu) {
                menu.classList.add("transition-enabled");
            });
        }

        function openMenu(menu) {
            menu.classList.add("active");
            if (overlay) overlay.style.display = "flex";
            body.classList.add("no-scroll");
            menu.style.height = menu.scrollHeight + "px";
            menu.style.opacity = 1;
        }

        function closeMenu(menu) {
            menu.style.height = menu.scrollHeight + "px";
            menu.style.opacity = 0;
            if (overlay) overlay.style.display = "none";
            body.classList.remove("no-scroll");
            requestAnimationFrame(() => {
                menu.style.height = "0";
            });

            menu.addEventListener(
                "transitionend",
                function () {
                    menu.classList.remove("active");
                },
                { once: true }
            );
        }
    }
    let swiperInstance;

    // function to initialize swiper with or without navigation
    function initSwiper() {
        // destroy old swiper if exists
        // if (swiperInstance) swiperInstance.destroy(true, true);

        // check screen width
        // const isLargeScreen = window.innerWidth >= 1440;

        // initialize swiper
        swiperInstance = new Swiper(".newsSwiper", {
            slidesPerView: 1,
            loop: true,
            pagination: { el: ".swiper-pagination", clickable: true },
            autoplay: { delay: 3000, disableOnInteraction: false },
            navigation: {
                nextEl: ".am-next",
                prevEl: ".am-prev",
            },
            breakpoints: {
                640: {
                    slidesPerView: 2,
                    spaceBetween: 24,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 24,
                },
                1440: {
                    slidesPerView: 4,
                    spaceBetween: 24,
                    loop: false,
                    allowTouchMove: false,
                    autoplay: false,
                },
            },
        });
    }

    // initialize on load
    initSwiper();

    // reinit on resize
    window.addEventListener("resize", () => {
        initSwiper();
    });
    const investorsSwiper = new Swiper(".investorsSwiper", {
        slidesPerView: 1,
        loop: true,
        pagination: { el: ".swiper-pagination", clickable: true },
        autoplay: { delay: 3000, disableOnInteraction: false },
        navigation: {
            nextEl: ".am-next",
            prevEl: ".am-prev",
        },
        breakpoints: {
            640: { slidesPerView: 2, spaceBetween: 24 },
            1024: { slidesPerView: 3, spaceBetween: 24 },
            1440: {
                slidesPerView: 4,
                spaceBetween: 24,
                loop: false,
                allowTouchMove: false,
                autoplay: false,
            },
        },
    });

    const partnersSwiper = new Swiper(".PartnersSwiper", {
        loop: true,
        spaceBetween: 12,
        centeredSlides: true,
        navigation: {
            nextEl: ".mof-partners .am-next",
            prevEl: ".mof-partners .am-prev",
        },
        breakpoints: {
            0: {
                slidesPerView: 1.4, // small peek
            },
            768: {
                slidesPerView: 2.2,
            },
            992: {
                slidesPerView: 3.2,
            },
            1200: {
                slidesPerView: 4,
            },
            1440: {
                slidesPerView: 5,
            },
        },
    });



    // Handle all dropdowns
    document.querySelectorAll(".dropdown.input-wrapper").forEach(dropdown => {
        const inputDropdown = dropdown.querySelector(".form-control");
        const options = dropdown.querySelectorAll(".dropdown__option");

        // Skip if input or list missing
        if (!inputDropdown || options.length === 0) return;

        // Toggle dropdown
        inputDropdown.addEventListener("click", e => {
            e.stopPropagation();
            // Close others
            document.querySelectorAll(".dropdown.input-wrapper.open").forEach(d => {
                if (d !== dropdown) d.classList.remove("open");
            });
            dropdown.classList.toggle("open");
        });

        // Select option
        options.forEach(option => {
            option.addEventListener("click", e => {
                e.stopPropagation();
                inputDropdown.value = option.textContent.trim();
                dropdown.classList.remove("open");
            });
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener("click", () => {
        document.querySelectorAll(".dropdown.input-wrapper.open").forEach(dropdown => {
            dropdown.classList.remove("open");
        });
    });
    // toggle more in form
    document.addEventListener('DOMContentLoaded', function () {
        const checkbox = document.querySelector('.past-expert input[type="checkbox"]');
        const blocks = document.querySelectorAll('.current-place, .experience-years, .current-role');

        if (!checkbox || !blocks.length) return;

        function toggleBlocks() {
            const isChecked = checkbox.checked;
            blocks.forEach(el => el.classList.toggle('show', isChecked));
        }

        // initialize visibility on load
        toggleBlocks();

        // update on change
        checkbox.addEventListener('change', toggleBlocks);
    });








   const organizationalStructureIcon = document.getElementById("organizational-structure-icon");
const popup = document.getElementById("overlay");
const zoomedImg = popup.querySelector(".zoomed-image");
const closeBtn = popup.querySelector(".close-btn");

let zoomLevel = 1;

// فتح البوب أب
organizationalStructureIcon.addEventListener("click", () => {
  popup.classList.add("active");
  organizationalStructureIcon.classList.add("active");
    // document.body.style.overflow = "hidden"; 

});

// قفل البوب أب لما يدوس على الخلفية أو زر الإغلاق
popup.addEventListener("click", (e) => {
  if (e.target === popup || e.target.closest(".close-btn")) {
    popup.classList.remove("active");
    organizationalStructureIcon.classList.remove("active");
    zoomLevel = 1;
    zoomedImg.style.transform = `scale(${zoomLevel})`;
        // document.body.style.overflow = ""; 

  }
});

// دعم الزوم بصباعين (Pinch to Zoom)
let initialDistance = 0;
popup.addEventListener("touchmove", (e) => {
  if (e.touches.length === 2) {
    const dist = Math.hypot(
      e.touches[0].clientX - e.touches[1].clientX,
      e.touches[0].clientY - e.touches[1].clientY
    );
    if (initialDistance === 0) initialDistance = dist;

    const scale = dist / initialDistance;
    zoomLevel = Math.min(Math.max(1, scale), 3); // بين 1x و 3x
    zoomedImg.style.transform = `scale(${zoomLevel})`;
  }
});

popup.addEventListener("touchend", () => {
  initialDistance = 0;
});


zoomedImg.addEventListener("wheel", (e) => {
  e.preventDefault();
  zoomLevel += e.deltaY * -0.04;  // تكبير أو تصغير
  zoomLevel = Math.min(Math.max(1, zoomLevel), 3);
  zoomedImg.style.transform = `scale(${zoomLevel})`;
});



})();


