/* =========================================
   ZAHRAT AL FALAH - MAIN JAVASCRIPT
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    
    /* --- 1. REUSABLE TYPEWRITER EFFECT (SPEED BOOSTED) --- */
    function initTypewriter(headingId, textId, btnSelector, headingStr, textStr) {
        const headingEl = document.getElementById(headingId);
        const paraEl = document.getElementById(textId);
        const btnEl = btnSelector ? document.querySelector(btnSelector) : null;

        if (!headingEl || !paraEl) return;

        headingEl.innerHTML = ""; 
        paraEl.innerHTML = "";

        let i = 0;
        let j = 0;
        const speed = 30; // WAS 50 - Lower is faster

        function typeHeading() {
            headingEl.classList.add('typing-cursor');
            if (i < headingStr.length) {
                headingEl.innerHTML += headingStr.charAt(i);
                i++;
                setTimeout(typeHeading, speed);
            } else {
                headingEl.classList.remove('typing-cursor');
                setTimeout(typePara, 200); // WAS 300 - Shortened pause
            }
        }

        function typePara() {
            paraEl.classList.add('typing-cursor');
            if (j < textStr.length) {
                paraEl.innerHTML += textStr.charAt(j);
                j++;
                setTimeout(typePara, speed);
            } else {
                paraEl.classList.remove('typing-cursor');
                if(btnEl) btnEl.classList.add('show');
            }
        }
        setTimeout(typeHeading, 500);
    }

    // Initialize Typewriters
    initTypewriter('hero-heading', 'hero-text', '.hero-btn', "زهرة الفلاح العربية للمقاولات", "نحن نحول الأرضيات والجدران إلى قطعة فنية رائعة.");
    initTypewriter('portfolio-heading', 'portfolio-text', null, "معرض الأعمال", "سجل حافل من الإنجازات في كبرى المشاريع بالمملكة");
    // Initialize for the About Us Page
    initTypewriter(
        'about-heading', 
        'about-text', 
        null, 
        "من نحن", 
        "أكثر من عقدين من التميز في عالم الرخام والجرانيت."
    );


    /* --- 2. STICKY HEADER LOGIC --- */
    const header = document.querySelector(".site-header");
    const heroSection = document.querySelector(".hero") || document.querySelector(".portfolio-hero");

    if (header) {
        window.addEventListener("scroll", () => {
            // Triggers 200px before hero ends to prevent blinking
            let triggerHeight = heroSection ? heroSection.offsetHeight - 200 : 100;
            if (window.scrollY > triggerHeight) {
                header.classList.add("sticky-header");
            } else {
                header.classList.remove("sticky-header");
            }
        });
    }


    /* --- 3. MOBILE MENU (SIDE DRAWER) --- */
    const menuBtn = document.querySelector(".mobile-menu-btn");
    const closeMenuBtn = document.querySelector(".close-menu-btn");
    const navLinks = document.querySelector(".nav-links");
    const navOverlay = document.querySelector(".mobile-overlay");

    if (menuBtn && navLinks) {
        const toggleMenu = (open) => {
            navLinks.classList.toggle("active", open);
            if (navOverlay) navOverlay.classList.toggle("active", open);
            document.body.style.overflow = open ? "hidden" : "auto";
        };

        menuBtn.addEventListener("click", () => toggleMenu(true));
        if (closeMenuBtn) closeMenuBtn.addEventListener("click", () => toggleMenu(false));
        if (navOverlay) navOverlay.addEventListener("click", () => toggleMenu(false));
    }


    /* --- 4. SMART PORTFOLIO FILTER & LOAD MORE --- */
    const filterBtns = document.querySelectorAll(".filter-btn");
    const catalogItems = document.querySelectorAll(".catalog-item");
    const loadMoreBtn = document.getElementById("load-more-btn");

    if (filterBtns.length > 0 && catalogItems.length > 0) {
        let currentFilter = "all";
        let itemsToShow = 6;

        function updateGrid() {
            let visibleCount = 0;
            let totalMatching = 0;

            catalogItems.forEach((item) => {
                const isMatch = currentFilter === "all" || currentFilter === item.getAttribute("data-category");
                if (isMatch) {
                    totalMatching++;
                    if (visibleCount < itemsToShow) {
                        item.style.display = "block";
                        setTimeout(() => { item.style.opacity = "1"; }, 50);
                        visibleCount++;
                    } else {
                        item.style.display = "none";
                        item.style.opacity = "0";
                    }
                } else {
                    item.style.display = "none";
                    item.style.opacity = "0";
                }
            });

            if (loadMoreBtn) loadMoreBtn.style.display = totalMatching > itemsToShow ? "inline-block" : "none";
        }

        filterBtns.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                filterBtns.forEach((b) => b.classList.remove("active"));
                btn.classList.add("active");
                currentFilter = btn.getAttribute("data-filter");
                itemsToShow = 6;
                updateGrid();

                const gallery = document.getElementById("portfolio-gallery");
                if (gallery) {
                    window.scrollTo({
                        top: gallery.getBoundingClientRect().top + window.pageYOffset - 160,
                        behavior: "smooth"
                    });
                }
            });
        });

        if (loadMoreBtn) {
            loadMoreBtn.addEventListener("click", () => {
                itemsToShow += 6;
                updateGrid();
            });
        }

        catalogItems.forEach(item => {
            item.style.transition = "opacity 0.4s ease";
            item.style.opacity = "0";
        });
        updateGrid();
    }


    /* --- 5. FULL-SCREEN LIGHTBOX --- */
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeLightboxBtn = document.querySelector(".lightbox-close");

    if (lightbox && catalogItems.length > 0) {
        catalogItems.forEach(item => {
            item.addEventListener("click", () => {
                const img = item.querySelector("img");
                if (img) {
                    lightboxImg.src = img.src;
                    lightbox.classList.add("active");
                    document.body.style.overflow = "hidden";
                }
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove("active");
            document.body.style.overflow = "auto";
            setTimeout(() => { lightboxImg.src = ""; }, 300);
        };

        if (closeLightboxBtn) closeLightboxBtn.addEventListener("click", closeLightbox);
        lightbox.addEventListener("click", (e) => { if (e.target === lightbox) closeLightbox(); });
        document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });
    }
});