import React from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

function VoiceAssistant() {
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return <p className="text-xs text-slate-500">Voice not supported</p>;
  }

  const handleCommand = () => {
    console.log("Voice command:", transcript);
  };

  return (
    <div className="flex flex-col text-right gap-1 items-end">
      <div className="flex gap-2">
        <button
          onClick={() => SpeechRecognition.startListening({ continuous: true })}
          className={`w-9 h-9 rounded-full text-xs font-bold ${
            listening
              ? "bg-red-500 text-slate-900"
              : "bg-slate-800 text-cyan-300 border border-cyan-300"
          }`}
        >
          🎙
        </button>
        <button
          onClick={() => {
            SpeechRecognition.stopListening();
            handleCommand();
          }}
          className="w-9 h-9 rounded-full text-xs font-bold bg-slate-800 text-cyan-300 border border-slate-600"
        >
          ⏹
        </button>
      </div>
      <p className="text-[10px] text-slate-400 truncate w-48">
        {transcript || "Say: 'Show predictions' or 'Open permissions'"}
      </p>
      {transcript && (
        <button
          onClick={resetTranscript}
          className="text-[10px] text-cyan-400 underline"
        >
          Clear
        </button>
      )}
    </div>
  );
}

export default VoiceAssistant;
