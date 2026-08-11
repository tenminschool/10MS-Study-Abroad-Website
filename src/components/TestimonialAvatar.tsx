'use client';

import { useState } from 'react';
import { resolveDriveImageUrl } from '../lib/driveImage';

export function TestimonialAvatar({ name, avatar }: { name: string; avatar?: string }) {
  const [broken, setBroken] = useState(false);
  const initials = name
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  if (!avatar || broken) {
    return <div className="test-avatar-circle">{initials}</div>;
  }
  return (
    <img
      src={resolveDriveImageUrl(avatar)}
      alt={name}
      className="test-avatar-img"
      onError={() => setBroken(true)}
    />
  );
}
