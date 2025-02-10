// modules/gallery.js
export function initializeGallery() {
    const images = document.querySelectorAll('.row .image');

    images.forEach((image, index) => {
        image.addEventListener('click', function() {
            const fullImageView = document.querySelector('#fullImageView');
            fullImageView.style.display = 'block';
            document.body.style.overflow = 'hidden';

            const fullImage = document.querySelector('#fullImage');
            let imgURL = image.querySelector('img').src;
            fullImage.src = imgURL;
            fullImage.style.display = 'block';

            const close = document.querySelector('.fa-x');
            close.style.display = 'block';
            close.addEventListener('click', function() {
                fullImageView.style.display = 'none';
                fullImage.style.display = 'none';
                document.body.style.overflow = 'auto';
            });

            function navigateImage(direction) {
                if (direction === 'left' && index > 0) {
                    imgURL = images[index - 1].querySelector('img').src;
                    index--;
                } else if (direction === 'right' && index < images.length - 1) {
                    imgURL = images[index + 1].querySelector('img').src;
                    index++;
                }
                
                fullImage.src = imgURL;

                left.style.display = index === 0 ? 'none' : 'block';
                right.style.display = index === images.length - 1 ? 'none' : 'block';
            }

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

            function closePreview() {
                fullImageView.style.display = 'none';
                fullImage.style.display = 'none';
                document.body.style.overflow = "auto";
            }
        });
    });
}