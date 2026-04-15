/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';
import { motion } from 'motion/react';

export default function App() {
  const [score, setScore] = useState(0);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-cyan-500/30 overflow-hidden relative">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/10 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-magenta-500/10 blur-[120px] rounded-full animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_70%)]"></div>
      </div>

      <main className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col items-center justify-center gap-12">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2"
        >
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]">Neon</span>
            <span className="text-white">Snake</span>
          </h1>
          <p className="text-white/40 font-mono text-sm tracking-[0.3em] uppercase">Retro-Futuristic Arcade</p>
        </motion.div>

        {/* Game Area */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 w-full max-w-6xl">
          {/* Left Side: Stats/Info */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="hidden lg:flex flex-col gap-6 w-64"
          >
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <h2 className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-4">Current Score</h2>
              <div className="text-8xl font-black tabular-nums font-mono animate-glitch text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.7)]">{score}</div>
            </div>
            
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <h2 className="text-xs font-mono text-magenta-400 uppercase tracking-widest mb-4">Controls</h2>
              <ul className="space-y-2 text-sm text-white/60 font-medium">
                <li className="flex justify-between"><span>Move</span> <span className="text-white">Arrows</span></li>
                <li className="flex justify-between"><span>Pause</span> <span className="text-white">Space</span></li>
              </ul>
            </div>
          </motion.div>

          {/* Center: Game */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', damping: 20 }}
            className="relative"
          >
            <SnakeGame onScoreChange={setScore} />
            
            {/* Mobile Score Display */}
            <div className="lg:hidden mt-6 flex justify-between items-center px-4">
              <div className="text-4xl font-black font-mono animate-glitch">Score: {score}</div>
              <div className="text-xs font-mono text-white/40 uppercase">Arrows to move</div>
            </div>
          </motion.div>

          {/* Right Side: Music Player */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full max-w-md"
          >
            <MusicPlayer />
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="mt-auto pt-12 text-white/20 text-[10px] font-mono uppercase tracking-[0.5em]">
          Powered by AI Studio & Neon Vibes
        </footer>
      </main>
    </div>
  );
}
