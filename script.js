// Data Object formatted strictly as requested
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

// Generate Gallery Grid (4 Rows, 8 Images each)
const gallery = document.getElementById('gallery');
let currentImageIndex = 1;

for (let r = 0; r < 4; r++) {
    const row = document.createElement('div');
    row.className = 'row';
    
    for (let i = 0; i < 8; i++) {
        if (currentImageIndex > 32) break;
        
        const img = document.createElement('img');
        const filename = `${currentImageIndex}.png`;
        img.src = filename;
        img.dataset.id = filename;

        // Hover Effect Logic: Randomized askew angle + scale increase
        img.addEventListener('mouseenter', () => {
            // Random rotation between -15 and 15 degrees
            const randomAngle = (Math.random() - 0.5) * 30; 
            img.style.transform = `scale(1.35) rotate(${randomAngle}deg)`;
        });

        // Reset hover
        img.addEventListener('mouseleave', () => {
            img.style.transform = `scale(1) rotate(0deg)`;
        });

        // Open Spotlight Event
        img.addEventListener('click', (e) => openSpotlight(e, img));

        row.appendChild(img);
        currentImageIndex++;
    }
    gallery.appendChild(row);
}

// Spotlight State Management
let activeClone = null;
let originalImg = null;

function openSpotlight(e, img) {
    e.stopPropagation();
    if (activeClone) return;

    originalImg = img;
    const rect = img.getBoundingClientRect();

    // Stops all rows from drifting in the background
    document.body.classList.add('spotlight-active');

    // Create a clone for the 360-degree animation travel
    activeClone = document.createElement('img');
    activeClone.src = img.src;
    activeClone.className = 'animating-clone';
    
    // Set starting position (exactly where the image is on grid)
    activeClone.style.left = `${rect.left}px`;
    activeClone.style.top = `${rect.top}px`;
    activeClone.style.width = `${rect.width}px`;
    activeClone.style.height = `${rect.height}px`;
    activeClone.style.transform = `rotate(0deg)`;

    document.body.appendChild(activeClone);

    // Hide the original image visually but preserve its physical space in the grid
    originalImg.style.visibility = 'hidden';
    originalImg.style.transform = 'scale(1) rotate(0deg)'; // reset inline hover styles

    // Force browser reflow to register starting position before animating
    activeClone.offsetWidth;

    // Trigger animation to left half of screen + 360deg Counterclockwise
    activeClone.style.left = '0px';
    activeClone.style.top = '0px';
    activeClone.style.width = '50vw';
    activeClone.style.height = '100vh';
    activeClone.style.transform = `rotate(-360deg)`;

    // Display appropriate text data
    const overlay = document.getElementById('spotlightOverlay');
    const textContainer = document.getElementById('spotlightText');
    textContainer.innerHTML = imageTexts[img.dataset.id] || `<h2>${img.dataset.id}</h2><p>Description missing.</p>`;
    overlay.classList.add('active');
}

// Listen for clicks anywhere on document to close spotlight
document.addEventListener('click', (e) => {
    // Prevent closing if user clicks exactly on the text content block
    if (activeClone && !e.target.closest('.spotlight-text-container')) {
        closeSpotlight();
    }
});

function closeSpotlight() {
    if (!activeClone) return;

    // Fade out text immediately
    const overlay = document.getElementById('spotlightOverlay');
    overlay.classList.remove('active');

    // Get current grid coordinates of the hidden image
    const rect = originalImg.getBoundingClientRect();
    
    // Animate clone back to its grid spot + 360deg Clockwise (from -360 up to 0)
    activeClone.style.left = `${rect.left}px`;
    activeClone.style.top = `${rect.top}px`;
    activeClone.style.width = `${rect.width}px`;
    activeClone.style.height = `${rect.height}px`;
    activeClone.style.transform = `rotate(0deg)`;

    // Clean up DOM once travel animation is complete
    activeClone.addEventListener('transitionend', function handler(e) {
        if (e.propertyName === 'transform') {
            activeClone.removeEventListener('transitionend', handler);
            originalImg.style.visibility = 'visible';
            activeClone.remove();
            activeClone = null;
            document.body.classList.remove('spotlight-active');
        }
    });
}
