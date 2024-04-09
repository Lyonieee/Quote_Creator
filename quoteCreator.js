document.addEventListener('DOMContentLoaded', function() {
    const inputs = ['quote-text', 'fontSelect', 'fontSize', 'fontColor', 'backgroundColor', 'imageWidth', 'imageHeight'];
    inputs.forEach(inputId => {
        document.getElementById(inputId).addEventListener('change', updatePreview);
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

function wrapText(context, text, x, y, maxWidth, lineHeight) {
    var words = text.split(' ');
    var line = '';

    for(var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + ' ';
        var metrics = context.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
            context.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
        } else {
            line = testLine;
        }
    }
    context.fillText(line, x, y);
}

function setupSaveButton() {
    document.getElementById('saveButton').addEventListener('click', function() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        const width = parseInt(document.getElementById('imageWidth').value, 10) || 800; 
        const height = parseInt(document.getElementById('imageHeight').value, 10) || 600;
        const backgroundColor = document.getElementById('backgroundColor').value;
        const fontColor = document.getElementById('fontColor').value;
        const text = document.getElementById('quote-text').value;

        canvas.width = width;
        canvas.height = height;
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const maxWidth = (width - 40) * 0.8;
        const maxHeight = height; 
        const initialFontSize = parseInt(document.getElementById('fontSize').value, 10) || 30;
        const fontSize = calculateFontSize(ctx, text, maxWidth, maxHeight, initialFontSize);
        
        ctx.font = `${fontSize}px Arial`;
        ctx.fillStyle = fontColor;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        var lineHeight = fontSize * 1.2;
        var x = width / 2;
        var y = (height / 2) - (lineHeight / 2); 

        wrapText(ctx, text, x, y, maxWidth, lineHeight);
        
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

function calculateFontSize(context, text, maxWidth, maxHeight, initialFontSize) {
    let fontSize = initialFontSize;
    context.font = `${fontSize}px Arial`;
    let textWidth = context.measureText(text).width;
    let lines = Math.ceil(textWidth / maxWidth);
    let textHeight = lines * fontSize;

    while ((textWidth > maxWidth || textHeight > maxHeight) && fontSize > 10) {
        fontSize--;
        context.font = `${fontSize}px Arial`;
        textWidth = context.measureText(text).width;
        lines = Math.ceil(textWidth / maxWidth);
        textHeight = lines * fontSize;
    }

    return fontSize;
}
