document.addEventListener('DOMContentLoaded', function() {
    const previewsRow = document.querySelector('.small-previews-scrollable .row'); 

    const libraryImagePreview = document.querySelector('#libraryImagePreview img');

    const savedImages = JSON.parse(localStorage.getItem('savedImages')) || [];

    previewsRow.innerHTML = '';

    savedImages.forEach(imageSrc => {
        const imgDiv = document.createElement('div');
        imgDiv.classList.add('col-6', 'col-md-3', 'small-preview');

        const img = document.createElement('img');
        img.src = imageSrc;
        img.classList.add('img-fluid');
        img.alt = "Malý náhled";

        img.addEventListener('click', function() {
            libraryImagePreview.src = this.src;
        });
        
        imgDiv.appendChild(img);
        previewsRow.appendChild(imgDiv);
    });
});
