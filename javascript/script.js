const menuToggle = document.querySelector(".bx-menu-alt-left");
const showcase = document.querySelector(".showcase");

//toggle menu and showcase
menuToggle.addEventListener("click", () => {
    showcase.classList.toggle("active");
    if (menuToggle.classList.contains("bx-menu-alt-left")) {
        menuToggle.classList.replace("bx-menu-alt-left", "bx-x");
    } else {
        menuToggle.classList.replace("bx-x", "bx-menu-alt-left");
    }

});



//showcase fullscreen on escape
document.querySelector("body").addEventListener("keyup", (event) => {
    if (event.key == "Escape") {
      menuToggle.classList.remove("active");
      showcase.classList.remove("active");
        if (menuToggle.classList.contains("bx-x")) {
            menuToggle.classList.replace("bx-x", "bx-menu-alt-left");
        }
    }
});



//expand and collapse info on click
const accordion = document.querySelectorAll(".label");

for (let i = 0; i<accordion.length; i++) {
    accordion[i].addEventListener('click', function(){
        this.classList.toggle('active');
        //.label > .track.active
        this.parentElement.classList.toggle('active');
        //.label .track[2] -> .range.open-info
        this.parentElement.children[2].classList.toggle('open-info');
        this.parentElement.children[2].style.transition = "0s";
    })
}



//pause other audio when target audio is clicked
let previousAudio;
function onPause() {
    //replace play icon to pause 
    previousAudio.parentElement.parentElement.children[0].children[0].classList.replace("bx-pause", "bx-play");
    //collapse range
    previousAudio.parentElement.parentElement.children[2].classList.remove('active');
    //remove playing class in track
    previousAudio.parentElement.parentElement.classList.remove('playing');
    //pause audio
    previousAudio.pause();
    //reset current time to 0
    previousAudio.currentTime = 0;
}

const video = document.querySelector("#title-track");
video.volume = 0.4;
let hasBeenPlayed = false;

video.addEventListener('play', function() {   
    if (!hasBeenPlayed) {
        // Set the video's currentTime to 0 only on the first play
        video.currentTime = 0; 
        hasBeenPlayed = true;
    }
    onPause();
});

const trackList = document.querySelector('.track-list');

trackList.addEventListener('play', function(e){
    if(previousAudio && previousAudio != e.target){
        onPause();
    }video.pause();
    previousAudio = e.target;
}, true);



//pause and play audio on click
const playToggle = document.querySelectorAll(".bx-play");
const audio = document.querySelectorAll(".range > *")[5];

for (let i = 0; i < playToggle.length; i++) {  

    const track = playToggle[i].parentElement.parentElement;
    const trackNumber = playToggle[i].parentElement.children[1];
    const playPauseActive = playToggle[i].parentElement.children[0];

    track.addEventListener('mouseenter', function() {
        track.classList.add('hovering');
        trackNumber.style.display = 'none';
        playPauseActive.style.display = 'block';
    });

    track.addEventListener('mouseleave', function() {
        track.classList.remove('hovering');
        trackNumber.style.display = 'block';
        playPauseActive.style.display = 'none';
    });



    const range = track.children[2];
    const muted = range.children[3];
    const audio = track.children[2].children[5];

    playToggle[i].addEventListener('click', function(){
        range.style.transition = "0.3s ease-in-out";

        if(this.classList.contains("bx-play")) {
            this.classList.replace("bx-play", "bx-pause");
            track.classList.add('playing');
            range.classList.add('active');
            audio.play();
            
            
            if (muted.classList.contains("bx-volume-mute")) {
                audio.volume = 0;
            } else {
                audio.volume = 0.5;
            }     

            //after the adio ends
            audio.addEventListener('ended', function(){
                playToggle[i].classList.replace("bx-pause", "bx-play");
                range.classList.remove('active');
                track.classList.remove('playing');
            });

        } else {
            this.classList.replace("bx-pause", "bx-play");
            track.classList.remove('playing');
            range.classList.remove('active');     
            audio.pause();
        }
    })



    //display audio duration
    audio.addEventListener('loadeddata', function(){

        const durMin = Math.floor((audio.duration / 60) % 60);
        const durSec = Math.floor(audio.duration % 60).toString().padStart(2, '0');

        const durTime = `${durMin}:${durSec}`;
        track.children[1].children[1].children[0].innerHTML = durTime;
        range.children[2].innerHTML = durTime;
    })



    //display audio current time
    audio.addEventListener('timeupdate', function(){
        let currMin = parseInt((audio.currentTime / 60) % 60);
        let currSec = parseInt(audio.currentTime % 60);
        if (currSec < 10) {
            currSec = `0${currSec}`
        }

        const currTime = track.children[2].children[0];
        currTime.innerHTML = `${currMin}:${currSec}`;
    });
}


//audio range slider
const audioContainer = document.querySelectorAll(".range-slider.audio");

for (let i = 0; i < audioContainer.length; i++) {
    const music = audioContainer[i].parentElement.children[5];
    const slider = audioContainer[i].querySelector(".slider");
    const thumb = audioContainer[i].querySelector(".slider-thumb");
    const progress = audioContainer[i].querySelector(".progress");

    function customSlider() {
        music.addEventListener('timeupdate', function() {
            const maxVal = music.duration;
            const val = (music.currentTime / maxVal) * 100 + "%";
        
            progress.style.width = val;
            thumb.style.left = val;
        })
        
    }
    
    customSlider();


    slider.addEventListener("input", () => { 
        music.pause();
        music.currentTime = slider.value / 100 * music.duration;
        if (music.currentTime === music.duration) {
            range.classList.remove('active');
            audio.pause();
        }
        slider.addEventListener("mouseup", function() {
            music.play();
        });

        customSlider();
    });
}



//volume range slider
const range = document.querySelectorAll('.range');
for (let i = 0; i < range.length; i++) {
    const music = range[i].children[5];
    const volume = range[i].children[3];
    const slider = range[i].children[4].children[0];

    volume.addEventListener('click', function(e) {
        if (music.volume !== 0) {
            this.classList.replace("bx-volume-full", "bx-volume-mute");
            music.volume = 0;
        } else if (music.volume === 0) {
            this.classList.replace("bx-volume-mute", "bx-volume-full");
            if (slider.value / 100 === 0) {
                music.volume = 0.5
            } else if (slider.value / 100 === 1) {
                music.volume = 0.5;
            }               
            else {
                music.volume = slider.value / 100;
            }
        }
    })


    const volumeContainer = document.querySelectorAll(".range-slider.volume");

    for (let j = 0; j < volumeContainer.length; j++) {
        const thumb = volumeContainer[j].querySelector(".slider-thumb");
        const progress = volumeContainer[j].querySelector(".progress");

        function customSlider() {
            music.addEventListener('timeupdate', function() { 
                const val = (music.volume) * 100 + "%";
            
                progress.style.width = val;
                thumb.style.left = val;
            })    
        }


        customSlider();

        slider.addEventListener("input", () => {
            music.volume = slider.value / 100;

            const range = document.querySelectorAll('.range');
            for (let j = 0; j < range.length; j++) {
                const volume = range[j].children[3];
                
                if (music.volume === 0) {
                    volume.classList.replace("bx-volume-full", "bx-volume-mute");
                } else if (music.volume !== 0) {
                    volume.classList.replace("bx-volume-mute", "bx-volume-full");
                }

            }
            
            customSlider();
        });

    }
}


const info = document.querySelectorAll(".info > ul");
for (let i = 0; i < info.length; i++) {
    const lyrics = info[i].parentElement.children[1];
    const details = info[i].parentElement.children[2]
    const tabUl = info[i].children;

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
        const tabs = tabUl[j];
        const tab1 = tabUl[0];
        const tab2 = tabUl[1];
        const tab3 = tabUl[2];
        const det = tabUl[3];

        //tab1 tab active
        if (tab1.addEventListener('click', function() {      
            tabs.classList.remove('active');
            tab1.classList.add('active');
            lyr1();
        })) {       
        //tab2 tab active
        } else if (tab2.addEventListener('click', function() {      
            tabs.classList.remove('active');
            tab2.classList.add('active');
            lyr2();
        })) {
        //tab3 tab active
        } else if (tab3.addEventListener('click', function() {      
            tabs.classList.remove('active');
            tab3.classList.add('active');
            lyr3();
        })) {
        //det tab active
        } else if (det.addEventListener('click', function() {      
            tabs.classList.remove('active');
            det.classList.add('active');
            lyrDet();
        })) {
        }  
    }
}


//gallery
const images = document.querySelectorAll('.row .image');

images.forEach((image, index) => {
    image.addEventListener('click', function() {
        // Show the preview
        const fullImageView = document.querySelector('#fullImageView');
        fullImageView.style.display = 'block';
        document.body.style.overflow = 'hidden';

        // Get image src
        const fullImage = document.querySelector('#fullImage');
        let imgURL = image.querySelector('img').src;
        fullImage.src = imgURL;
        fullImage.style.display = 'block';

        // Close icon
        const close = document.querySelector('.fa-x');
        close.style.display = 'block';
        close.addEventListener('click', function() {
            // Close the preview
            fullImageView.style.display = 'none';
            fullImage.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        // Function to handle image navigation
        function navigateImage(direction) {
            if (direction === 'left' && index > 0) {
                imgURL = images[index - 1].querySelector('img').src;
                index--;
            } else if (direction === 'right' && index < images.length - 1) {
                imgURL = images[index + 1].querySelector('img').src;
                index++;
            }
            
            fullImage.src = imgURL;

            // Show/hide buttons based on index
            left.style.display = index === 0 ? 'none' : 'block';
            right.style.display = index === images.length - 1 ? 'none' : 'block';
        }

        // Left icon
        const left = document.querySelector('.fa-circle-arrow-left');
        left.style.display = index === 0 ? 'none' : 'block';

        left.addEventListener('click', () => {
            navigateImage('left');
        });

        document.addEventListener("keyup", (event) => {
            if (event.key === "ArrowLeft") {
                navigateImage('left');
            }
        });

        // Right icon
        const right = document.querySelector('.fa-circle-arrow-right');
        right.style.display = index === images.length - 1 ? 'none' : 'block';

        right.addEventListener('click', () => {
            navigateImage('right');
        });

        document.addEventListener("keyup", (event) => {
            if (event.key === "ArrowRight" || event.key === "39") {
                navigateImage('right');
            }
        });

        // Exit preview
        fullImageView.addEventListener('click', function(e) {
            if (e.target == fullImageView && (e.target !== left || e.target !== right)) {
                closePreview();
            }
        });

        document.addEventListener("keyup", (event) => {
            if (event.key === "Escape") {
                closePreview();
            }
        });

        // Function to close the preview
        function closePreview() {
            fullImageView.style.display = 'none';
            fullImage.style.display = 'none';
            document.body.style.overflow = "auto";
        }
    });
});



//redirecting pages

// Get the current URL path
const path = window.location.pathname;

// Define a mapping of clean URLs to actual file locations
const mapping = {
    "/rockstar": "/skz-discography/html/rockstar.html",
    "/5-Star": "/skz-discography/html/5-Star.html",
    "/The-Sound": "/skz-discography/html/The Sound.html",
    "/SKZ-Replay": "/skz-discography/html/SKZ-Replay.html",
    "/Maxident": "/skz-discography/html/Maxident.html",
    "/CIRCUS": "/skz-discography/html/CIRCUS.html",
    "/ODDINARY": "/skz-discography/html/ODDINARY.html",
    "/ChristmasEveL": "/skz-discography/html/Christmas EveL.html",
    "/NOEASY": "/skz-discography/html/NOEASY.html",
    "/ALL-IN": "/skz-discography/html/ALL IN.html",
    "/IN-LIFE": "/skz-discography/html/IN LIFE.html",
    "/GO-LIVE": "/skz-discography/html/GO LIVE.html",
    "/LEVANTER": "/skz-discography/html/Clé - LEVANTER.html",
    "/YellowWood": "/skz-discography/html/Clé 2 - Yellow Wood.html",
    "/MIROH": "/skz-discography/html/Clé 1 - MIROH.html",
    "/IamYOU": "/skz-discography/html/I am YOU.html",
    "/IamWHO": "/skz-discography/html/I am WHO.html",
    "/IamNOT": "/skz-discography/html/I am NOT.html",
    "/Mixtape": "/skz-discography/html/Mixtape.html",


};

// Check if the path matches a known clean URL
if (mapping[path]) {
    // Redirect to the corresponding .html file
    window.location.replace(mapping[path]);
}