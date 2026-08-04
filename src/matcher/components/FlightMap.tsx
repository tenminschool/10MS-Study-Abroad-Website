"use client";

import { useEffect, useRef, useState } from 'react'
import { useApp } from '../app/providers'
import { DESTINATIONS } from '../engine/match'
import { Flag } from './Flag'

// ============================================================
// Hero graphic: routes out of Dhaka to the seven destinations.
//
// Pure SVG, no image requests — it loads instantly on mobile data
// and can never look like stock photography. Node positions are
// hand-placed for composition rather than geography; the list of
// countries comes from the real rules data, so adding a destination
// only means adding a coordinate here.
// ============================================================

const ORIGIN = { x: 110, y: 306 }

// SVG <text> can't render flag-icons' background-image spans, so flags are
// drawn via a small foreignObject instead — sized to match the old fm-flag
// text glyph's footprint.
const FLAG_W = 26
const FLAG_H = 20

// One coherent fan: every route bows the same way, curvature grows gently
// with distance, and no arc loops back across another. `labelAbove` keeps
// names clear of the incoming route on the upper row.
const LAYOUT: Record<string, { x: number; y: number; curve: number; labelAbove?: boolean }> = {
  malaysia: { x: 318, y: 252, curve: -0.08 },
  australia: { x: 462, y: 318, curve: -0.06 },
  new_zealand: { x: 612, y: 282, curve: -0.09 },
  malta: { x: 540, y: 142, curve: -0.1, labelAbove: true },
  uk: { x: 736, y: 94, curve: -0.1, labelAbove: true },
  canada: { x: 906, y: 130, curve: -0.11, labelAbove: true },
  usa: { x: 1054, y: 218, curve: -0.13 },
}

/** Quadratic arc from origin, bowed by `curve` perpendicular to the chord. */
function arc(to: { x: number; y: number; curve: number }) {
  const mx = (ORIGIN.x + to.x) / 2
  const my = (ORIGIN.y + to.y) / 2
  const dx = to.x - ORIGIN.x
  const dy = to.y - ORIGIN.y
  const cx = mx - dy * to.curve
  const cy = my + dx * to.curve
  return `M ${ORIGIN.x} ${ORIGIN.y} Q ${cx} ${cy} ${to.x} ${to.y}`
}

const FLIGHT_MS = 5200

export function FlightMap() {
  const { lang, t } = useApp()

  const nodes = DESTINATIONS.map((d) => ({ d, pos: LAYOUT[d.id] })).filter((n) => n.pos)

  // The plane visits every destination in turn. Driven by requestAnimationFrame
  // rather than SMIL so it can never stall: the moment one flight lands, the
  // next one departs from Dhaka.
  const [liveIdx, setLiveIdx] = useState(0)
  const planeRef = useRef<SVGGElement>(null)
  const liveId = nodes[liveIdx]?.d.id ?? 'uk'

  useEffect(() => {
    const to = LAYOUT[liveId]
    const plane = planeRef.current
    if (!to || !plane) return

    // Same control point the route path uses, so the plane rides the line.
    const mx = (ORIGIN.x + to.x) / 2
    const my = (ORIGIN.y + to.y) / 2
    const dx = to.x - ORIGIN.x
    const dy = to.y - ORIGIN.y
    const cx = mx - dy * to.curve
    const cy = my + dx * to.curve

    const ease = (u: number) => (u < 0.5 ? 2 * u * u : 1 - (-2 * u + 2) ** 2 / 2)

    let raf = 0
    let start: number | null = null
    const tick = (ts: number) => {
      if (start === null) start = ts
      const u = Math.min(1, (ts - start) / FLIGHT_MS)
      const t2 = ease(u)
      const omt = 1 - t2
      const x = omt * omt * ORIGIN.x + 2 * omt * t2 * cx + t2 * t2 * to.x
      const y = omt * omt * ORIGIN.y + 2 * omt * t2 * cy + t2 * t2 * to.y
      const vx = 2 * omt * (cx - ORIGIN.x) + 2 * t2 * (to.x - cx)
      const vy = 2 * omt * (cy - ORIGIN.y) + 2 * t2 * (to.y - cy)
      const angle = (Math.atan2(vy, vx) * 180) / Math.PI + 90
      plane.setAttribute('transform', `translate(${x} ${y}) rotate(${angle})`)
      if (u < 1) raf = requestAnimationFrame(tick)
      else setLiveIdx((i) => (i + 1) % nodes.length)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [liveId, nodes.length])

  return (
    <svg
      className="flightmap"
      viewBox="0 0 1160 400"
      role="img"
      aria-label={t('hero.mapAlt')}
      preserveAspectRatio="xMidYMid meet"
    >
      <path className="fm-arc" d="M -40 372 Q 580 232 1200 372" />

      {nodes.map(({ d, pos }) => (
        <path
          key={`p-${d.id}`}
          className={`fm-path${d.id === liveId ? ' fm-path-live' : ''}`}
          d={arc(pos)}
        />
      ))}

      {/* Origin: Bangladesh, drawn like the destination nodes with a pulsing
          home ring. */}
      <circle className="fm-origin-ring" cx={ORIGIN.x} cy={ORIGIN.y} r="20" />
      <circle className="fm-node fm-node-live" cx={ORIGIN.x} cy={ORIGIN.y} r="20" />
      <foreignObject x={ORIGIN.x - FLAG_W / 2} y={ORIGIN.y - FLAG_H / 2} width={FLAG_W} height={FLAG_H}>
        <div className="fm-flag-wrap">
          <Flag emoji="🇧🇩" className="fm-flag-icon" />
        </div>
      </foreignObject>
      <text className="fm-name" x={ORIGIN.x} y={ORIGIN.y + 36}>
        {lang === 'bn' ? 'বাংলাদেশ' : 'Bangladesh'}
      </text>

      {nodes.map(({ d, pos }) => (
        <g key={d.id}>
          <circle
            className={`fm-node${d.id === liveId ? ' fm-node-live' : ''}`}
            cx={pos.x}
            cy={pos.y}
            r="20"
          />
          <foreignObject x={pos.x - FLAG_W / 2} y={pos.y - FLAG_H / 2} width={FLAG_W} height={FLAG_H}>
            <div className="fm-flag-wrap">
              <Flag emoji={d.flag} className="fm-flag-icon" />
            </div>
          </foreignObject>
          <text
            className="fm-name"
            x={pos.x}
            y={pos.labelAbove ? pos.y - 30 : pos.y + 36}
          >
            {d.name[lang]}
          </text>
        </g>
      ))}

      <g className="fm-plane" ref={planeRef} transform={`translate(${ORIGIN.x} ${ORIGIN.y})`}>
        <path d="M 0 -7 L 8 6 L 0 2 L -8 6 Z" />
      </g>
    </svg>
  )
}
