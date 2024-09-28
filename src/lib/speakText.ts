export const speakText = (text: string) => {
  // Detect if the browser supports speech synthesis
  if (!('speechSynthesis' in window)) return;

  // Create a new SpeechSynthesisUtterance instance
  const uttr = new SpeechSynthesisUtterance(text);
  uttr.lang = 'en-US';

  // A function to find and set the appropriate voice
  const setVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    const englishVoice = voices.find((voice) => voice.lang === 'en-US');
    if (englishVoice) {
      uttr.voice = englishVoice;
    }
    window.speechSynthesis.speak(uttr);
  };

  // If voices are already loaded, use them
  if (window.speechSynthesis.getVoices().length > 0) {
    setVoice();
  } else {
    // Otherwise, wait for the voices to be loaded
    window.speechSynthesis.onvoiceschanged = setVoice;
  }
};
