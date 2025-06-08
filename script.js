const memePreview = document.getElementById("meme_preview");
const inputFile = document.getElementById("input_file");
const canvas1 = document.getElementById("canvas1");
const ctx1 = canvas1.getContext("2d");
const canvas2 = document.getElementById("canvas2");
const ctx2 = canvas2.getContext("2d");
const template = new Image();
const memeDefault = new Image();
memeDefault.src = "image/kittykaki_dance.png";
const ogOutput = new Image();
ogOutput.src = "image/lost_meme_og.png";

function downloadImage(imageUrl) {
  const link = document.createElement('a');
  link.download = "feel_lost.png";
  link.href = imageUrl;
  link.click();
}

document.getElementById('download').addEventListener('click', function() {
  if (memePreview.src === memeDefault.src) {
    downloadImage(ogOutput.src);
  } else {
    downloadImage(canvas2.toDataURL('image/png'));
  }
});

// only the Promise pattern works fine!
function loadImage(file) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.src = URL.createObjectURL(file);
  });
}

inputFile.onchange = async () => {
  const loadedImage = await loadImage(inputFile.files[0]);
  memePreview.src = loadedImage.src;

  // give enough time to load, and then clear
  
  ctx1.clearRect(0, 0, 189, 189);
  ctx2.clearRect(300, 300, 189, 189);
  
  padToSquare(memePreview, 500);
  copyImageToCanvas();
};

function padToSquare(imageElement, squareSize) {
    
    // Set canvas size to square
    canvas1.width = squareSize;
    canvas1.height = squareSize;
    
    // Fill background
    ctx1.fillStyle = 'white';
    ctx1.fillRect(0, 0, squareSize, squareSize);
    
    // Calculate scale to fit image within square (maintaining aspect ratio)
    const scale = Math.min(squareSize / imageElement.width, squareSize / imageElement.height);
    const scaledWidth = imageElement.width * scale;
    const scaledHeight = imageElement.height * scale;
    
    // Calculate position to center the image
    const x = (squareSize - scaledWidth) / 2;
    const y = (squareSize - scaledHeight) / 2;
    
    // Draw the image centered
    imageElement.onload = function() {
      ctx1.drawImage(imageElement, x, y, scaledWidth, scaledHeight);
    }
    return canvas1;
}

function copyImageToCanvas() {
  template.src = 'image/lost_meme_template.png';

  template.onload = function() {
    ctx2.drawImage(template, 0, 0, 500, 500);
    ctx2.drawImage(canvas1, 300, 300, 189, 189);
  };
}