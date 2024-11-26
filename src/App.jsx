import { useState, useRef, useEffect } from "react";
import "./index.css";
import waitCat from "./assets/gato-wait.png";
import danceCat1 from "./assets/gato-dance-1.png";
import danceCat2 from "./assets/gato-dance-2.png";

import waitAudio from "./assets/wait-song.mp3";
import danceAudio from "./assets/dance-song.mp3";

import "./App.css";

const App = () => {
  const [isDancing, setIsDancing] = useState(false);
  const [headerText, setHeaderText] = useState("Wait...");
  const waitAudioRef = useRef(null);
  const danceAudioRef = useRef(null);

  const handleDance = () => {
    setIsDancing(true);
    setHeaderText("They don't love you like I love you");

    waitAudioRef.current.pause();
    danceAudioRef.current.currentTime = 0;
    danceAudioRef.current.play();

    setTimeout(() => {
      setIsDancing(false);
    }, 2600);
  };

  useEffect(() => {
    if (!isDancing) {
      setHeaderText("Wait...");
      waitAudioRef.current.currentTime = 0;
      waitAudioRef.current.play();
    }
  }, [isDancing]);

  const handleWaitAudioEnded = () => {
    waitAudioRef.current.currentTime = 0;
  };

  return (
    <div className="container">
      <h1 className="title">{headerText}</h1>
      <div className={`image-container ${isDancing ? "dance" : ""}`}>
        <img
          src={waitCat}
          alt="Waiting Cat"
          className={!isDancing ? "waiting" : ""}
        />
        <img
          src={danceCat1}
          alt="Dancing Cat Frame 1"
          className={isDancing ? "dance-frame-1" : ""}
        />
        <img
          src={danceCat2}
          alt="Dancing Cat Frame 2"
          className={isDancing ? "dance-frame-2" : ""}
        />
      </div>
      <button className="action-button" onClick={handleDance}>
        {isDancing ? "Bailando..." : "¡Baila!"}
      </button>

      <audio
        ref={waitAudioRef}
        src={waitAudio}
        onEnded={handleWaitAudioEnded}
        autoPlay
      />
      <audio ref={danceAudioRef} src={danceAudio} />
    </div>
  );
};

export default App;
