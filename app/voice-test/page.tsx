"use client";

import { useState, useEffect } from 'react';
import { Mic, Volume2, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

export default function VoiceTestPage() {
  const [microphoneStatus, setMicrophoneStatus] = useState<'unknown' | 'granted' | 'denied'>('unknown');
  const [, setAudioContext] = useState<AudioContext | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [audioLevel, setAudioLevel] = useState(0);
  const [browserInfo, setBrowserInfo] = useState<{
    userAgent: string;
    isChrome: boolean;
    isFirefox: boolean;
    isSafari: boolean;
    isEdge: boolean;
    hasWebAudio: boolean;
    hasMediaDevices: boolean;
  }>({
    userAgent: '',
    isChrome: false,
    isFirefox: false,
    isSafari: false,
    isEdge: false,
    hasWebAudio: false,
    hasMediaDevices: false,
  });
  const [issues, setIssues] = useState<string[]>([]);

  useEffect(() => {
    // Check browser compatibility
    const info = {
      userAgent: navigator.userAgent,
      isChrome: /Chrome/.test(navigator.userAgent),
      isFirefox: /Firefox/.test(navigator.userAgent),
      isSafari: /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent),
      isEdge: /Edg/.test(navigator.userAgent),
      hasWebAudio: typeof AudioContext !== 'undefined' || typeof (window as unknown as { webkitAudioContext?: unknown }).webkitAudioContext !== 'undefined',
      hasMediaDevices: navigator.mediaDevices !== undefined,
    };
    setBrowserInfo(info);

    // Check for issues
    const detectedIssues: string[] = [];
    if (!info.isChrome && !info.isFirefox && !info.isSafari) {
      detectedIssues.push('Unsupported browser - use Chrome, Firefox, or Safari');
    }
    if (!info.hasWebAudio) {
      detectedIssues.push('Web Audio API not supported');
    }
    if (!info.hasMediaDevices) {
      detectedIssues.push('MediaDevices API not supported');
    }
    setIssues(detectedIssues);

    // Test microphone access
    testMicrophone();
  }, []);

  const testMicrophone = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setMicrophoneStatus('granted');
      
      // Set up audio level monitoring
      const audioContext = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      setAudioContext(audioContext);
      
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);
      microphone.connect(analyser);
      
      analyser.fftSize = 256;
      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      
      const updateAudioLevel = () => {
        analyser.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((a, b) => a + b) / bufferLength;
        setAudioLevel(average);
        requestAnimationFrame(updateAudioLevel);
      };
      
      updateAudioLevel();
      
      // Clean up after 10 seconds
      setTimeout(() => {
        stream.getTracks().forEach(track => track.stop());
        audioContext.close();
      }, 10000);
      
    } catch (error: unknown) {
      setMicrophoneStatus('denied');
      console.error('Microphone test failed:', error);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsRecording(true);
      
      // Simulate recording for 5 seconds
      setTimeout(() => {
        setIsRecording(false);
        stream.getTracks().forEach(track => track.stop());
        alert('Recording test completed! Check console for details.');
      }, 5000);
      
    } catch (error) {
      console.error('Recording failed:', error);
      alert('Recording test failed. Check console for details.');
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8">
            🎤 Voice Troubleshooting
          </h1>
          
          {/* Browser Compatibility */}
          <div className="card p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4">Browser Compatibility</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                {browserInfo.isChrome || browserInfo.isFirefox || browserInfo.isSafari ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
                <span>Supported Browser</span>
              </div>
              <div className="flex items-center space-x-2">
                {browserInfo.hasWebAudio ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
                <span>Web Audio API</span>
              </div>
              <div className="flex items-center space-x-2">
                {browserInfo.hasMediaDevices ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
                <span>MediaDevices API</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {browserInfo.userAgent}
              </div>
            </div>
          </div>

          {/* Microphone Test */}
          <div className="card p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4">Microphone Test</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                {microphoneStatus === 'granted' ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : microphoneStatus === 'denied' ? (
                  <XCircle className="w-5 h-5 text-red-500" />
                ) : (
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                )}
                <span>
                  {microphoneStatus === 'granted' ? 'Microphone Access Granted' :
                   microphoneStatus === 'denied' ? 'Microphone Access Denied' :
                   'Testing Microphone...'}
                </span>
              </div>
              
              {microphoneStatus === 'granted' && (
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Volume2 className="w-4 h-4" />
                    <span>Audio Level: {Math.round(audioLevel)}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-100"
                      style={{ width: `${Math.min(audioLevel * 2, 100)}%` }}
                    />
                  </div>
                </div>
              )}
              
              <button 
                onClick={testMicrophone}
                className="btn-primary"
                disabled={microphoneStatus === 'granted'}
              >
                {microphoneStatus === 'granted' ? '✅ Microphone Working' : 'Test Microphone'}
              </button>
            </div>
          </div>

          {/* Recording Test */}
          <div className="card p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-4">Recording Test</h2>
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Test if your microphone can record audio properly.
              </p>
              <button 
                onClick={startRecording}
                className="btn-gradient"
                disabled={microphoneStatus !== 'granted' || isRecording}
              >
                {isRecording ? (
                  <>
                    <Mic className="w-4 h-4 mr-2 animate-pulse" />
                    Recording... (5s)
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4 mr-2" />
                    Start Recording Test
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Issues */}
          {issues.length > 0 && (
            <div className="card p-6 mb-6">
              <h2 className="text-2xl font-semibold mb-4 text-red-600">Issues Detected</h2>
              <ul className="space-y-2">
                {issues.map((issue, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <XCircle className="w-4 h-4 text-red-500" />
                    <span>{issue}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Solutions */}
          <div className="card p-6">
            <h2 className="text-2xl font-semibold mb-4">Troubleshooting Solutions</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold mb-2">If voice cuts off after 2-3 words:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Check your internet connection stability</li>
                  <li>Close other apps that might be using the microphone</li>
                  <li>Try refreshing the page and starting a new session</li>
                  <li>Check browser console for error messages (F12 → Console)</li>
                  <li>Ensure you&apos;re using Chrome, Firefox, or Safari</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">If microphone access is denied:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Click the microphone icon in your browser&apos;s address bar</li>
                  <li>Select &quot;Allow&quot; for microphone access</li>
                  <li>Refresh the page and try again</li>
                  <li>Check your system&apos;s microphone permissions</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">If you see errors in console:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Check if VAPI token is valid</li>
                  <li>Verify your internet connection</li>
                  <li>Try a different browser</li>
                  <li>Clear browser cache and cookies</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
