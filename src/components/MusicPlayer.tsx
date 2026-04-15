/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent } from '@/components/ui/card';
import { DUMMY_TRACKS, Track } from '@/src/constants';
import { motion, AnimatePresence } from 'motion/react';

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = DUMMY_TRACKS[currentTrackIndex];

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const skipForward = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % DUMMY_TRACKS.length);
    setIsPlaying(true);
  };

  const skipBackward = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + DUMMY_TRACKS.length) % DUMMY_TRACKS.length);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (isPlaying && audioRef.current) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    }
  }, [currentTrackIndex]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      setProgress((current / duration) * 100 || 0);
    }
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      const newTime = (value[0] / 100) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setProgress(value[0]);
    }
  };

  return (
    <Card className="w-full max-w-md bg-black/40 backdrop-blur-xl border-white/10 overflow-hidden relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-br from-magenta-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition duration-500"></div>
      
      <CardContent className="p-6 relative">
        <audio
          ref={audioRef}
          src={currentTrack.url}
          onTimeUpdate={handleTimeUpdate}
          onEnded={skipForward}
        />

        <div className="flex items-center gap-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTrack.id}
              initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 1.1, rotate: 5 }}
              className="relative w-24 h-24 flex-shrink-0"
            >
              <div className="absolute inset-0 bg-cyan-500/20 blur-lg rounded-lg"></div>
              <img
                src={currentTrack.cover}
                alt={currentTrack.title}
                className="w-full h-full object-cover rounded-lg border border-white/10 relative z-10"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </AnimatePresence>

          <div className="flex-1 min-w-0">
            <h3 className="text-white font-bold text-lg truncate drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
              {currentTrack.title}
            </h3>
            <p className="text-cyan-400/80 text-sm font-mono tracking-wider">
              {currentTrack.artist}
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <Slider
            value={[progress]}
            max={100}
            step={0.1}
            onValueChange={handleSeek}
            className="cursor-pointer"
          />

          <div className="flex items-center justify-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={skipBackward}
              className="text-white/60 hover:text-cyan-400 hover:bg-white/5 transition-colors"
            >
              <SkipBack className="w-6 h-6" />
            </Button>

            <Button
              size="icon"
              onClick={togglePlay}
              className="w-14 h-14 rounded-full bg-white text-black hover:bg-cyan-400 hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 fill-current" />
              ) : (
                <Play className="w-6 h-6 fill-current ml-1" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={skipForward}
              className="text-white/60 hover:text-magenta-400 hover:bg-white/5 transition-colors"
            >
              <SkipForward className="w-6 h-6" />
            </Button>
          </div>

          <div className="flex items-center gap-3 px-2">
            <Volume2 className="w-4 h-4 text-white/40" />
            <Slider
              value={[volume * 100]}
              max={100}
              onValueChange={(v) => setVolume(v[0] / 100)}
              className="w-24"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
