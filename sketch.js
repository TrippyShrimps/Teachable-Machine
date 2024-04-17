// Zmienna klasyfikatora
let classifier;
// Model URL
let imageModelURL = 'https://teachablemachine.withgoogle.com/models/5S6UN09l2/';

// Wideo
let video;
let flippedVideo;
// Opis
let label = "";

// Załaduj model
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
}

function setup() {
  createCanvas(640, 480);
  // Stwórz wideo
  video = createCapture(VIDEO);
  video.size(640 , 480);
  video.hide();

  flippedVideo = ml5.flipImage(video)
  // Start klasyfikacji
  classifyVideo();
}

// Przewidzenie klatki wideo
function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
}

// Gdy wynik
function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  
  // Get the top result
  let topResult = results[0];
  // Get the label
  let label = topResult.label;

  // Display video feed
  image(video, 0, 0, width, height);

  // Display the emoji corresponding to the label
  displayEmoji(label);
  
  // Reclassify in the next frame
  classifyVideo();
}


  // Wyświetl emoji
  function displayEmoji(label) {
    let emoji;
    let textLabel;
    switch (label) {
      case 'Human':
        emoji = '😊';
        textLabel = 'human';
        break;
      case 'Crocodile':
        emoji = '🐊';
        textLabel = 'crocodile';
        break;
      case 'Wall':
        emoji = '🧱';
        textLabel = 'wall';
        break;
      case 'Dolphin':
        emoji = '🐬';
        textLabel = 'dolphin';
        break;
      case 'Duck':
        emoji = '🦆';
        textLabel = 'duck';
        break;
      case 'HappyOctopus':
        emoji = '🐙';
        textLabel = 'happy octopus';
        break;
      case 'SadOctopus':
        emoji = '😟';
        textLabel = 'sad octopus';
        break;
      case 'Car':
        emoji = '🏎️';
        textLabel = 'car';
        break;
      default:
        emoji = '❓'; // Nieznane obiekty
        textLabel = 'unknown subject';
    }

    const emojiColors = {
      '😊': '#ffd700', // Gold color for '😊' emoji
      '🐊': '#006400', // Dark green color for '🐊' emoji
      '🧱': '#a52a2a', // Brown color for '🧱' emoji
      '🐬': '#4682b4', // Steel blue color for '🐬' emoji
      '🦆': '#000080', // Navy color for '🦆' emoji
      '🐙': '#8b008b', // Dark magenta color for '🐙' emoji
      '😟': '#708090', // Slate gray color for '😟' emoji
      '🏎️': '#ff0000', // Red color for '🏎️' emoji
      '❓': '#ffffff' // White color for unknown emoji
    };

    // Wyświetlanie emoji
    let colorCode = emojiColors[emoji] || '#ffffff';
    textSize(60);
    textAlign(CENTER);
    fill(colorCode);
    text(emoji + ' ' + textLabel, width / 2, height - 400); // Display emoji and text at the bottom center of the canvas
  }