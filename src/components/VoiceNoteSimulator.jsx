import React, { useState } from 'react';
import { Button } from '../shared/ui/Button';
import { Mic, Send, Volume2, Sparkles } from 'lucide-react';

export function VoiceNoteSimulator({ onSendVoiceTranscript }) {
  const [selectedVoiceSample, setSelectedVoiceSample] = useState(null);

  const voiceSamples = [
    {
      id: 1,
      duration: "0:08",
      label: "Voice Note 1: Urgent AC Issue",
      transcript: "Hi, I need AC repair today evening at Green Park. It is blowing hot air."
    },
    {
      id: 2,
      duration: "0:06",
      label: "Voice Note 2: Support Complaint",
      transcript: "My AC still isn't cooling after yesterday's service visit! Please send someone."
    },
    {
      id: 3,
      duration: "0:05",
      label: "Voice Note 3: Plumbing Request",
      transcript: "Kitchen sink pipe is leaking heavily at Cyber City, flat 402."
    }
  ];

  const handleSimulateRecord = (sample) => {
    setSelectedVoiceSample(sample);
  };

  const handleSendSelected = () => {
    if (selectedVoiceSample) {
      onSendVoiceTranscript(selectedVoiceSample.transcript);
      setSelectedVoiceSample(null);
    }
  };

  return (
    <div className="bg-[#FFFFFF] border-none rounded-3xl p-5 space-y-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5 text-xs font-bold text-[#1F1F1F] font-heading">
          <Mic className="w-4.5 h-4.5 text-[#0B57D0]" />
          <span>Voice Note Simulator (Speech-to-Text AI)</span>
        </div>
        <span className="text-[11px] bg-[#E8F0FE] text-[#0B57D0] px-3 py-1 rounded-full font-mono border-none font-bold">
          Demo Audio
        </span>
      </div>

      {/* Voice Samples Selection */}
      <div className="space-y-2.5">
        <p className="text-xs text-[#747775] font-medium">Select a mock customer audio recording to transcribe:</p>
        <div className="grid grid-cols-1 gap-2.5">
          {voiceSamples.map(sample => (
            <div
              key={sample.id}
              onClick={() => handleSimulateRecord(sample)}
              className={`p-3.5 rounded-full border-none text-xs cursor-pointer transition-all flex items-center justify-between ${selectedVoiceSample?.id === sample.id ? 'bg-[#D3E3FD] text-[#041E49] font-bold shadow-sm' : 'bg-[#F0F4F9] text-[#1F1F1F] hover:bg-[#E1E9F5]'}`}
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#FFFFFF] flex items-center justify-center text-[#0B57D0] shrink-0 shadow-xs">
                  <Volume2 className="w-4 h-4" />
                </div>
                <span className="font-semibold">{sample.label}</span>
              </div>
              <span className="font-mono text-[11px] text-[#747775] font-bold px-2">{sample.duration}</span>
            </div>
          ))}
        </div>
      </div>

      {selectedVoiceSample && (
        <div className="bg-[#E8F0FE] border-none rounded-3xl p-4 space-y-2.5 animate-fade-in">
          <div className="flex items-center gap-2 text-xs text-[#041E49] font-bold font-heading">
            <Sparkles className="w-4 h-4 text-[#0B57D0]" />
            <span>AI Speech Transcript Preview</span>
          </div>
          <p className="text-xs text-[#1F1F1F] italic font-medium leading-relaxed">"{selectedVoiceSample.transcript}"</p>
          <div className="flex justify-end gap-2 pt-1">
            <Button size="sm" variant="ghost" onClick={() => setSelectedVoiceSample(null)}>
              Cancel
            </Button>
            <Button size="sm" variant="primary" icon={Send} onClick={handleSendSelected}>
              Send Transcribed Message
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
