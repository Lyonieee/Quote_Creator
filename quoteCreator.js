document.addEventListener('DOMContentLoaded', function() {

    const instantUpdateInputs = ['quote-text', 'fontSize', 'fontSelect', 'fontColor', 'backgroundColor'];
    instantUpdateInputs.forEach(inputId => {
        const element = document.getElementById(inputId);
        if (element.tagName === 'SELECT') {
            element.addEventListener('change', updatePreview);
        } else {
            element.addEventListener('input', updatePreview);
        }
    });

    const dimensionInputs = ['imageWidth', 'imageHeight'];
    dimensionInputs.forEach(inputId => {
        document.getElementById(inputId).addEventListener('input', updatePreview);
    });

    setupSaveButton();
});

function updatePreview() {

    const quoteTextValue = document.getElementById('quote-text').value;
    const fontSelectValue = document.getElementById('fontSelect').value;
    const fontSizeValue = document.getElementById('fontSize').value;
    const fontColorValue = document.getElementById('fontColor').value;
    const backgroundColorValue = document.getElementById('backgroundColor').value;
    const imageWidthValue = document.getElementById('imageWidth').value;
    const imageHeightValue = document.getElementById('imageHeight').value;

    const livePreview = document.getElementById('livePreview');

    livePreview.style.fontFamily = fontSelectValue;
    livePreview.style.fontSize = `${fontSizeValue}px`;
    livePreview.style.color = fontColorValue;
    livePreview.style.backgroundColor = backgroundColorValue;
    livePreview.style.width = `${imageWidthValue}px`;
    livePreview.style.height = `${imageHeightValue}px`;

    livePreview.innerText = quoteTextValue;
} 

function setupSaveButton() {
    const saveButton = document.getElementById('saveButton');
    if (!saveButton) {
        console.error('Save button not found.');
        return;
    }

    saveButton.addEventListener('click', function() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const previewWidth = 800;
        const previewHeight = 400;

        const imageWidth = parseInt(document.getElementById('imageWidth').value, 10) || 800;
        const imageHeight = parseInt(document.getElementById('imageHeight').value, 10) || 600;

        const scaleX = imageWidth / previewWidth;
        const scaleY = imageHeight / previewHeight;
        const scale = Math.min(scaleX, scaleY);

        canvas.width = parseInt(document.getElementById('imageWidth').value, 10) || 800;
        canvas.height = parseInt(document.getElementById('imageHeight').value, 10) || 600;

        ctx.fillStyle = document.getElementById('backgroundColor').value || 'white';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const text = document.getElementById('quote-text').value || '';


        const maxWidth = canvas.width - 80; 
        const maxHeight = canvas.height - 20;
        const fontSelectValue = document.getElementById('fontSelect').value;


        
        let fontSize = parseInt(document.getElementById('fontSize').value, 10) || 30;

        fontSize = calculateFontSize(ctx, text, maxWidth, maxHeight, fontSize);
        const scaledFontSize = fontSize * scale;
        ctx.font = `${scaledFontSize}px ${fontSelectValue}`;

        ctx.fillStyle = document.getElementById('fontColor').value || 'black';
        ctx.textAlign = 'center';

        const lines = wrapTextAndGetLines(ctx, text, maxWidth, fontSize);    

        const lineHeight = scaledFontSize * 1.2;

        const totalTextHeight = lines.length * lineHeight;
        let startY = Math.max((canvas.height - totalTextHeight) / 2, 20); 

        lines.forEach((line, index) => {
            ctx.fillText(line, canvas.width / 2, startY + (index * lineHeight));
            
        });

        const trimmedText = text.substring(0, 8); 
        const fileName = trimmedText.replace(/\s+/g, '_') + '.jpg';
        const image = canvas.toDataURL("image/jpeg");
        
        let savedImages = JSON.parse(localStorage.getItem('savedImages')) || [];
        savedImages.push(image);
        localStorage.setItem('savedImages', JSON.stringify(savedImages));

        const link = document.createElement('a');
        link.download = fileName;
        link.href = image;
        link.click();
    });
}

function downloadImage(data, filename) {
    const a = document.createElement('a');
    a.href = data;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

function wrapTextAndGetLines(ctx, text, maxWidth, fontSize) {

    const fontSelectValue = document.getElementById('fontSelect').value;

    ctx.font = `${fontSize}px ${fontSelectValue}`;

    let words = text.split(' ');
    let lines = [];
    let currentLine = words[0];

    for (let i = 1; i < words.length; i++) {
        let word = words[i];
        let testLine = currentLine + " " + word;
        let metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth) {
            lines.push(currentLine);
            currentLine = word;
        } else {
            currentLine = testLine;
        }
    }
    lines.push(currentLine); 
    return lines;
}

function getTextHeight(lines, lineHeight) {
    return lines.length * lineHeight;
}

function calculateFontSize(ctx, text, maxWidth, maxHeight, initialFontSize) {
    let fontSize = initialFontSize;
    let lines = wrapTextAndGetLines(ctx, text, maxWidth, fontSize);
    let textHeight = getTextHeight(lines, fontSize * 1.2);

    while ((textHeight > maxHeight || lines.some(line => ctx.measureText(line).width > maxWidth)) && fontSize > 10) {
        fontSize--;
        lines = wrapTextAndGetLines(ctx, text, maxWidth, fontSize);
        textHeight = getTextHeight(lines, fontSize * 1.2);
    }

    return fontSize;
}

