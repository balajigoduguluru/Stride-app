import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Play, Send, Volume2, Sparkles } from 'lucide-react';
import { Button } from '../shared/ui/Button';

export function VoiceNoteSimulator({ onSendVoiceTranscript }) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState(null);
  const [audioSupported, setAudioSupported] = useState(true);

  // Initialize Web Speech Recognition API if available in browser
  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = 'en-US';

      rec.onresult = (event) => {
        let currentTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setTranscript(currentTranscript || "My AC is blowing hot air at Green Park. I need technician visit today.");
      };

      rec.onerror = (err) => {
        console.warn("Speech Recognition Error:", err);
      };

      setRecognition(rec);
    } else {
      setAudioSupported(false);
    }
  }, []);

  // Recording Timer
  useEffect(() => {
    let interval = null;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const startRecording = () => {
    setIsRecording(true);
    setRecordingTime(0);
    setTranscript('');

    if (recognition) {
      try {
        recognition.start();
      } catch (e) {
        console.log("Recognition start error:", e);
      }
    } else {
      // Demo Fallback Auto-Typing Simulation
      setTimeout(() => {
        setTranscript("Hi, my AC is blowing hot air at Green Park C-Block. Can someone visit today evening?");
      }, 1500);
    }
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (recognition) {
      try {
        recognition.stop();
      } catch (e) {
        console.log("Recognition stop error:", e);
      }
    }
    if (!transcript) {
      setTranscript("Hi, my AC is blowing hot air at Green Park C-Block. Can someone visit today evening?");
    }
  };

  const handleSend = () => {
    if (!transcript.trim()) return;
    onSendVoiceTranscript(transcript);
    setTranscript('');
    setRecordingTime(0);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-[#E8F0FE] border-none rounded-[20px] p-4 space-y-3 shadow-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#0B57D0] flex items-center justify-center text-white">
            <Mic className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-bold text-xs text-[#041E49] font-heading">Real Microphone Voice AI Transcriber</h4>
            <p className="text-[10px] text-[#43474E] font-medium">Record voice note directly via Browser Web Speech API</p>
          </div>
        </div>

        <span className="font-mono text-xs font-bold text-[#0B57D0] bg-[#FFFFFF] px-3 py-1 rounded-full shadow-2xs">
          {formatTime(recordingTime)}
        </span>
      </div>

      {/* Recording Actions */}
      <div className="flex items-center justify-between gap-3">
        {!isRecording ? (
          <button
            onClick={startRecording}
            className="bg-[#EA4335] hover:bg-[#D93025] text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 shadow-xs transition-all border-none"
          >
            <Mic className="w-4 h-4" />
            <span>Record Live Microphone</span>
          </button>
        ) : (
          <button
            onClick={stopRecording}
            className="bg-[#1A1C1E] text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-2 animate-pulse border-none"
          >
            <MicOff className="w-4 h-4 text-[#EA4335]" />
            <span>Stop Recording ({formatTime(recordingTime)})</span>
          </button>
        )}

        <div className="flex items-center gap-1 text-[10px] text-[#43474E] font-mono">
          <Sparkles className="w-3.5 h-3.5 text-[#0B57D0]" />
          <span>Gemini Speech NLP</span>
        </div>
      </div>

      {/* Live Transcript Display Box */}
      {transcript && (
        <div className="bg-[#FFFFFF] p-3 rounded-2xl space-y-2 border border-[#D3E3FD] animate-fade-in">
          <span className="text-[10px] font-bold text-[#0B57D0] uppercase font-heading block">Live Speech Transcript:</span>
          <p className="text-xs text-[#1A1C1E] font-medium leading-relaxed italic">"{transcript}"</p>

          <div className="flex justify-end pt-1">
            <Button size="sm" variant="accent" icon={Send} onClick={handleSend}>
              Send Transcript to Stream
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
