document.addEventListener('DOMContentLoaded', function() {
    const previewsRow = document.querySelector('.small-previews-scrollable .row'); 

    // načítání obrázků z localStorage
    const savedImages = JSON.parse(localStorage.getItem('savedImages')) || [];

    // vyčištění náhledů (?)
    previewsRow.innerHTML = '';

    // div pro každý obrázek vytvořte div a img elementy pro malý náhled a přidejte je do DOM
    savedImages.forEach(imageSrc => {
        const imgDiv = document.createElement('div');
        imgDiv.classList.add('col-6', 'col-md-3', 'small-preview');

        const img = document.createElement('img');
        img.src = imageSrc;
        img.classList.add('img-fluid');
        img.alt = "Malý náhled";

        imgDiv.appendChild(img);
        previewsRow.appendChild(imgDiv);
    });
});
