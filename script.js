window.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const stopButton = document.getElementById('stopButton');
    const status = document.getElementById('status');
    const transcript = document.getElementById('transcript');

    let recognition;

    // Check if the browser supports the Web Speech API
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        status.textContent = "Your browser does not support the Web Speech API";
        startButton.disabled = true;
    } else {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognition = new SpeechRecognition();

        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';

        recognition.onstart = () => {
            status.textContent = "Listening...";
            startButton.disabled = true;
            stopButton.disabled = false;
            status.style.color = 'white'; // Set text color to white
            transcript.style.color = 'white'; // Set text color to white
        };

        recognition.onresult = (event) => {
            let interimTranscript = '';
            let finalTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                } else {
                    interimTranscript += event.results[i][0].transcript;
                }
            }
            transcript.textContent = finalTranscript + interimTranscript;
            transcript.style.color = 'white'; // Set text color to white
        };

        recognition.onerror = (event) => {
            status.textContent = `Error occurred in recognition: ${event.error}`;
            startButton.disabled = false;
            stopButton.disabled = true;
            status.style.color = 'white'; // Set text color to white
        };

        recognition.onend = () => {
            status.textContent = "Click 'Start Listening' to begin...";
            startButton.disabled = false;
            stopButton.disabled = true;
            status.style.color = 'white'; // Set text color to white
        };
    }

    startButton.addEventListener('click', () => {
        recognition.start();
    });

    stopButton.addEventListener('click', () => {
        recognition.stop();
    });
});