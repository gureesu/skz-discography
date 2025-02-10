// modules/fetchTracks.js
import { createTrackElement } from './createTrackElement.js';
import { attachTrackEventListeners } from './attachTrackEventListeners.js';

export function fetchTracks() {
    const tracksContainer = document.getElementById('tracks');
    const jsonFileName = tracksContainer.getAttribute('data-json');
    const jsonFilePath = `../multimedia/data/${jsonFileName}`;

    fetch(jsonFilePath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            tracksContainer.innerHTML = '';
            data.tracks.forEach(track => {
                const trackElement = createTrackElement(track);
                tracksContainer.appendChild(trackElement);
            });
            attachTrackEventListeners();
        })
        .catch(error => console.error('Error loading JSON:', error));
}