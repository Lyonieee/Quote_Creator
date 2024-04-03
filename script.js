document.addEventListener('DOMContentLoaded', function() {
    const inputs = ['quote-text', 'fontSelect', 'fontSize', 'fontColor', 'backgroundColor', 'imageWidth', 'imageHeight'];
    inputs.forEach(inputId => {
        document.getElementById(inputId).addEventListener('change', updatePreview);
    });
});

function updatePreview() {
    // získání hodnot ze vstupů
    const quoteTextValue = document.getElementById('quote-text').value;
    const fontSelectValue = document.getElementById('fontSelect').value;
    const fontSizeValue = document.getElementById('fontSize').value;
    const fontColorValue = document.getElementById('fontColor').value;
    const backgroundColorValue = document.getElementById('backgroundColor').value;
    const imageWidthValue = document.getElementById('imageWidth').value;
    const imageHeightValue = document.getElementById('imageHeight').value;

    // kontejner pro živý náhled
    const livePreview = document.getElementById('livePreview');

    // aktualizace stylu pro živý náhled
    livePreview.style.fontFamily = fontSelectValue;
    livePreview.style.fontSize = `${fontSizeValue}px`;
    livePreview.style.color = fontColorValue;
    livePreview.style.backgroundColor = backgroundColorValue;
    livePreview.style.width = `${imageWidthValue}px`;
    livePreview.style.height = `${imageHeightValue}px`;

    // aktualizace textu v živém náhledu
    livePreview.innerText = quoteTextValue;
}

// canvas
    const canvas = document.createElement('canvas');
    canvas.width = imageWidthValue; // šířka obrázku z vstupu
    canvas.height = imageHeightValue; // výška obrázku z vstupu
    const ctx = canvas.getContext('2d');

// přidání canvasu do těla stránky
document.body.appendChild(canvas);