import React, { useRef, useState, useEffect } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  FastForward,
  Rewind,
  Music,
  FileAudio
} from 'lucide-react';

interface AudioPlayerProps {
  audioSrc: string;
  filename: string;
  recordingRef: string;
  sectionNumber: number;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  audioSrc,
  filename,
  recordingRef,
  sectionNumber,
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isSeeking, setIsSeeking] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const handleTimeUpdate = () => {
      if (!isSeeking) {
        setCurrentTime(audio.currentTime || 0);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, [isSeeking]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play().catch((err) => {
        console.warn('Audio playback error:', err);
      });
    }
  };

  const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const targetTime = parseFloat(e.target.value);
    setCurrentTime(targetTime);
  };

  const handleSeekMouseDown = () => {
    setIsSeeking(true);
  };

  const handleSeekMouseUp = (e: React.MouseEvent<HTMLInputElement> | React.TouchEvent<HTMLInputElement>) => {
    setIsSeeking(false);
    const audio = audioRef.current;
    if (!audio) return;
    const targetVal = parseFloat((e.target as HTMLInputElement).value);
    audio.currentTime = targetVal;
    setCurrentTime(targetVal);
  };

  const skipTime = (seconds: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    const newTime = Math.min(Math.max(audio.currentTime + seconds, 0), duration || 9999);
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleReset = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    setCurrentTime(0);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (audioRef.current) {
      audioRef.current.volume = val;
      setIsMuted(val === 0);
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isMuted) {
      audio.volume = volume || 0.8;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const cyclePlaybackRate = () => {
    const rates = [1.0, 1.25, 0.75];
    const nextRateIndex = (rates.indexOf(playbackRate) + 1) % rates.length;
    const nextRate = rates[nextRateIndex];
    setPlaybackRate(nextRate);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextRate;
    }
  };

  const formatSeconds = (sec: number) => {
    if (isNaN(sec) || sec < 0) return '00:00';
    const mins = Math.floor(sec / 60);
    const remainingSecs = Math.floor(sec % 60);
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-md border-2 border-slate-800 relative overflow-hidden">
      {/* Hidden native HTML5 audio element */}
      <audio
        ref={audioRef}
        src={audioSrc}
        preload="metadata"
      />

      {/* Top Header Row: Recording File Name & Visual Badge */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#800000] text-white flex items-center justify-center shrink-0 shadow-xs">
            <FileAudio className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase font-bold tracking-widest text-[#fca5a5]">
                Section 0{sectionNumber} Recording
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-[11px] font-mono text-emerald-400 font-semibold flex items-center gap-1">
                <span className={`w-1.5 h-1.5 rounded-full ${isPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
                {isPlaying ? 'Playing Audio' : 'Audio Ready'}
              </span>
            </div>
            <div className="text-xs font-mono font-bold text-slate-200 flex items-center gap-2 mt-0.5">
              <span>File: <strong className="text-white">{filename}</strong></span>
              <span className="text-[10px] text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded font-mono">
                {recordingRef}
              </span>
            </div>
          </div>
        </div>

        {/* Animated Sound Bars when playing */}
        <div className="flex items-center gap-1 h-6 px-3 py-1 bg-slate-800/60 rounded-lg border border-slate-700/50">
          <div className={`w-1 bg-[#fca5a5] rounded-full transition-all ${isPlaying ? 'animate-wave-1' : 'h-1.5'}`} />
          <div className={`w-1 bg-[#fca5a5] rounded-full transition-all ${isPlaying ? 'animate-wave-2' : 'h-3'}`} />
          <div className={`w-1 bg-[#fca5a5] rounded-full transition-all ${isPlaying ? 'animate-wave-3' : 'h-2'}`} />
          <div className={`w-1 bg-[#fca5a5] rounded-full transition-all ${isPlaying ? 'animate-wave-4' : 'h-3.5'}`} />
          <div className={`w-1 bg-[#fca5a5] rounded-full transition-all ${isPlaying ? 'animate-wave-5' : 'h-2'}`} />
          <div className={`w-1 bg-[#fca5a5] rounded-full transition-all ${isPlaying ? 'animate-wave-6' : 'h-1.5'}`} />
        </div>
      </div>

      {/* Middle: Timeline Scrubber with Current Time & Total Duration */}
      <div className="pt-4 space-y-2">
        <div className="flex items-center justify-between text-xs font-mono font-semibold text-slate-300">
          <span className="bg-slate-800 px-2 py-0.5 rounded text-emerald-400">
            {formatSeconds(currentTime)}
          </span>
          <span className="text-slate-400">
            {formatSeconds(duration)}
          </span>
        </div>

        {/* Interactive Slider Timeline */}
        <div className="relative flex items-center group">
          <input
            type="range"
            min={0}
            max={duration || 100}
            step={0.1}
            value={currentTime}
            onChange={handleSeekChange}
            onMouseDown={handleSeekMouseDown}
            onMouseUp={handleSeekMouseUp}
            onTouchStart={handleSeekMouseDown}
            onTouchEnd={handleSeekMouseUp}
            aria-label={`Audio timeline scrubber for Section ${sectionNumber}`}
            className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#800000] focus:outline-hidden"
            style={{
              background: `linear-gradient(to right, #800000 ${progressPercent}%, #334155 ${progressPercent}%)`,
            }}
          />
        </div>
      </div>

      {/* Bottom Controls Row: Play, Pause, Rewind 10s, Forward 10s, Replay, Speed, Volume */}
      <div className="pt-4 flex flex-wrap items-center justify-between gap-3">
        {/* Playback action buttons */}
        <div className="flex items-center gap-2">
          {/* Main Play / Pause Button in Maroon Theme */}
          <button
            type="button"
            onClick={togglePlay}
            className="px-5 py-2.5 bg-[#800000] hover:bg-[#660000] active:scale-95 text-white rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-md hover:shadow-lg"
            title={isPlaying ? 'Pause Audio' : 'Play Audio'}
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 fill-white" />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-white" />
                <span>Play Recording</span>
              </>
            )}
          </button>

          {/* Jump Backward 10s */}
          <button
            type="button"
            onClick={() => skipTime(-10)}
            className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
            title="Rewind 10 Seconds"
          >
            <Rewind className="w-4 h-4" />
            <span className="text-[11px] font-mono font-bold">-10s</span>
          </button>

          {/* Jump Forward 10s */}
          <button
            type="button"
            onClick={() => skipTime(10)}
            className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
            title="Fast Forward 10 Seconds"
          >
            <span className="text-[11px] font-mono font-bold">+10s</span>
            <FastForward className="w-4 h-4" />
          </button>

          {/* Replay from Start */}
          <button
            type="button"
            onClick={handleReset}
            className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-xl transition-colors cursor-pointer"
            title="Replay from Beginning"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Speed & Volume Tools */}
        <div className="flex items-center gap-4 text-xs">
          {/* Speed Selector */}
          <button
            type="button"
            onClick={cyclePlaybackRate}
            className="bg-slate-800 hover:bg-slate-700 px-3 py-1.5 rounded-lg font-mono font-bold text-slate-200 hover:text-white border border-slate-700 cursor-pointer"
            title="Toggle playback speed (1x, 1.25x, 0.75x)"
          >
            {playbackRate}x Speed
          </button>

          {/* Volume Control */}
          <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1.5 rounded-lg border border-slate-700">
            <button
              type="button"
              onClick={toggleMute}
              className="text-slate-300 hover:text-white cursor-pointer"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted || volume === 0 ? (
                <VolumeX className="w-4 h-4 text-rose-400" />
              ) : (
                <Volume2 className="w-4 h-4 text-emerald-400" />
              )}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              aria-label="Volume slider"
              className="w-16 h-1.5 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-[#800000]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
