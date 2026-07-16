// This file is now separate. All the JavaScript logic goes here.
document.addEventListener('DOMContentLoaded', () => {
        
    // --- Color Definitions ---
    const matildaColor = [0, 0, 0]; // Black
    const frozenColor = [186, 230, 253]; // NEW: Much Lighter Icy Blue ('sky-200')
    const matildaTextColor = [229, 231, 235]; // Light Slate ('text-slate-200')

    // --- UI Elements ---
    const pageBody = document.body;
    const sections = document.querySelectorAll('section[id]');
    const matildaSection = document.getElementById('matilda');
    const frozenSection = document.getElementById('frozen');
    const navLinks = document.querySelectorAll('header nav a');

    // --- Global State ---
    let currentActiveSection = 'matilda'; // Keep track of which section is visible

    // --- Helper function for color interpolation ---
    function lerp(start, end, progress) {
        return start + (end - start) * progress;
    }
    function lerpColor(c1, c2, progress) {
        const r = Math.round(lerp(c1[0], c2[0], progress));
        const g = Math.round(lerp(c1[1], c2[1], progress));
        const b = Math.round(lerp(c1[2], c2[2], progress));
        return `rgb(${r}, ${g}, ${b})`;
    }

    // --- 1. Background Fade on Scroll ---
    function handleScrollFade() {
         const scrollY = window.scrollY;
         
         // Define the start and end points for the fade
         const fadeStart = matildaSection.offsetTop + (matildaSection.offsetHeight * 0.40); // Start fade 40% into Matilda section
         const fadeEnd = frozenSection.offsetTop - (window.innerHeight * 0.5);   // End fade when Frozen section top is at 50% of viewport
         
         // Calculate progress (0.0 to 1.0)
         let progress = (scrollY - fadeStart) / (fadeEnd - fadeStart);
         progress = Math.max(0, Math.min(1, progress)); // Clamp between 0 and 1
         
         // Interpolate the background color
         const newBgColor = lerpColor(matildaColor, frozenColor, progress);
         pageBody.style.backgroundColor = newBgColor;
    }

    // --- 2. Arrival Emphasis (Bounce) & Active Nav State ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // 50% of the section must be visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const newActiveSectionId = entry.target.id;
                
                // Only update if the section has changed
                if (newActiveSectionId !== currentActiveSection) {
                    currentActiveSection = newActiveSectionId;
                    updateNavColors(currentActiveSection);
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));
    
    // --- 3. Update Nav Link Colors & Add Bounce ---
    function updateNavColors(activeSectionId) {
        const navColor = `rgb(${matildaTextColor[0]}, ${matildaTextColor[1]}, ${matildaTextColor[2]})`; // Hardcoded light color

        navLinks.forEach(link => {
            const linkSection = link.getAttribute('href').substring(1);
            
            // 1. Reset all animations
            link.classList.remove('animate-navBounce');

            if (linkSection === activeSectionId) {
                // This is the new active link
                let activeColor;
                switch (linkSection) {
                    case 'matilda':
                        activeColor = '#c084fc'; // Purple
                        break;
                    case 'frozen':
                        activeColor = '#bae6fd'; // NEW: Matching Lighter Blue ('sky-200')
                        break;
                    // --- "About" and "Contact" no longer get a special color ---
                    default:
                        activeColor = navColor; // Default for 'about', 'contact', 'portal'
                }
                link.style.color = activeColor;

                // --- Add bounce animation ---
                // Only bounce if it's one of the main sections we want to highlight
                if (linkSection === 'matilda' || linkSection === 'frozen' || linkSection === 'about' || linkSection === 'contact') {
                    link.classList.add('animate-navBounce');
                }
            } else {
                // This is not the active link, make it white
                link.style.color = navColor;
            }
        });
    }
    
    // --- Event Listeners ---
    window.addEventListener('scroll', handleScrollFade);
    
    // Initial calls on load
    handleScrollFade();
    updateNavColors(currentActiveSection); // Set the initial active link color

});
