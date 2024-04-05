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

function setupSaveButton() {
        document.getElementById('saveButton').addEventListener('click', function() {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const width = parseInt(document.getElementById('imageWidth').value, 10) || 800; 
            const height = parseInt(document.getElementById('imageHeight').value, 10) || 600;
    
            canvas.width = width;
            canvas.height = height;
    
            ctx.fillStyle = document.getElementById('backgroundColor').value;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.font = `${document.getElementById('fontSize').value}px ${document.getElementById('fontSelect').value}`;
            ctx.fillStyle = document.getElementById('fontColor').value;
   
            const text = document.getElementById('quote-text').value;
            const x = canvas.width / 2;
            const y = canvas.height / 2;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle'; 
            ctx.fillText(text, x, y); 
    
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