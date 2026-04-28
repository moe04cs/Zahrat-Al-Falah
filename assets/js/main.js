/* =========================================
   ZAHRAT AL FALAH - MAIN JAVASCRIPT
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {
    
/* --- 1. SMART REUSABLE TYPEWRITER EFFECT --- */
    function initTypewriter() {
        const headingEl = document.getElementById("hero-heading");
        const overTitleEl = document.getElementById("hero-overtitle");
        const establishedEl = document.getElementById("hero-established");
        const paraEl = document.getElementById("hero-text");
        const btnEl = document.querySelector(".hero-btn");

        // إذا لم يكن هناك عنوان في الصفحة، أوقف الدالة
        if (!headingEl) return;

        // جلب النص من خصائص الـ HTML (لصفحات من نحن ومشاريعنا)، أو استخدام نص الصفحة الرئيسية كافتراضي
        const headingStr = headingEl.getAttribute("data-text") || "نحول الحجارة إلى تحفة فنية";
        
        headingEl.innerHTML = ""; 

        let i = 0;
        const speed = 50; 

        function typeHeading() {
            headingEl.classList.add('typing-cursor');
            
            if (i <= headingStr.length) {
                headingEl.innerHTML = headingStr.substring(0, i);
                i++;
                setTimeout(typeHeading, speed);
            } else {
                headingEl.classList.remove('typing-cursor');
                
                // تلوين كلمة "تحفة فنية" وكسر السطر فقط في الصفحة الرئيسية
                if (headingStr.includes("تحفة فنية")) {
                    headingEl.innerHTML = headingStr.replace("تحفة فنية", "<br class='desktop-break'><span class='gold-text'>تحفة فنية</span>");
                }
                
                // حركات الظهور المتتالية (Staggered Waterfall Animation)
                // الأكواد بداخل (if) تضمن عدم حدوث خطأ إذا لم يكن العنصر موجوداً في الصفحة
                setTimeout(() => { if (overTitleEl) overTitleEl.classList.add('show'); }, 100);
                setTimeout(() => { if (establishedEl) establishedEl.classList.add('show'); }, 300);
                setTimeout(() => { if (paraEl) paraEl.classList.add('show'); }, 500);
                setTimeout(() => { if (btnEl) btnEl.classList.add('show'); }, 700);
            }
        }
        
        setTimeout(typeHeading, 500);
    }

    // تشغيل الدالة مرة واحدة فقط، وهي ستتكيف تلقائياً مع أي صفحة
    initTypewriter();

    /* --- 2. STICKY HEADER LOGIC --- */
    const header = document.querySelector(".site-header");
    const heroSection = document.querySelector(".hero") || document.querySelector(".portfolio-hero");

    if (header) {
        window.addEventListener("scroll", () => {
            let triggerHeight = heroSection ? heroSection.offsetHeight - 80 : 100;
            if (window.scrollY > triggerHeight) {
                header.classList.add("sticky-header");
            } else {
                header.classList.remove("sticky-header");
            }
        });
    }


    /* --- 3. GRID LIGHT SWEEP SENSOR --- */
    const grids = document.querySelectorAll('.bg-premium-grid');
    
    // Check if the browser supports observers
    if ('IntersectionObserver' in window) {
        const gridObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                // If the user scrolls so the grid is at least 20% visible
                if (entry.isIntersecting) {
                    // Add the class to trigger the CSS animation
                    entry.target.classList.add('sweep-active');
                    // Stop watching it so it ONLY plays once!
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 }); // 0.2 means 20% of the section is visible

        // Attach the sensor to any grid on the page
        grids.forEach(grid => gridObserver.observe(grid));
    }

    /* --- 4. MOBILE MENU (SIDE DRAWER) --- */
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

    /* --- 5. SMART PORTFOLIO FILTER & LOAD MORE --- */
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

    /* --- 6. FULL-SCREEN LIGHTBOX --- */
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

    /* --- 7. CINEMATIC WATERFALL DIRECTOR --- */
    const track = document.getElementById('gallery-track');
    const focusOverlay = document.getElementById('blackhole-focus');
    const focusImg = document.getElementById('focus-img');

    if (track && focusOverlay && focusImg) {
        const images = track.querySelectorAll('img');
        
        if (images.length > 0) {
            const uniqueImageCount = images.length / 2;

            function triggerCinematicFocus() {
                const randomIdx = Math.floor(Math.random() * uniqueImageCount);
                const selectedImg = images[randomIdx];

                track.classList.add('paused');

                focusImg.src = selectedImg.src;
                focusOverlay.classList.add('active');

                setTimeout(() => {
                    focusOverlay.classList.remove('active');
                    setTimeout(() => {
                        track.classList.remove('paused');
                    }, 1500);
                }, 4000); 
            }

            setTimeout(() => {
                triggerCinematicFocus();
                setInterval(triggerCinematicFocus, 10000);
            }, 2000);
        }
    }
    /* --- 8. MOBILE PROCESS SCROLL TRACKER --- */
    const processCards = document.querySelectorAll('.process-card');
    
    // تأكد من أننا على الجوال لتفعيل هذه الميزة
    if (processCards.length > 0 && window.innerWidth <= 767) {
        
        // إزالة الكلاس الافتراضي لتجنب بقاء الخطوة الأولى مضيئة دائماً
        processCards.forEach(card => card.classList.remove('active-step'));
        
        const processObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // عندما تصبح البطاقة في منتصف الشاشة
                if (entry.isIntersecting) {
                    // أطفئ جميع الخطوات
                    processCards.forEach(c => c.classList.remove('active-step'));
                    // أضئ الخطوة الحالية فقط
                    entry.target.classList.add('active-step');
                }
            });
        }, { 
            // هذا الهامش يخبر المستشعر بالتفعيل فقط عندما يكون العنصر في منتصف الشاشة تقريباً
            rootMargin: "-40% 0px -40% 0px", 
            threshold: 0 
        });

        processCards.forEach(card => processObserver.observe(card));
    }
    /* --- 9. FORMSPREE AJAX MODAL LOGIC --- */
    const contactForm = document.getElementById("contactForm");
    const successModal = document.getElementById("success-modal");
    
    if (contactForm && successModal) {
        const closeModalBtn = successModal.querySelector(".modal-close");

        contactForm.addEventListener("submit", async function(e) {
            e.preventDefault(); // Stop the browser from leaving the page
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            
            // Show loading state
            submitBtn.innerHTML = "جاري الإرسال... ⏳"; 
            submitBtn.disabled = true;
            submitBtn.style.opacity = "0.7";

            const formData = new FormData(contactForm);

            try {
                const response = await fetch(contactForm.action, {
                    method: contactForm.method,
                    body: formData,
                    headers: {
                        'Accept': 'application/json' // Forces Formspree to return data, not a redirect
                    }
                });

                if (response.ok) {
                    contactForm.reset(); // Clear the inputs
                    successModal.classList.add("active"); // Trigger the popup
                } else {
                    alert("عذراً، حدث خطأ أثناء إرسال الرسالة. يرجى المحاولة لاحقاً.");
                }
            } catch (error) {
                alert("عذراً، تأكد من اتصالك بالإنترنت وحاول مرة أخرى.");
            } finally {
                // Restore button state
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = "1";
            }
        });

        // Close Modal Logic (Click X, click outside, or press ESC)
        const closeModal = () => successModal.classList.remove("active");
        
        if (closeModalBtn) closeModalBtn.addEventListener("click", closeModal);
        successModal.addEventListener("click", (e) => {
            if (e.target === successModal) closeModal();
        });
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape" && successModal.classList.contains("active")) {
                closeModal();
            }
        });
    }

}); // END OF DOM CONTENT LOADED