const imageTexts = {
    "1.png": `
        <h2>Image 1</h2>
        <p>Description</p>
    `,
    "2.png": `
        <h2>Image 2</h2>
        <p>Description</p>
    `,
    "3.png": `
        <h2>Image 3</h2>
        <p>Description</p>
    `,
    "4.png": `
        <h2>Image 4</h2>
        <p>Description</p>
    `,
    "5.png": `
        <h2>Image 5</h2>
        <p>Description</p>
    `,
    "6.png": `
        <h2>Image 6</h2>
        <p>Description</p>
    `,
    "7.png": `
        <h2>Image 7</h2>
        <p>Description</p>
    `,
    "8.png": `
        <h2>Image 8</h2>
        <p>Description</p>
    `,
    "9.png": `
        <h2>Image 9</h2>
        <p>Description</p>
    `,
    "10.png": `
        <h2>Image 10</h2>
        <p>Description</p>
    `,
    "11.png": `
        <h2>Image 11</h2>
        <p>Description</p>
    `,
    "12.png": `
        <h2>Image 12</h2>
        <p>Description</p>
    `,
    "13.png": `
        <h2>Image 13</h2>
        <p>Description</p>
    `,
    "14.png": `
        <h2>Image 14</h2>
        <p>Description</p>
    `,
    "15.png": `
        <h2>Image 15</h2>
        <p>Description</p>
    `,
    "16.png": `
        <h2>Image 16</h2>
        <p>Description</p>
    `,
    "17.png": `
        <h2>Image 17</h2>
        <p>Description</p>
    `,
    "18.png": `
        <h2>Image 18</h2>
        <p>Description</p>
    `,
    "19.png": `
        <h2>Image 19</h2>
        <p>Description</p>
    `,
    "20.png": `
        <h2>Image 20</h2>
        <p>Description</p>
    `,
    "21.png": `
        <h2>Image 21</h2>
        <p>Description</p>
    `,
    "22.png": `
        <h2>Image 22</h2>
        <p>Description</p>
    `,
    "23.png": `
        <h2>Image 23</h2>
        <p>Description</p>
    `,
    "24.png": `
        <h2>Image 24</h2>
        <p>Description</p>
    `,
    "25.png": `
        <h2>Image 25</h2>
        <p>Description</p>
    `,
    "26.png": `
        <h2>Image 26</h2>
        <p>Description</p>
    `,
    "27.png": `
        <h2>Image 27</h2>
        <p>Description</p>
    `,
    "28.png": `
        <h2>Image 28</h2>
        <p>Description</p>
    `,
    "29.png": `
        <h2>Image 29</h2>
        <p>Description</p>
    `,
    "30.png": `
        <h2>Image 30</h2>
        <p>Description</p>
    `,
    "31.png": `
        <h2>Image 31</h2>
        <p>Description</p>
    `,
    "32.png": `
        <h2>Image 32</h2>
        <p>Description</p>
    `
};

document.addEventListener("DOMContentLoaded", () => {
    const gallery = document.getElementById('gallery');
    let imgIndex = 1;

    // Build the 4 rows
    for (let row = 0; row < 4; row++) {
        const rowContainer = document.createElement('div');
        rowContainer.className = 'row-container';

        const track = document.createElement('div');
        // Rows 1 and 3 go left-to-right. Rows 2 and 4 go right-to-left.
        track.className = 'track ' + (row % 2 === 0 ? 'left-to-right' : 'right-to-left');

        // Capture the 8 image filenames for this row
        const rowImages = [];
        for (let i = 0; i < 8; i++) {
            rowImages.push(`${imgIndex}.png`);
            imgIndex++;
        }

        // Helper function to create image elements
        const createImg = (src) => {
            const img = document.createElement('img');
            img.src = src;
            
            // Generate a random rotation between -12deg and 12deg for the playful hover effect
            const randomAngle = (Math.random() * 24 - 12).toFixed(2);
            img.style.setProperty('--rot', `${randomAngle}deg`);

            // Attach click event for the spotlight feature
            img.addEventListener('click', (e) => openSpotlight(e.target, src));
            return img;
        };

        // Append the 8 images
        rowImages.forEach(src => track.appendChild(createImg(src)));
        // Append the exact same 8 images AGAIN to create a seamless infinite scrolling loop
        rowImages.forEach(src => track.appendChild(createImg(src)));

        rowContainer.appendChild(track);
        gallery.appendChild(rowContainer);
    }

    // --- Spotlight Logic ---
    const overlay = document.getElementById('overlay');
    const overlayImg = document.getElementById('overlay-img');
    const textContent = document.getElementById('text-content');

    // Function to trigger opening animation
    function openSpotlight(targetImg, src) {
        // Get the exact dimensions and position of the clicked thumbnail
        const rect = targetImg.getBoundingClientRect();

        // Preset the overlay image to strictly match the thumbnail
        overlayImg.src = src;
        overlayImg.style.top = rect.top + 'px';
        overlayImg.style.left = rect.left + 'px';
        overlayImg.style.width = rect.width + 'px';
        overlayImg.style.height = rect.height + 'px';
        overlayImg.style.transform = 'rotate(0deg)'; // Start at 0 rotation

        // Inject the corresponding text
        textContent.innerHTML = imageTexts[src] || '';
        
        // Show overlay instantly (without animation yet)
        overlay.style.visibility = 'visible';

        // Force browser reflow to ensure the CSS transition triggers
        void overlayImg.offsetWidth;

        // Apply active classes to start the smooth transitions
        overlay.classList.add('active');
        gallery.classList.add('blurred');
    }

    // Function to trigger closing animation (Clockwise reverse)
    overlay.addEventListener('click', () => {
        // Removing the class forces the image back to rotate(0deg), 
        // which simulates a +360 clockwise rotation as it falls back into place.
        overlay.classList.remove('active');
        gallery.classList.remove('blurred');

        // Wait for the exact duration of the CSS transition (0.8s) before hiding the element
        setTimeout(() => {
            if (!overlay.classList.contains('active')) {
                overlay.style.visibility = 'hidden';
            }
        }, 800); 
    });
});
