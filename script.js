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

// ***********ukládání obrázku

document.getElementById('saveButton').addEventListener('click', function() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const width = parseInt(document.getElementById('imageWidth').value, 10) || 600; 
    const height = parseInt(document.getElementById('imageHeight').value, 10) || 400; 

    canvas.width = width;
    canvas.height = height;

        // přenos nastavení z formuláře na výsledný jpg
        ctx.fillStyle = document.getElementById('backgroundColor').value; 
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = `${document.getElementById('fontSize').value}px ${document.getElementById('fontSelect').value}`;
        ctx.fillStyle = document.getElementById('fontColor').value;

    // centrování textu
    const text = document.getElementById('quote-text').value;
    const x = canvas.width / 2;
    const y = canvas.height / 2;

    ctx.textAlign = 'center';
    ctx.fillText(text, x, y);

    // vygenerování obrázku a stahování
    const image = canvas.toDataURL("image/jpg").replace("image/jpg", "image/octet-stream");
    const link = document.createElement('a');
    link.download = 'my-quote.jpg';
    link.href = image;
    link.click();
});