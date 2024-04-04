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

    document.getElementById('saveButton').addEventListener('click', function() {
        const canvas = document.getElementById('quoteCanvas');
        const ctx = canvas.getContext('2d');
    
        // Nastavení velikosti canvasu
        canvas.width = document.getElementById('imageWidth').value; // Získá hodnotu od uživatele
        canvas.height = document.getElementById('imageHeight').value; // Získá hodnotu od uživatele
    
        // Nastavení barvy pozadí
        ctx.fillStyle = document.getElementById('backgroundColor').value;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    
        // Nastavení textu
        ctx.fillStyle = document.getElementById('fontColor').value;
        ctx.font = `${document.getElementById('fontSize').value}px ${document.getElementById('fontSelect').value}`;
        ctx.textAlign = 'center';
    
        // Výpočet pozice textu pro vycentrování
        const text = document.getElementById('quote-text').value;
        const textX = canvas.width / 2;
        const textY = canvas.height / 2;
        ctx.fillText(text, textX, textY);
    
        // Konverze canvasu na data URL a uložení do localStorage
        const imageDataURL = canvas.toDataURL("image/png");
        const imageKey = 'quoteImage_' + Date.now(); // Unikátní klíč pro každý obrázek
        localStorage.setItem(imageKey, imageDataURL);
    });
 