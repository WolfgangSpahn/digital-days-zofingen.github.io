// register the service, when the user issues a click or keydown event, 
// the slide number is reported to the console (TBD: and SSE)
export function registerReportSlideNumber() {
    function getSlideNumber() {
        // Query the DOM for the slide number elements
        const slideNumberElement = document.querySelector('.slide-number-a');
        const totalSlidesElement = document.querySelector('.slide-number-b');

        if (slideNumberElement && totalSlidesElement) {
        const currentSlide = slideNumberElement.textContent;
        const totalSlides = totalSlidesElement.textContent;
        console.log(`Current slide: ${currentSlide} of ${totalSlides}`);
        return { currentSlide, totalSlides };
        } else {
        console.log('Slide number element not found');
        return null;
        }
    }

    // Detect keydown event (like Page Down or Arrow keys)
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowRight' || event.key === 'ArrowLeft' || event.key === 'PageDown' || event.key === 'PageUp') {
        getSlideNumber();
        }
    });

    // Detect click events (like clicking on navigation arrows)
    document.addEventListener('click', function(event) {
        getSlideNumber();
    });
    }

export function addCustomHeader() {
    // Create a new header element
    const header = document.createElement('div');
    header.className = 'custom-header';
    
    // Add content to the header
    header.innerHTML = `custom header content`;

    // Insert the header at the top of the body
    document.body.insertBefore(header, document.body.firstChild);
  }