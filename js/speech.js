$(document).ready(function () {
  // loadModal();
  // SpeakBrowser("Hello world")
});

const SpeakBrowser = (textToSpeak) => {
  // Create speech synthesis utterance
  const utterance = new SpeechSynthesisUtterance(textToSpeak);
  utterance.lang = "en-US";
  // Set rate property of the SpeechSynthesisUtterance instance
  utterance.rate = 1.4;

  // Get List of Voices
  voices = window.speechSynthesis.getVoices();
  console.log('Voices', voices);
  utterance.voice = voices[2];
  // Speak the text
  speechSynthesis.speak(utterance);
}

const loadModal = async () => {
  // Load the Tacotron 2 model weights
  const tacotron2Model = await tf.loadLayersModel('https://cdn.jsdelivr.net/npm/@tensorflow/tfjs-models/dist/tacotron2.model');

  // Generate speech from the text "Hello, world!"
  const audio = generateSpeech(tacotron2Model, 'Hello, world!');

  // Play the audio
  const audioElement = document.getElementById('audio');
  audioElement.src = audio;
  audioElement.play();
}

// Generate speech from text
const generateSpeech = (tacotron2Model, text) => {
  // Convert the text to a sequence of mel-spectrograms
  const melSpectrogram = tacotron2Model.predict(text);

  // Convert the mel-spectrogram to audio
  const audio = tf.audio.spectrogramToWaveform(melSpectrogram);

  // Return the audio
  return audio;
}

const BardSpeak = (textToSpeak) => {
  // Create a new Audio object
  const audio = new Audio();

  // Set the URL of the MaryTTS server and parameters
  const serverURL = "http://marytts.example.com";
  const parameters = {
    input: "TEXT",
    output: "AUDIO",
    locale: "en_US",
    voice: "cmu-slt-hsmm",
    effect: "FIRFilter+Robot(amount=50)",
    audioformat: "wav",
    "input.text": textToSpeak,
  };
  const url = `${serverURL}/process?${new URLSearchParams(parameters)}`;

  // Set the audio source URL to the MaryTTS synthesis URL
  audio.src = url;

  // Play the audio
  audio.play();
}