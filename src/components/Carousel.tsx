"use client";

import React, { useEffect, useRef, useState } from 'react';

// Shared by every carousel on the site (country cards, testimonials, ...):
// slow auto-drift, drag-to-scroll, infinite loop, and eased arrow-button
// stepping. Extracted from the original country carousel so new sections can
// reuse the same drag/rAF math instead of re-deriving it.
const AUTO_SPEED_PX_PER_SEC = 26; // slow continuous drift
const DRAG_CLICK_THRESHOLD_PX = 6;
const EASE_RATE = 8; // higher = snappier arrow-step easing

export interface CarouselItemMeta {
  tabIndex: number;
  ariaHidden: boolean;
  priority: boolean;
}

interface CarouselProps<T> {
  items: T[];
  getKey: (item: T, index: number) => string;
  renderItem: (item: T, meta: CarouselItemMeta) => React.ReactNode;
  ariaLabel: string;
  prevLabel: string;
  nextLabel: string;
}

export default function Carousel<T>({ items, getKey, renderItem, ariaLabel, prevLabel, nextLabel }: CarouselProps<T>) {
  const n = items.length;
  const loopItems = [...items, ...items];

  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  const isPausedRef = useRef(false);
  const draggingRef = useRef(false);
  const hasDraggedRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartOffsetRef = useRef(0);
  const offsetRef = useRef(0);
  const targetOffsetRef = useRef<number | null>(null);
  const stepPxRef = useRef(0);
  const reducedMotionRef = useRef(false);
  const suppressNextClickRef = useRef(false);

  useEffect(() => {
    isPausedRef.current = hovered || focused;
  }, [hovered, focused]);

  // Measure a single card's rendered width (+ gap) so px math matches actual layout.
  useEffect(() => {
    const measure = () => {
      if (!firstCardRef.current || !trackRef.current) return;
      const cardRect = firstCardRef.current.getBoundingClientRect();
      const gap = parseFloat(getComputedStyle(trackRef.current).columnGap || '0') || 0;
      stepPxRef.current = cardRect.width + gap;
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (viewportRef.current) ro.observe(viewportRef.current);
    window.addEventListener('resize', measure);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [n]);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotionRef.current = mq.matches;
    const handler = (e: MediaQueryListEvent) => { reducedMotionRef.current = e.matches; };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Continuous rAF loop: auto-drift, arrow easing, and infinite seamless wrap.
  useEffect(() => {
    if (n === 0) return;
    let raf = 0;
    let last = performance.now();

    const tick = (time: number) => {
      const dt = Math.min((time - last) / 1000, 0.05);
      last = time;
      const step = stepPxRef.current;

      if (step > 0) {
        const singleSetWidth = step * n;

        if (targetOffsetRef.current !== null) {
          const diff = targetOffsetRef.current - offsetRef.current;
          if (Math.abs(diff) < 0.4) {
            offsetRef.current = targetOffsetRef.current;
            targetOffsetRef.current = null;
          } else {
            offsetRef.current += diff * Math.min(1, dt * EASE_RATE);
          }
        } else if (!isPausedRef.current && !draggingRef.current && !reducedMotionRef.current) {
          offsetRef.current += AUTO_SPEED_PX_PER_SEC * dt;
        }

        if (offsetRef.current >= singleSetWidth) {
          offsetRef.current -= singleSetWidth;
          if (targetOffsetRef.current !== null) targetOffsetRef.current -= singleSetWidth;
        } else if (offsetRef.current < 0) {
          offsetRef.current += singleSetWidth;
          if (targetOffsetRef.current !== null) targetOffsetRef.current += singleSetWidth;
        }

        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(${-offsetRef.current}px,0,0)`;
        }

        const idx = (Math.round(offsetRef.current / step) % n + n) % n;
        setActiveIndex((prev) => (prev === idx ? prev : idx));
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [n]);

  const stepBy = (dir: 1 | -1) => {
    const step = stepPxRef.current;
    if (!step) return;
    const base = targetOffsetRef.current ?? offsetRef.current;
    targetOffsetRef.current = base + dir * step;
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    // Don't hijack pointer capture when starting on a link/button — capturing
    // it here retargets the click away from the anchor and silently eats
    // its navigation, even for a plain tap with no drag movement.
    if ((e.target as HTMLElement).closest('a, button')) return;
    draggingRef.current = true;
    hasDraggedRef.current = false;
    dragStartXRef.current = e.clientX;
    dragStartOffsetRef.current = offsetRef.current;
    targetOffsetRef.current = null;
    trackRef.current?.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!draggingRef.current) return;
    const dx = e.clientX - dragStartXRef.current;
    if (!hasDraggedRef.current && Math.abs(dx) > DRAG_CLICK_THRESHOLD_PX) {
      hasDraggedRef.current = true;
    }
    if (hasDraggedRef.current) {
      offsetRef.current = dragStartOffsetRef.current - dx;
    }
  };

  const endDrag = () => {
    if (!draggingRef.current) return;
    draggingRef.current = false;
    if (hasDraggedRef.current) {
      const step = stepPxRef.current;
      if (step) targetOffsetRef.current = Math.round(offsetRef.current / step) * step;
      suppressNextClickRef.current = true;
    }
    hasDraggedRef.current = false;
  };

  const onCaptureClick = (e: React.MouseEvent) => {
    if (suppressNextClickRef.current) {
      suppressNextClickRef.current = false;
      e.preventDefault();
      e.stopPropagation();
    }
  };

  if (n === 0) return null;

  return (
    <div className="cs-carousel-container">
      <div
        className="cs-viewport"
        ref={viewportRef}
        role="region"
        aria-label={ariaLabel}
        aria-roledescription="carousel"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => setFocused(true)}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocused(false);
        }}
      >
        <div
          className="cs-track"
          ref={trackRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onClickCapture={onCaptureClick}
        >
          {loopItems.map((item, i) => (
            <div
              className="cs-card-slot"
              key={`${getKey(item, i % n)}-${i}`}
              ref={i === 0 ? firstCardRef : undefined}
            >
              {renderItem(item, { tabIndex: i < n ? 0 : -1, ariaHidden: i >= n, priority: i === 0 })}
            </div>
          ))}
        </div>
      </div>

      <div className="carousel-controls-row">
        <button
          className="carousel-arrow-btn"
          onClick={() => stepBy(-1)}
          aria-label={prevLabel}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
        </button>

        <div className="carousel-progress-wrapper">
          <div
            className="carousel-progress-bar"
            style={{ width: `${((activeIndex + 1) / n) * 100}%` }}
          />
        </div>

        <button
          className="carousel-arrow-btn"
          onClick={() => stepBy(1)}
          aria-label={nextLabel}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
        </button>
      </div>
    </div>
  );
}
