'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Mic, Video, Square, Play, Pause, Download, Share2, Trash2 } from 'lucide-react';
import { RecordingState, EncounterRecord } from '@/lib/types';
import { formatDuration, generateId } from '@/lib/utils';

interface RecordingInterfaceProps {
  onRecordingComplete?: (record: EncounterRecord) => void;
  language: 'en' | 'es';
}

export function RecordingInterface({ onRecordingComplete, language }: RecordingInterfaceProps) {
  const [recordingState, setRecordingState] = useState<RecordingState>({
    isRecording: false,
    recordingType: null,
    duration: 0
  });
  const [recordings, setRecordings] = useState<EncounterRecord[]>([]);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordedBlob, setRecordedBlob] = useState<Blob | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const startRecording = async (type: 'audio' | 'video') => {
    try {
      const constraints = type === 'video' 
        ? { video: true, audio: true }
        : { audio: true };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const recorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data);
        }
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { 
          type: type === 'video' ? 'video/webm' : 'audio/webm' 
        });
        setRecordedBlob(blob);
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };

      recorder.start();
      setMediaRecorder(recorder);
      setRecordingState({
        isRecording: true,
        recordingType: type,
        duration: 0
      });

      // Start duration timer
      intervalRef.current = setInterval(() => {
        setRecordingState(prev => ({
          ...prev,
          duration: prev.duration + 1
        }));
      }, 1000);

    } catch (error) {
      console.error('Error starting recording:', error);
      alert(language === 'en' 
        ? 'Unable to access camera/microphone. Please check permissions.'
        : 'No se puede acceder a la cámara/micrófono. Verifique los permisos.'
      );
    }
  };

  const stopRecording = () => {
    if (mediaRecorder && recordingState.isRecording) {
      mediaRecorder.stop();
      setRecordingState(prev => ({
        ...prev,
        isRecording: false
      }));

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }
  };

  const saveRecording = () => {
    if (!recordedBlob) return;

    const record: EncounterRecord = {
      recordId: generateId(),
      userId: 'current-user', // This would come from auth context
      timestamp: new Date(),
      notes: '',
      sharedTo: [],
      ...(recordingState.recordingType === 'video' 
        ? { videoUrl: URL.createObjectURL(recordedBlob) }
        : { audioUrl: URL.createObjectURL(recordedBlob) }
      )
    };

    setRecordings(prev => [...prev, record]);
    onRecordingComplete?.(record);
    setRecordedBlob(null);
    setRecordingState({
      isRecording: false,
      recordingType: null,
      duration: 0
    });
  };

  const downloadRecording = (record: EncounterRecord) => {
    const url = record.audioUrl || record.videoUrl;
    if (!url) return;

    const a = document.createElement('a');
    a.href = url;
    a.download = `recording-${record.recordId}.${record.videoUrl ? 'webm' : 'wav'}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const shareRecording = (record: EncounterRecord) => {
    const url = record.audioUrl || record.videoUrl;
    if (!url) return;

    if (navigator.share) {
      navigator.share({
        title: 'KnowYourRights Recording',
        text: `Recording from ${record.timestamp.toLocaleString()}`,
        url: url
      }).catch(console.error);
    } else {
      // Fallback - copy URL to clipboard
      navigator.clipboard.writeText(url).then(() => {
        alert(language === 'en' 
          ? 'Recording URL copied to clipboard!'
          : '¡URL de grabación copiada al portapapeles!'
        );
      });
    }
  };

  const deleteRecording = (recordId: string) => {
    setRecordings(prev => prev.filter(r => r.recordId !== recordId));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h2 className="text-2xl font-bold text-white mb-2">
          {language === 'en' ? 'Quick Record' : 'Grabación Rápida'}
        </h2>
        <p className="text-gray-300">
          {language === 'en' 
            ? 'Document your encounter safely and securely'
            : 'Documente su encuentro de manera segura'
          }
        </p>
      </motion.div>

      {/* Recording Controls */}
      <div className="glass-card p-6 rounded-lg">
        {!recordingState.isRecording && !recordedBlob ? (
          <div className="text-center space-y-4">
            <p className="text-gray-300 mb-6">
              {language === 'en' 
                ? 'Choose recording type to start documenting'
                : 'Elija el tipo de grabación para comenzar a documentar'
              }
            </p>
            
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => startRecording('audio')}
                className="flex flex-col items-center space-y-2 p-6 glass-surface rounded-lg hover:bg-opacity-20 transition-all duration-200"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                  <Mic className="w-8 h-8 text-white" />
                </div>
                <span className="font-medium">
                  {language === 'en' ? 'Audio Only' : 'Solo Audio'}
                </span>
              </button>

              <button
                onClick={() => startRecording('video')}
                className="flex flex-col items-center space-y-2 p-6 glass-surface rounded-lg hover:bg-opacity-20 transition-all duration-200"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center">
                  <Video className="w-8 h-8 text-white" />
                </div>
                <span className="font-medium">
                  {language === 'en' ? 'Video + Audio' : 'Video + Audio'}
                </span>
              </button>
            </div>
          </div>
        ) : recordingState.isRecording ? (
          <div className="text-center space-y-4">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-24 h-24 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto"
            >
              {recordingState.recordingType === 'video' ? (
                <Video className="w-12 h-12 text-white" />
              ) : (
                <Mic className="w-12 h-12 text-white" />
              )}
            </motion.div>
            
            <div>
              <p className="text-white font-semibold text-lg">
                {language === 'en' ? 'Recording...' : 'Grabando...'}
              </p>
              <p className="text-gray-300">
                {formatDuration(recordingState.duration)}
              </p>
            </div>

            <button
              onClick={stopRecording}
              className="btn-primary flex items-center space-x-2"
            >
              <Square className="w-4 h-4" />
              <span>{language === 'en' ? 'Stop Recording' : 'Detener Grabación'}</span>
            </button>
          </div>
        ) : recordedBlob ? (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
              <Play className="w-8 h-8 text-white" />
            </div>
            
            <p className="text-white font-semibold">
              {language === 'en' ? 'Recording Complete!' : '¡Grabación Completa!'}
            </p>
            
            <div className="flex justify-center space-x-3">
              <button
                onClick={saveRecording}
                className="btn-primary"
              >
                {language === 'en' ? 'Save Recording' : 'Guardar Grabación'}
              </button>
              
              <button
                onClick={() => {
                  setRecordedBlob(null);
                  setRecordingState({
                    isRecording: false,
                    recordingType: null,
                    duration: 0
                  });
                }}
                className="btn-outline"
              >
                {language === 'en' ? 'Discard' : 'Descartar'}
              </button>
            </div>
          </div>
        ) : null}
      </div>

      {/* Saved Recordings */}
      {recordings.length > 0 && (
        <div className="glass-card p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-white mb-4">
            {language === 'en' ? 'Saved Recordings' : 'Grabaciones Guardadas'}
          </h3>
          
          <div className="space-y-3">
            {recordings.map((record) => (
              <motion.div
                key={record.recordId}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between p-4 glass-surface rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                    {record.videoUrl ? (
                      <Video className="w-5 h-5 text-white" />
                    ) : (
                      <Mic className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div>
                    <p className="text-white font-medium">
                      {record.videoUrl 
                        ? (language === 'en' ? 'Video Recording' : 'Grabación de Video')
                        : (language === 'en' ? 'Audio Recording' : 'Grabación de Audio')
                      }
                    </p>
                    <p className="text-gray-400 text-sm">
                      {record.timestamp.toLocaleString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => downloadRecording(record)}
                    className="p-2 glass-surface rounded-lg hover:bg-opacity-20 transition-all duration-200"
                  >
                    <Download className="w-4 h-4 text-gray-300" />
                  </button>
                  
                  <button
                    onClick={() => shareRecording(record)}
                    className="p-2 glass-surface rounded-lg hover:bg-opacity-20 transition-all duration-200"
                  >
                    <Share2 className="w-4 h-4 text-gray-300" />
                  </button>
                  
                  <button
                    onClick={() => deleteRecording(record.recordId)}
                    className="p-2 glass-surface rounded-lg hover:bg-opacity-20 transition-all duration-200 text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
