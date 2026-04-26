/* assets/js/main.js */

document.addEventListener('DOMContentLoaded', () => {
    
    /* --- 1. Absolute to Sticky Header on Scroll --- */
    const header = document.querySelector('.site-header');
    const heroSection = document.querySelector('.hero');
    
    if (header && heroSection) { // Added a quick safety check
        window.addEventListener('scroll', () => {
            if (window.scrollY > heroSection.offsetHeight) {
                header.classList.add('sticky-header');
            } else {
                header.classList.remove('sticky-header');
            }
        });
    }

    /* --- 2. Arabic Typewriter Effect --- */
    const headingElement = document.getElementById('hero-heading');
    const paraElement = document.getElementById('hero-text');
    const btnElement = document.querySelector('.hero-btn');

    if (headingElement && paraElement) { // Safety check to only run on the homepage
        const headingText = "زهرة الفلاح العربية للمقاولات";
        const paraText = "نحن نحول الأرضيات والجدران إلى قطعة فنية رائعة.";
        let i = 0;
        let j = 0;
        const speed = 50;

        function typeHeading() {
            headingElement.classList.add('typing-cursor');
            if (i < headingText.length) {
                headingElement.innerHTML += headingText.charAt(i);
                i++;
                setTimeout(typeHeading, speed);
            } else {
                headingElement.classList.remove('typing-cursor');
                setTimeout(typePara, 300); 
            }
        }

        function typePara() {
            paraElement.classList.add('typing-cursor');
            if (j < paraText.length) {
                paraElement.innerHTML += paraText.charAt(j);
                j++;
                setTimeout(typePara, speed);
            } else {
                paraElement.classList.remove('typing-cursor');
                if(btnElement) btnElement.classList.add('show');
            }
        }

        setTimeout(typeHeading, 500);
    }
});

/* =========================================
   PORTFOLIO GALLERY FILTER
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const catalogItems = document.querySelectorAll(".catalog-item");

  // Only run this script if the filter buttons actually exist on the page
  if (filterBtns.length > 0) {
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        
        // 1. Remove the 'active' gold color from all buttons
        filterBtns.forEach((b) => b.classList.remove("active"));
        
        // 2. Add the 'active' gold color to the clicked button
        btn.classList.add("active");

        // 3. Find out what category we want to see
        const filterValue = btn.getAttribute("data-filter");

        // 4. Show or hide the images based on the category
        catalogItems.forEach((item) => {
          const itemCategory = item.getAttribute("data-category");

          if (filterValue === "all" || filterValue === itemCategory) {
            item.style.display = "block"; 
          } else {
            item.style.display = "none"; 
          }
        });
      });
    });
  }
});

/* =========================================
   STICKY HEADER LOGIC
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".site-header");
  
  // Look for either the index hero OR the portfolio hero
  const heroSection = document.querySelector(".hero") || document.querySelector(".portfolio-hero");

  if (header) {
    window.addEventListener("scroll", () => {
      // Determine the trigger point (the height of the hero section, or a default 100px)
      let triggerHeight = heroSection ? heroSection.offsetHeight - 50 : 100;

      // If we scrolled past the trigger point, add the sticky class
      if (window.scrollY > triggerHeight) {
        header.classList.add("sticky-header");
      } else {
        // Otherwise, remove it to go back to transparent
        header.classList.remove("sticky-header");
      }
    });
  }
});