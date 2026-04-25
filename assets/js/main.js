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