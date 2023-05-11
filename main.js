const divCam = document.getElementById('camera')
const divSnap = document.getElementById('snapshot')
const divControles = document.getElementById('controles')
const divEmotion1 = document.getElementById('emotion1')
const divEmoji1 = document.getElementById('emoji1')
const divEmotion2 = document.getElementById('emotion2')
const divEmoji2 = document.getElementById('emoji2')

// AI config
const URL = "https://teachablemachine.withgoogle.com/models/NQ3-8Yvxk/";
const modelURL = URL + "model.json";
const metadataURL = URL + "metadata.json";
const classifier = ml5.imageClassifier(modelURL, modelReady);

const emocoes = {
    "feliz" : "&#128522;",
    "triste" : "&#128532;",
    "irritado" : "&#128548;"
}

Webcam.set({
    width: 350,
    heigth: 300,
    imageFormat: 'png',
    pngQaulity: 90
})

Webcam.attach(divCam);

function modelReady() {
    console.log('Model Ready')
    divControles.style.display = "block";
}

function speak(previsao1, previsao2) {
    const synth = speechSynthesis;
    const frase1 = "a primeira previsão é " + previsao1;
    const frase2 = " e a segunta previsão é " + previsao2;
    const utterThis = new SpeechSynthesisUtterance(frase1 + frase2);
    synth.speak(utterThis);
}

function begin() {
    Webcam.snap(dataURI => {
        const ibagem = document.createElement("img");
        ibagem.id = "captura";
        ibagem.src = dataURI;
        divSnap.innerHTML = " ";
        divSnap.appendChild(ibagem);
        speak("triste", "feliz");
    });
}