// Import modules
import { initializeMenuToggle } from './modules/menuToggle.js';
import { fetchTracks } from './modules/fetchTracks.js';
import { initializeGallery } from './modules/gallery.js';

// Initialize menu toggle functionality
initializeMenuToggle();

// Fetch and load tracks when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function () {
    fetchTracks();
});

// Initialize gallery functionality
initializeGallery();