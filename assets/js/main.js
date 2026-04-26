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
   SMART PORTFOLIO FILTER & LOAD MORE
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const catalogItems = document.querySelectorAll(".catalog-item");
  const loadMoreBtn = document.getElementById("load-more-btn");

  if (filterBtns.length > 0 && catalogItems.length > 0) {
    let currentFilter = "all";
    let itemsToShow = 6; // How many images to show at a time

    // Core function to update the grid
    function updateGrid() {
      let visibleCount = 0;
      let totalMatching = 0;

      catalogItems.forEach((item) => {
        const itemCategory = item.getAttribute("data-category");
        const isMatch = currentFilter === "all" || currentFilter === itemCategory;

        if (isMatch) {
          totalMatching++;
          // If we haven't reached our limit yet, show it
          if (visibleCount < itemsToShow) {
            item.style.display = "block";
            // Tiny animation delay for a smooth staggered reveal
            setTimeout(() => { item.style.opacity = "1"; }, 50);
            visibleCount++;
          } else {
            // Hide items beyond the limit
            item.style.display = "none";
            item.style.opacity = "0";
          }
        } else {
          // Hide items that don't match the category
          item.style.display = "none";
          item.style.opacity = "0";
        }
      });

      // Show or hide the "Load More" button based on remaining items
      if (totalMatching > itemsToShow) {
        if(loadMoreBtn) loadMoreBtn.style.display = "inline-block";
      } else {
        if(loadMoreBtn) loadMoreBtn.style.display = "none";
      }
    }

    // 1. Listen for Filter Button Clicks
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        // Update active button styling
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        // Reset settings for the new category
        currentFilter = btn.getAttribute("data-filter");
        itemsToShow = 6; // Reset back to showing 6
        
        updateGrid();
      });
    });

    // 2. Listen for "Load More" Button Clicks
    if (loadMoreBtn) {
      loadMoreBtn.addEventListener("click", () => {
        itemsToShow += 6; // Add 6 more to the limit
        updateGrid();
      });
    }

    // 3. Run once on page load to set the initial state
    // (We make items transparent in CSS, so JS handles the fade-in)
    catalogItems.forEach(item => {
        item.style.transition = "opacity 0.4s ease";
        item.style.opacity = "0"; 
    });
    updateGrid();
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