"use client";

import { useState } from 'react';
import { PlayCircle } from '@phosphor-icons/react';
import './YouTubeFacade.css';

interface YouTubeFacadeProps {
  videoId: string;
  title?: string;
}

export function YouTubeFacade({ videoId, title }: YouTubeFacadeProps) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="yt-facade yt-facade-playing">
        <iframe
          className="yt-facade-iframe"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={title}
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      className="yt-facade"
      aria-label={`Play video${title ? `: ${title}` : ''}`}
      onClick={() => setPlaying(true)}
    >
      <img
        src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
        alt=""
        className="yt-facade-thumb"
      />
      <PlayCircle size={56} weight="fill" className="yt-facade-play-icon" />
    </button>
  );
}
