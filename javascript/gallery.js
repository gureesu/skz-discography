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
            fullImageView.style.display = 'none';
            fullImage.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        // Left icon
        const left = document.querySelector('.fa-circle-arrow-left');
        left.style.display = 'block';

        if (index === 0) {
            left.style.display = 'none';
        }

        left.addEventListener('click', function() {
            // Handle going to the previous image
            if (index > 0) {
                imgURL = images[index - 1].querySelector('img').src;
                index--;
                fullImage.src = imgURL;
            }

            // Show/hide buttons based on index
            if (index === 0) {
                left.style.display = 'none';
            }
            if (index < images.length - 1) {
                right.style.display = 'block';
            }
        });

        // Right icon
        const right = document.querySelector('.fa-circle-arrow-right');
        right.style.display = 'block';

        if (index === images.length - 1) {
            right.style.display = 'none';
        }

        right.addEventListener('click', function() {
            // Handle going to the next image
            if (index < images.length - 1) {
                imgURL = images[index + 1].querySelector('img').src;
                index++;
                fullImage.src = imgURL;
            }

            // Show/hide buttons based on index
            if (index === images.length - 1) {
                right.style.display = 'none';
            }
            if (index > 0) {
                left.style.display = 'block';
            }
        });


        // exit preview
        fullImageView.addEventListener('click', function(e) {
            if (e.target == fullImageView && (e.target !== left || e.target !== right)) {
                fullImageView.style.display = 'none';
                fullImage.style.display = 'none';
                document.body.style.overflow = "auto";
            }
        });
    });
});