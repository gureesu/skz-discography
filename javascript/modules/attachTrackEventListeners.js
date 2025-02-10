// modules/attachTrackEventListeners.js
export function attachTrackEventListeners() {
    // Expand and collapse info on click
    const accordion = document.querySelectorAll(".label");
    accordion.forEach(label => {
        label.addEventListener('click', function () {
            this.classList.toggle('active');
            this.parentElement.classList.toggle('active');
            this.parentElement.children[2].classList.toggle('open-info');
            this.parentElement.children[2].style.transition = "0s";
        });
    });

    // Pause other audio when target audio is clicked
    let previousAudio;
    function onPause() {
        if (previousAudio) {
            previousAudio.parentElement.parentElement.children[0].children[0].classList.replace("bx-pause", "bx-play");
            previousAudio.parentElement.parentElement.children[2].classList.remove('active');
            previousAudio.parentElement.parentElement.classList.remove('playing');
            previousAudio.pause();
            previousAudio.currentTime = 0;
        }
    }

    const video = document.querySelector("#title-track");
    video.volume = 0.4;
    let hasBeenPlayed = false;

    video.addEventListener('play', function () {
        if (!hasBeenPlayed) {
            video.currentTime = 0;
            hasBeenPlayed = true;
        }
        onPause();
    });

    const trackList = document.querySelector('.track-list');
    trackList.addEventListener('play', function (e) {
        if (previousAudio && previousAudio != e.target) {
            onPause();
        }
        video.pause();
        previousAudio = e.target;
    }, true);

    // Pause and play audio on click
    const playToggle = document.querySelectorAll(".bx-play");
    playToggle.forEach((playButton, i) => {
        const track = playButton.parentElement.parentElement;
        const trackNumber = playButton.parentElement.children[1];
        const playPauseActive = playButton.parentElement.children[0];

        track.addEventListener('mouseenter', function () {
            track.classList.add('hovering');
            trackNumber.style.display = 'none';
            playPauseActive.style.display = 'block';
        });

        track.addEventListener('mouseleave', function () {
            track.classList.remove('hovering');
            trackNumber.style.display = 'block';
            playPauseActive.style.display = 'none';
        });

        const range = track.children[2];
        const muted = range.children[3];
        const audio = track.children[2].children[5];

        playButton.addEventListener('click', function () {
            range.style.transition = "0.3s ease-in-out";

            if (this.classList.contains("bx-play")) {
                this.classList.replace("bx-play", "bx-pause");
                track.classList.add('playing');
                range.classList.add('active');
                audio.play();

                if (muted.classList.contains("bx-volume-mute")) {
                    audio.volume = 0;
                } else {
                    audio.volume = 0.5;
                }

                audio.addEventListener('ended', function () {
                    playButton.classList.replace("bx-pause", "bx-play");
                    range.classList.remove('active');
                    track.classList.remove('playing');
                });

            } else {
                this.classList.replace("bx-pause", "bx-play");
                track.classList.remove('playing');
                range.classList.remove('active');
                audio.pause();
            }
        });

        // Display audio duration
        audio.addEventListener('loadeddata', function () {
            const durMin = Math.floor((audio.duration / 60) % 60);
            const durSec = Math.floor(audio.duration % 60).toString().padStart(2, '0');
            const durTime = `${durMin}:${durSec}`;
            track.children[1].children[1].children[0].innerHTML = durTime;
            range.children[2].innerHTML = durTime;
        });

        // Display audio current time
        audio.addEventListener('timeupdate', function () {
            let currMin = parseInt((audio.currentTime / 60) % 60);
            let currSec = parseInt(audio.currentTime % 60);
            if (currSec < 10) {
                currSec = `0${currSec}`;
            }
            const currTime = track.children[2].children[0];
            currTime.innerHTML = `${currMin}:${currSec}`;
        });
    });

    // Audio range slider
    const audioContainer = document.querySelectorAll(".range-slider.audio");
    audioContainer.forEach(container => {
        const music = container.parentElement.children[5];
        const slider = container.querySelector(".slider");
        const thumb = container.querySelector(".slider-thumb");
        const progress = container.querySelector(".progress");

        function customSlider() {
            music.addEventListener('timeupdate', function () {
                const maxVal = music.duration;
                const val = (music.currentTime / maxVal) * 100 + "%";
                progress.style.width = val;
                thumb.style.left = val;
            });
        }

        customSlider();

        slider.addEventListener("input", () => {
            music.pause();
            music.currentTime = slider.value / 100 * music.duration;
            if (music.currentTime === music.duration) {
                range.classList.remove('active');
                audio.pause();
            }
            slider.addEventListener("mouseup", function () {
                music.play();
            });
            customSlider();
        });
    });

    // Volume range slider
    const range = document.querySelectorAll('.range');
    range.forEach(rangeElement => {
        const music = rangeElement.children[5];
        const volume = rangeElement.children[3];
        const slider = rangeElement.children[4].children[0];

        volume.addEventListener('click', function (e) {
            if (music.volume !== 0) {
                this.classList.replace("bx-volume-full", "bx-volume-mute");
                music.volume = 0;
            } else if (music.volume === 0) {
                this.classList.replace("bx-volume-mute", "bx-volume-full");
                if (slider.value / 100 === 0) {
                    music.volume = 0.5;
                } else if (slider.value / 100 === 1) {
                    music.volume = 0.5;
                } else {
                    music.volume = slider.value / 100;
                }
            }
        });

        const volumeContainer = document.querySelectorAll(".range-slider.volume");
        volumeContainer.forEach(container => {
            const thumb = container.querySelector(".slider-thumb");
            const progress = container.querySelector(".progress");

            function customSlider() {
                music.addEventListener('timeupdate', function () {
                    const val = (music.volume) * 100 + "%";
                    progress.style.width = val;
                    thumb.style.left = val;
                });
            }

            customSlider();

            slider.addEventListener("input", () => {
                music.volume = slider.value / 100;
                const range = document.querySelectorAll('.range');
                range.forEach(rangeElement => {
                    const volume = rangeElement.children[3];
                    if (music.volume === 0) {
                        volume.classList.replace("bx-volume-full", "bx-volume-mute");
                    } else if (music.volume !== 0) {
                        volume.classList.replace("bx-volume-mute", "bx-volume-full");
                    }
                });
                customSlider();
            });
        });
    });

    // Lyrics and details tabs
    const info = document.querySelectorAll(".info > ul");
    info.forEach(infoElement => {
        const lyrics = infoElement.parentElement.children[1];
        const details = infoElement.parentElement.children[2];
        const tabUl = infoElement.children;

        function lyr1() {
            lyrics.children[0].style.display = 'block';
            lyrics.children[1].style.display = 'none';
            lyrics.children[2].style.display = 'none';
            details.style.display = 'none';
        }

        function lyr2() {
            lyrics.children[0].style.display = 'none';
            lyrics.children[1].style.display = 'block';
            lyrics.children[2].style.display = 'none';
            details.style.display = 'none';
        }

        function lyr3() {
            lyrics.children[0].style.display = 'none';
            lyrics.children[1].style.display = 'none';
            lyrics.children[2].style.display = 'block';
            details.style.display = 'none';
        }

        function lyrDet() {
            lyrics.children[0].style.display = 'none';
            lyrics.children[1].style.display = 'none';
            lyrics.children[2].style.display = 'none';
            details.style.display = 'block';
        }

        for (let j = 0; j < tabUl.length; j++) {
            const tab = tabUl[j];
        
            tab.addEventListener('click', function () {
                // Remove 'active' class from all tabs
                for (let k = 0; k < tabUl.length; k++) {
                    tabUl[k].classList.remove('active');
                }
        
                // Add 'active' class to the clicked tab
                tab.classList.add('active');
        
                // Show the corresponding content
                if (tab.classList.contains('rom')) {
                    lyr1();
                } else if (tab.classList.contains('kor')) {
                    lyr2();
                } else if (tab.classList.contains('jap')) {
                    lyr2();
                } else if (tab.classList.contains('eng')) {
                    lyr3();
                }
                else if (tab.classList.contains('bx-info-circle')) {
                    lyrDet();
                }
            });
        }
    });
}