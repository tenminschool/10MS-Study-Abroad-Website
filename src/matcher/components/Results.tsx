"use client";

import { useState } from 'react'
import { useApp } from '../app/providers'
import { CONFIG } from '../config'
import { destinationById } from '../engine/match'
import type {
  MatchOutput,
  MatchResult,
  Reason,
  StudentProfile,
  StudyLevel,
  Tier,
} from '../engine/types'
import { band, money, num } from '../lib/format'
import { Flag } from './Flag'

const MONEY_PARAMS = new Set(['typical', 'minimum', 'budget', 'upfront', 'tuition'])
const BAND_PARAMS = new Set(['score', 'required', 'band', 'target'])

/** Renders a reason code into the active language, formatting each param by type. */
export function useReasonText() {
  const { t, lang } = useApp()
  return (r: Reason): string => {
    const params: Record<string, string | number> = {}
    for (const [k, v] of Object.entries(r.params)) {
      if (MONEY_PARAMS.has(k) && typeof v === 'number') params[k] = money(v, lang)
      else if (k === 'rating') params[k] = t(`rating.${v}`).toLowerCase()
      else if (k === 'impact') params[k] = t(`impact.${v}`).toLowerCase()
      else if (k === 'skill') params[k] = t(`f.band.${v}`)
      else if (k === 'priority') params[k] = t(`opt.priority.${v}`).toLowerCase()
      else if (k === 'scale') params[k] = t(`scale.${v}`)
      else if ((k === 'have' || k === 'required') && r.code.startsWith('academic'))
        params[k] = num(v as number, lang, 2)
      else if (BAND_PARAMS.has(k) && typeof v === 'number' && r.code.startsWith('english'))
        params[k] = band(v, lang)
      else if (typeof v === 'number') params[k] = num(v, lang)
      else params[k] = v
    }
    return t(`reason.${r.code}`, params)
  }
}

const TIER_TONE: Record<Tier, 'good' | 'warn' | 'bad'> = {
  strong: 'good',
  possible: 'warn',
  unlikely: 'bad',
}

// The shared detail body: reasons, the facts grid and suggested
// universities. Rendered inside the big top verdict and, on demand,
// inside an expanded row.
function Detail({
  r,
  level,
  field,
  omitHeadline,
}: {
  r: MatchResult
  level: StudyLevel
  field: string
  omitHeadline?: boolean
}) {
  const { t, lang } = useApp()
  const reasonText = useReasonText()
  const d = destinationById(r.destinationId)
  if (!d) return null

  const blocks = r.reasons.filter((x) => x.kind === 'block')
  const rest = r.reasons.filter((x) => x.kind !== 'block').slice(0, 4)
  const shown = [...blocks, ...rest]
  const psw = d.postStudy.monthsByLevel[level]

  return (
    <>
      <div className="reasons">
        {shown.slice(omitHeadline ? 1 : 0).map((x, i) => (
          <div key={i} className={`reason reason-${x.kind}`}>
            <span className="reason-icon" aria-hidden="true">
              {x.kind === 'pro' ? '✓' : x.kind === 'con' ? '!' : '✕'}
            </span>
            <span>{reasonText(x)}</span>
          </div>
        ))}
      </div>

      <div className="facts">
        <div className="fact">
          <div className="k">{t('fact.tuition')}</div>
          <div className="v num">{money(r.cost.tuition.typical, lang)}</div>
        </div>
        <div className="fact">
          <div className="k">{t('fact.ielts')}</div>
          <div className="v num">
            {band(r.ieltsMin, lang)} · {band(r.ieltsNoBandBelow, lang)}
          </div>
        </div>
        <div className="fact">
          <div className="k">{t('fact.psw')}</div>
          <div className="v num">
            {psw > 0 ? t('fact.months', { n: num(psw, lang) }) : t('fact.none')}
          </div>
        </div>
        <div className="fact">
          <div className="k">{t('fact.pr')}</div>
          <div className="v">{t(`rating.${d.pr.rating}`)}</div>
        </div>
        <div className="fact">
          <div className="k">{t('fact.scholarship')}</div>
          <div className="v">{t(`rating.${d.scholarships.rating}`)}</div>
        </div>
      </div>

      {r.universities.length > 0 && (
        <div className="unis">
          <div className="label" style={{ marginBottom: 10 }}>
            {t('res.unis')}
          </div>
          <div className="uni-list">
            {r.universities.map((u) => (
              <div key={u.name} className="uni">
                <div className="uni-name">{u.name}</div>
                <div className="uni-meta">
                  {u.city} · {t(`uni.tier.${u.tier}`)} ·{' '}
                  {t('res.uni.tuition', { amount: money(u.tuitionBDT, lang) })}
                </div>
                {u.fieldMatch && (
                  <span className="uni-field">
                    {t('res.uni.strongIn', { field: t(`opt.field.${field}`) })}
                  </span>
                )}
              </div>
            ))}
          </div>
          <p className="uni-note">{t('res.unis.note')}</p>
        </div>
      )}
    </>
  )
}

// ------------------------------------------------------------
// One country: a clean uniform card. The header (flag, name,
// one-line reason, tier, score) is always shown; clicking it
// expands the full detail in the same card. No oversized box.
// ------------------------------------------------------------

function CountryCard({
  r,
  level,
  field,
  open,
  onToggle,
  picked,
  onPick,
  canPick,
}: {
  r: MatchResult
  level: StudyLevel
  field: string
  open: boolean
  onToggle: () => void
  picked: boolean
  onPick: (id: string) => void
  canPick: boolean
}) {
  const { t, lang } = useApp()
  const reasonText = useReasonText()
  const d = destinationById(r.destinationId)
  if (!d) return null

  const headline =
    r.reasons.find((x) => x.kind === 'block') ??
    r.reasons.find((x) => x.kind === 'pro') ??
    r.reasons[0]

  return (
    <article className={`ccard${open ? ' open' : ''}${r.tier === 'unlikely' ? ' dim' : ''}`}>
      <button type="button" className="cc-head" onClick={onToggle} aria-expanded={open}>
        <Flag emoji={d.flag} className="row-flag" />
        <span className="cc-main">
          <span className="row-name">{d.name[lang]}</span>
          {headline && <span className="row-why">{reasonText(headline)}</span>}
        </span>
        <span className={`tag tag-${TIER_TONE[r.tier]}`}>{t(`res.tier.${r.tier}`)}</span>
        <span className="row-score num">{num(r.score, lang)}</span>
        <span className={`cc-chev${open ? ' up' : ''}`} aria-hidden="true">
          ⌄
        </span>
      </button>

      {open && (
        <div className="cc-body">
          <Detail r={r} level={level} field={field} omitHeadline />
          <label className="pick" style={{ marginTop: 'var(--sam-sp-5)' }}>
            <input
              type="checkbox"
              checked={picked}
              disabled={!picked && !canPick}
              onChange={() => onPick(r.destinationId)}
            />
            <span>{t('res.pick')}</span>
          </label>
        </div>
      )}
    </article>
  )
}

export function Results({
  output,
  profile,
  level,
  picks,
  setPicks,
  onCompare,
  onRestart,
  saveError,
}: {
  output: MatchOutput
  profile: StudentProfile
  level: StudyLevel
  picks: string[]
  setPicks: (v: string[]) => void
  onCompare: () => void
  onRestart: () => void
  saveError: boolean
}) {
  const { t, lang } = useApp()

  const togglePick = (id: string) =>
    setPicks(picks.includes(id) ? picks.filter((x) => x !== id) : [...picks, id])

  // Every country starts as the same collapsed box; clicking one expands it
  // to the full detail. More than one can be open at a time.
  const [openIds, setOpenIds] = useState<string[]>([])
  const toggleOpen = (id: string) =>
    setOpenIds(openIds.includes(id) ? openIds.filter((x) => x !== id) : [...openIds, id])

  const fitCount = output.strong.length + output.possible.length

  const wa = `https://wa.me/${CONFIG.whatsappNumber}?text=${encodeURIComponent(
    CONFIG.whatsappMessage[lang],
  )}`

  return (
    <div className="stack stack-6">
      <div className="sec-head">
        <h1 className="h2">
          <span>{t('res.headline.checked', { n: num(output.results.length, lang) })}</span>{' '}
          <span className="heavy">{t('res.headline.fit', { n: num(fitCount, lang) })}</span>
        </h1>
        <p className="lede">
          {t('res.basedOn', {
            academic: output.academicIndex !== null ? num(output.academicIndex, lang) : '—',
            ielts:
              output.ieltsEquivalent !== null
                ? band(output.ieltsEquivalent, lang)
                : t('res.notTaken'),
            budget: profile.budgetBDT !== null ? money(profile.budgetBDT, lang) : '—',
          })}
        </p>
      </div>

      {saveError ? (
        <div className="notice notice-bad">{t('err.submit')}</div>
      ) : (
        <div className="notice notice-good">{t('notice.saved')}</div>
      )}

      <div className="ccards">
        {output.results.map((r) => (
          <CountryCard
            key={r.destinationId}
            r={r}
            level={level}
            field={profile.field}
            open={openIds.includes(r.destinationId)}
            onToggle={() => toggleOpen(r.destinationId)}
            picked={picks.includes(r.destinationId)}
            onPick={togglePick}
            canPick={picks.length < 4}
          />
        ))}
      </div>

      <div className="disclaimer">
        <strong>{t('res.disclaimerLead')}</strong> {t('res.disclaimer')}
      </div>

      <div className="card">
        <h3 className="h3" style={{ marginBottom: 10 }}>
          {t('res.nextSteps')}
        </h3>
        <p className="lede" style={{ marginBottom: 'var(--sam-sp-5)' }}>
          {t('res.nextSteps.body')}
        </p>
        <div className="cta-row">
          <a className="btn btn-brand btn-lg" href={wa} target="_blank" rel="noreferrer">
            {t('btn.whatsapp')}
            <span className="arrow">→</span>
          </a>
          <button className="btn btn-ghost" type="button" onClick={onRestart}>
            {t('btn.restart')}
          </button>
        </div>
      </div>

      {picks.length > 0 && (
        <div className="compare-bar">
          <span className="muted">{t('cmp.selected', { n: num(picks.length, lang) })}</span>
          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn btn-ghost" type="button" onClick={() => setPicks([])}>
              {t('btn.clearPicks')}
            </button>
            <button
              className="btn btn-primary"
              type="button"
              disabled={picks.length < 2}
              onClick={onCompare}
            >
              {t('btn.compare', { n: num(picks.length, lang) })}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
