const canvas = document.getElementById('memeCanvas');
const ctx = canvas.getContext('2d');
const imageInput = document.getElementById('imageInput');
let uploadedImage = null;

function resizeCanvas(image) {
  const maxWidth = 500;
  let width = image.width;
  let height = image.height;

  if (width > maxWidth) {
    height *= maxWidth / width;
    width = maxWidth;
  }

  canvas.width = width;
  canvas.height = height;
}

function drawImage() {
  if (uploadedImage) {
    resizeCanvas(uploadedImage); // Resize canvas based on uploaded image

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the resized image
    ctx.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);

    // Get text values
    const topText = document.getElementById('topText').value;
    const bottomText = document.getElementById('bottomText').value;

    // Set text styles
    ctx.font = '30px Impact';
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.textAlign = 'center';

    // Draw top text
    ctx.fillText(topText, canvas.width / 2, 50);
    ctx.strokeText(topText, canvas.width / 2, 50);

    // Draw bottom text
    ctx.fillText(bottomText, canvas.width / 2, canvas.height - 20);
    ctx.strokeText(bottomText, canvas.width / 2, canvas.height - 20);
  }
}

imageInput.addEventListener('change', (event) => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = (e) => {
    const img = new Image();
    img.src = e.target.result;
    img.onload = () => {
      uploadedImage = img;
      drawImage(); // Draw the image after it's loaded and canvas is resized
    };
  };

  reader.readAsDataURL(file);
});


function generateMeme() {
  drawImage();
}

function downloadMeme() {
    const link = document.createElement('a');
    const filename = prompt("Enter a filename for your meme:", 'meme.png');
  
    if (filename !== null) {
      link.download = filename.endsWith('.png') ? filename : filename + '.png';
      link.href = canvas.toDataURL();
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
  