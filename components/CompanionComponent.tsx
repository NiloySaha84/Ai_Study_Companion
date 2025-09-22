'use client';

import { useEffect, useRef, useState } from 'react'
import { cn, configureAssistant, getSubjectColor } from "@/lib/utils";
import { vapi } from "@/lib/vapi.sdk";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import soundwaves from '@/constants/soundwaves.json'
import { addToSessionHistory } from "@/lib/actions/companion.actions";
import { 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff, 
  Loader2, 
  MessageCircle,
  User,
  Bot
} from "lucide-react";
import Image from "next/image";

enum CallStatus {
  INACTIVE = 'INACTIVE',
  CONNECTING = 'CONNECTING',
  ACTIVE = 'ACTIVE',
  FINISHED = 'FINISHED',
}

const CompanionComponent = ({ companionId, subject, topic, name, userName, userImage, style, voice }: CompanionComponentProps) => {
  const [callStatus, setCallStatus] = useState<CallStatus>(CallStatus.INACTIVE);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [messages, setMessages] = useState<SavedMessage[]>([]);

  const lottieRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (lottieRef) {
      if (isSpeaking) {
        lottieRef.current?.play()
      } else {
        lottieRef.current?.stop()
      }
    }
  }, [isSpeaking, lottieRef])

  useEffect(() => {
    const onCallStart = () => {
      console.log('Call started');
      setCallStatus(CallStatus.ACTIVE);
    };

    const onCallEnd = () => {
      console.log('Call ended');
      setCallStatus(CallStatus.FINISHED);
      addToSessionHistory(companionId)
    }

    const onMessage = (message: Message) => {
      console.log('Message received:', message);
      if (message.type === 'transcript' && message.transcriptType === 'final') {
        const newMessage = { role: message.role, content: message.transcript }
        setMessages((prev) => [newMessage, ...prev])
      }
    }

    const onSpeechStart = () => {
      console.log('Speech started');
      setIsSpeaking(true);
    };
    
    const onSpeechEnd = () => {
      console.log('Speech ended');
      setIsSpeaking(false);
    };

    const onError = (error: Error) => {
      console.error('VAPI Error:', error);
      setCallStatus(CallStatus.FINISHED);
    };

    vapi.on('call-start', onCallStart);
    vapi.on('call-end', onCallEnd);
    vapi.on('message', onMessage);
    vapi.on('error', onError);
    vapi.on('speech-start', onSpeechStart);
    vapi.on('speech-end', onSpeechEnd);

    return () => {
      vapi.off('call-start', onCallStart);
      vapi.off('call-end', onCallEnd);
      vapi.off('message', onMessage);
      vapi.off('error', onError);
      vapi.off('speech-start', onSpeechStart);
      vapi.off('speech-end', onSpeechEnd);
    }
  }, [companionId]);

  const toggleMicrophone = () => {
    const isMuted = vapi.isMuted();
    vapi.setMuted(!isMuted);
    setIsMuted(!isMuted)
  }

  const handleCall = async () => {
    setCallStatus(CallStatus.CONNECTING)

    try {
      // Check microphone permissions first
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      console.log('✅ Microphone access confirmed');
      stream.getTracks().forEach(track => track.stop());

      const assistantConfig = configureAssistant(voice, style);
      console.log('🎤 Starting call with config:', assistantConfig);

      const assistantOverrides = {
        variableValues: { subject, topic, style },
        clientMessages: ["transcript"],
        serverMessages: [],
      }

      // @ts-expect-error - vapi.start method signature may not match expected types
      await vapi.start(assistantConfig, assistantOverrides);
      console.log('✅ Call started successfully');
    } catch (error: unknown) {
      console.error('❌ Failed to start call:', error);
      
      // Provide specific error messages
      if (error instanceof Error) {
        if (error.name === 'NotAllowedError') {
          alert('Microphone access denied. Please allow microphone access and try again.');
        } else if (error.name === 'NotFoundError') {
          alert('No microphone found. Please connect a microphone and try again.');
        } else if (error.name === 'NotSupportedError') {
          alert('Voice features not supported in this browser. Please use Chrome, Firefox, or Safari.');
        } else {
          alert(`Voice error: ${error.message}`);
        }
      } else {
        alert('Unknown voice error occurred. Please check console for details.');
      }
      
      setCallStatus(CallStatus.FINISHED);
    }
  }

  const handleDisconnect = () => {
    setCallStatus(CallStatus.FINISHED)
    vapi.stop()
  }

  const getSubjectIcon = (subject: string) => {
    const icons: { [key: string]: string } = {
      mathematics: "🔢",
      science: "🔬",
      history: "📚",
      language: "🌍",
      coding: "💻",
      economics: "💰",
    };
    return icons[subject.toLowerCase()] || "📖";
  };

  return (
    <div className="space-y-8">
      {/* Main Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* AI Companion */}
        <div className="card p-8 text-center">
          <div className="relative mb-6">
            <div 
              className="w-32 h-32 mx-auto rounded-3xl flex items-center justify-center text-6xl mb-4 relative overflow-hidden"
              style={{ backgroundColor: getSubjectColor(subject) + '20' }}
            >
              {/* Static Icon */}
              <div
                className={cn(
                  'absolute inset-0 flex items-center justify-center transition-opacity duration-1000',
                  callStatus === CallStatus.FINISHED || callStatus === CallStatus.INACTIVE ? 'opacity-100' : 'opacity-0',
                  callStatus === CallStatus.CONNECTING && 'opacity-100 animate-pulse'
                )}
              >
                <span className="text-6xl">{getSubjectIcon(subject)}</span>
              </div>

              {/* Animated Lottie */}
              <div className={cn(
                'absolute inset-0 flex items-center justify-center transition-opacity duration-1000',
                callStatus === CallStatus.ACTIVE ? 'opacity-100' : 'opacity-0'
              )}>
                <Lottie
                  lottieRef={lottieRef}
                  animationData={soundwaves}
                  autoplay={false}
                  className="w-full h-full"
                />
              </div>
            </div>
            
            <h3 className="text-2xl font-bold mb-2">{name}</h3>
            <p className="text-muted-foreground">{subject} • {topic}</p>
          </div>

          {/* Status Indicator */}
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className={cn(
              "w-3 h-3 rounded-full",
              callStatus === CallStatus.ACTIVE ? "bg-green-500 animate-pulse" :
              callStatus === CallStatus.CONNECTING ? "bg-yellow-500 animate-pulse" :
              "bg-gray-400"
            )} />
            <span className="text-sm text-muted-foreground">
              {callStatus === CallStatus.ACTIVE ? (isSpeaking ? "Speaking..." : "Listening...") :
               callStatus === CallStatus.CONNECTING ? "Connecting..." :
               "Ready"}
            </span>
          </div>
          
          {/* Debug Info */}
          {callStatus === CallStatus.ACTIVE && (
            <div className="text-xs text-muted-foreground text-center mb-4">
              <div>Microphone: {isMuted ? "Muted" : "Active"}</div>
              <div>Voice Activity: {isSpeaking ? "Detected" : "Waiting"}</div>
            </div>
          )}
          
          {/* Voice Test Button */}
          {callStatus === CallStatus.INACTIVE && (
            <div className="text-center mb-4">
              <button 
                onClick={async () => {
                  try {
                    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                    console.log('✅ Microphone test successful');
                    alert('Microphone is working! You can start a voice session.');
                    stream.getTracks().forEach(track => track.stop());
                  } catch (error: unknown) {
                    console.error('❌ Microphone test failed:', error);
                    const message = error instanceof Error ? error.message : 'Unknown error';
                    alert(`Microphone test failed: ${message}`);
                  }
                }}
                className="btn-secondary text-sm px-4 py-2"
              >
                🎤 Test Microphone
              </button>
            </div>
          )}
        </div>

        {/* User Section */}
        <div className="card p-8">
          <div className="text-center mb-6">
                <Image 
                  src={userImage} 
                  alt={userName} 
                  width={80}
                  height={80}
                  className="w-20 h-20 rounded-2xl mx-auto mb-4 object-cover"
                />
            <h3 className="text-xl font-semibold">{userName}</h3>
          </div>

          {/* Controls */}
          <div className="space-y-4">
            {/* Microphone Toggle */}
            <button 
              className={cn(
                "w-full p-4 rounded-xl border-2 border-dashed transition-all duration-200 flex items-center justify-center space-x-3",
                callStatus !== CallStatus.ACTIVE 
                  ? "border-muted text-muted-foreground cursor-not-allowed" 
                  : isMuted 
                    ? "border-red-200 bg-red-50 text-red-600 hover:bg-red-100" 
                    : "border-green-200 bg-green-50 text-green-600 hover:bg-green-100"
              )}
              onClick={toggleMicrophone} 
              disabled={callStatus !== CallStatus.ACTIVE}
            >
              {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              <span className="font-medium">
                {isMuted ? 'Microphone Off' : 'Microphone On'}
              </span>
            </button>

            {/* Call Button */}
            <button
              className={cn(
                "w-full p-4 rounded-xl font-semibold text-white transition-all duration-200 flex items-center justify-center space-x-3",
                callStatus === CallStatus.ACTIVE
                  ? "bg-red-600 hover:bg-red-700"
                  : callStatus === CallStatus.CONNECTING
                    ? "bg-yellow-600 cursor-not-allowed"
                    : "btn-gradient"
              )}
              onClick={callStatus === CallStatus.ACTIVE ? handleDisconnect : handleCall}
              disabled={callStatus === CallStatus.CONNECTING}
            >
              {callStatus === CallStatus.CONNECTING ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Connecting...</span>
                </>
              ) : callStatus === CallStatus.ACTIVE ? (
                <>
                  <PhoneOff className="w-5 h-5" />
                  <span>End Session</span>
                </>
              ) : (
                <>
                  <Phone className="w-5 h-5" />
                  <span>Start Learning Session</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Conversation Transcript */}
      <div className="card p-6">
        <div className="flex items-center space-x-2 mb-4">
          <MessageCircle className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold">Conversation</h3>
        </div>
        
        <div className="bg-muted/50 rounded-xl p-4 max-h-64 overflow-y-auto">
          {messages.length > 0 ? (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "flex items-start space-x-3 p-3 rounded-lg",
                    message.role === 'assistant' ? "bg-primary/5" : "bg-accent/5"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0",
                    message.role === 'assistant' ? "bg-primary/10" : "bg-accent/10"
                  )}>
                    {message.role === 'assistant' ? (
                      <Bot className="w-4 h-4 text-primary" />
                    ) : (
                      <User className="w-4 h-4 text-accent" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      {message.role === 'assistant' ? name.split(' ')[0] : userName}
                    </p>
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Start a conversation to see the transcript here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CompanionComponent