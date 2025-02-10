// modules/createTrackElement.js
export function createTrackElement(track) {
    const trackDiv = document.createElement('div');
    trackDiv.className = 'track song-' + track.track_number;
    
    const hasKorLyrics = track.lyrics.kor && track.lyrics.kor.trim() !== "";
    const hasJapLyrics = track.lyrics.jap && track.lyrics.jap.trim() !== "";

    trackDiv.innerHTML = `
        <div class="play-pause">
            <i class='bx bx-play'></i>  
            <h4 class="track-number">${track.track_number}</h4>    
        </div>
        <div class="label"> 
            <div class="title">
                <h5>${track.title}</h5>
            </div>
            <div class="time">
                <h5></h5>
            </div>                            
        </div>
        <div class="range">
            <span class="current">0:00</span>
            <div class="range-slider audio">
                <input type="range" min="0" max="100" value="0" step="0.5" class="slider">
                <div class="slider-thumb"></div>
                <div class="progress"></div>
            </div>
            <span class="duration"></span>
            <i class='bx bx-volume-full'></i>
            <div class="range-slider volume">
                <input type="range" min="0" max="100" value="100" class="slider">
                <div class="slider-thumb"></div>
                <div class="progress"></div>
            </div>
            <audio src="${track.audio_src}"></audio>
        </div>
        <div class="info">                            
            <ul>
                <li class="rom active">Romanized</li>
                ${hasKorLyrics ? '<li class="kor">한글</li>' : (hasJapLyrics ? '<li class="jap">日本語</li>' : '')}
                <li class="eng">English</li>
                <i class='bx bx-info-circle'></i>
            </ul>
            <div class="lyrics">
                <div class="rom-lyr">
                  <p>${track.lyrics.rom}</p>
                </div>
                ${hasKorLyrics ? `<div class="kor-lyr"><p>${track.lyrics.kor}</p></div>` : ''}
                ${!hasKorLyrics && hasJapLyrics ? `<div class="jap-lyr"><p>${track.lyrics.jap}</p></div>` : ''}
                <div class="eng-lyr">
                  <p>${track.lyrics.eng}</p>
                </div>
            </div>
            <div class="det-lyr">
                <h6>Composer</h6>
                <p>${track.composer.join(', ')}</p>
                <h6>Producer</h6>
                <p>${track.producer.join(', ')}</p>
                <h6>Source: ${track.source}</h6>
            </div>                  
        </div>    
    `;
    return trackDiv;
}