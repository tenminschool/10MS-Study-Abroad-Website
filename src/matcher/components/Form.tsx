"use client";

import { useState } from 'react'
import { useApp } from '../app/providers'
import { DESTINATIONS } from '../engine/match'
import type {
  EnglishTest,
  FundingSource,
  IntakeHorizon,
  Priority,
  ResultSystem,
  StudentProfile,
  StudyLevel,
} from '../engine/types'
import { ChipGroup, Field, Select, Toggle } from './ui'
import { Flag } from './Flag'

export const TOTAL_STEPS = 5

export const emptyProfile: StudentProfile = {
  name: '',
  phone: '',
  whatsapp: '',
  email: '',
  consent: false,
  level: null,
  field: '',
  intake: null,
  intakeChoice: '',
  ssc: { system: 'gpa5', value: null, year: null },
  hsc: { system: 'gpa5', value: null, year: null },
  undergrad: { system: 'cgpa4', value: null, year: null },
  backlogs: 0,
  englishTest: null,
  englishPredicted: false,
  englishOverall: null,
  bandListening: null,
  bandReading: null,
  bandWriting: null,
  bandSpeaking: null,
  currentStatus: '',
  gapYears: 0,
  gapReason: '',
  visaRefusal: false,
  refusalDetails: '',
  passportStatus: '',
  budgetBDT: null,
  funding: null,
  priorities: [],
  preferredCountries: [],
  notes: '',
}

/** The highest valid value for each grading scale, so a GPA can't be typed as 6. */
function systemMax(system: ResultSystem): number {
  switch (system) {
    case 'cgpa4':
      return 4
    case 'percent':
      return 100
    default:
      return 5 // gpa5, cgpa5
  }
}

/** The highest valid overall score for each English test, so IELTS can't exceed 9. */
function englishMax(test: EnglishTest | null): number {
  switch (test) {
    case 'pte':
      return 90
    case 'toefl':
      return 120
    case 'duolingo':
      return 160
    default:
      return 9 // ielts, ielts_ukvi (and predicted, which is IELTS)
  }
}

const clampNum = (v: number, max: number) => Math.min(max, Math.max(0, v))

/** Accepts 01XXXXXXXXX and +8801XXXXXXXXX forms, with spaces or dashes. */
export function isBdPhone(v: string): boolean {
  const d = v.replace(/\D/g, '')
  return /^01[3-9]\d{8}$/.test(d) || /^8801[3-9]\d{8}$/.test(d)
}

/** Basic email shape check. Email is optional, so this only runs when non-empty. */
export function isEmail(v: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())
}

const GRADE_VALUES = [95, 88, 80, 73, 66, 58, 50, 42]
// 5-lakh steps. Each option stores the TOP of its range, so the engine reads
// the student's budget generously and shows more options rather than fewer.
const BUDGET_VALUES = [500000, 1000000, 1500000, 2000000, 2500000, 3000000, 3500000, 4000000, 6000000]
const FIELDS = ['business', 'engineering', 'cs', 'health', 'arts', 'law', 'science', 'social', 'other']
const GAP_REASONS = ['job', 'retake', 'family', 'health', 'other']

// The three big intake windows: January, July and September. The question
// shows the next three concrete dates that are still realistically reachable
// (at least 5 months out, since applications need lead time). The engine
// still thinks in time horizons, so each choice carries the horizon it implies.
const INTAKE_MONTHS = [0, 6, 8] // January, July, September
const MIN_LEAD_MONTHS = 5

export function nextIntakes(now = new Date()): { label: string; horizon: IntakeHorizon }[] {
  const out: { label: string; horizon: IntakeHorizon }[] = []
  const names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  let y = now.getFullYear()
  while (out.length < 3) {
    for (const im of INTAKE_MONTHS) {
      if (out.length >= 3) break
      const monthsAway = (y - now.getFullYear()) * 12 + (im - now.getMonth())
      if (monthsAway < MIN_LEAD_MONTHS) continue
      out.push({
        label: `${names[im]} ${y}`,
        horizon: monthsAway <= 6 ? 'within_6m' : monthsAway <= 12 ? '6_to_12m' : 'beyond_12m',
      })
    }
    y++
  }
  return out
}
const FUNDINGS: FundingSource[] = ['self', 'parents']
const PRIORITIES: Priority[] = [
  'lowest_cost',
  'fast_processing',
  'post_study_work',
  'pr_pathway',
  'ranking',
  'scholarship',
]


// Contact now comes LAST, so the form only asks for name and phone once a
// student has already invested effort — higher-intent leads, less drop-off.
// The step number still drives the progress bar; STEP_ORDER maps it to content.
const STEP_ORDER = ['goal', 'academics', 'english', 'situation', 'contact'] as const
type StepKey = (typeof STEP_ORDER)[number]

// Each content block keeps its original title string; this maps the new
// position to the existing copy so nothing has to be renumbered in i18n.
const TITLE_KEY: Record<StepKey, string> = {
  goal: 'step.2',
  academics: 'step.3',
  english: 'step.4',
  situation: 'step.5',
  contact: 'step.1',
}

export function Form({
  profile,
  setProfile,
  step,
  setStep,
  onSubmit,
  submitting,
  onHome,
}: {
  profile: StudentProfile
  setProfile: (p: StudentProfile) => void
  step: number
  setStep: (n: number) => void
  onSubmit: () => void
  submitting: boolean
  onHome: () => void
}) {
  const { t, lang } = useApp()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const stepKey: StepKey = STEP_ORDER[step - 1] ?? 'goal'
  const [englishTaken, setTaken] = useState<boolean | null>(
    profile.englishTest === null
      ? null
      : profile.englishTest === 'none' || profile.englishTest === 'moi' || profile.englishPredicted
        ? false
        : true,
  )

  const isPostgrad = profile.level === 'masters' || profile.level === 'phd'
  const intakes = nextIntakes()

  const set = <K extends keyof StudentProfile>(k: K, v: StudentProfile[K]) =>
    setProfile({ ...profile, [k]: v })

  const opts = (prefix: string, values: readonly string[]) =>
    values.map((v) => ({ value: v, label: t(`${prefix}.${v}`) }))

  function validate(): boolean {
    const e: Record<string, string> = {}
    if (stepKey === 'contact') {
      if (!profile.name.trim()) e.name = t('err.required')
      if (!isBdPhone(profile.phone)) e.phone = t('err.phone')
      if (profile.email.trim() && !isEmail(profile.email)) e.email = t('err.email')
      if (!profile.consent) e.consent = t('err.consent')
    }
    if (stepKey === 'goal' && !profile.level) e.level = t('err.level')
    if (stepKey === 'english' && (englishTaken === null || (englishTaken && !profile.englishTest)))
      e.englishTest = t('err.english')
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function next() {
    if (!validate()) return
    if (step === TOTAL_STEPS) onSubmit()
    else setStep(step + 1)
  }

  const isIelts = profile.englishTest === 'ielts' || profile.englishTest === 'ielts_ukvi'
  const hasScore =
    profile.englishTest !== null && profile.englishTest !== 'none' && profile.englishTest !== 'moi'

  return (
    <div className="card">
      <div className="progress">
        <div className="progress-meta">
          <span>{t('step.progress', { n: step, total: TOTAL_STEPS })}</span>
          <span>{Math.round((step / TOTAL_STEPS) * 100)}%</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${(step / TOTAL_STEPS) * 100}%` }} />
        </div>
      </div>

      <div className="step-head">
        <h2 className="h2">
          <span className="heavy">{t(`${TITLE_KEY[stepKey]}.title`)}</span>
        </h2>
        <p className="lede">{t(`${TITLE_KEY[stepKey]}.sub`)}</p>
      </div>

      {/* ---------------- Contact (last step) ---------------- */}
      {stepKey === 'contact' && (
        <div className="stack stack-4">
          <Field label={t('f.name')} required error={errors.name}>
            <input
              className="input"
              value={profile.name}
              autoComplete="name"
              onChange={(e) => set('name', e.target.value)}
            />
          </Field>

          <div className="grid grid-2">
            <Field label={t('f.phone')} required hint={t('f.phone.hint')} error={errors.phone}>
              <input
                className="input"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                value={profile.phone}
                aria-invalid={!!errors.phone}
                onChange={(e) => set('phone', e.target.value)}
              />
            </Field>
            <Field label={t('f.email')} error={errors.email}>
              <input
                className="input"
                type="email"
                autoComplete="email"
                value={profile.email}
                aria-invalid={!!errors.email}
                onChange={(e) => set('email', e.target.value)}
              />
            </Field>
          </div>

          <label className="checkbox">
            <input
              type="checkbox"
              checked={profile.whatsapp === profile.phone && profile.phone !== ''}
              onChange={(e) => set('whatsapp', e.target.checked ? profile.phone : '')}
            />
            <span>{t('f.whatsappSame')}</span>
          </label>

          {profile.whatsapp !== profile.phone && (
            <Field label={t('f.whatsapp')}>
              <input
                className="input"
                type="tel"
                inputMode="numeric"
                value={profile.whatsapp}
                onChange={(e) => set('whatsapp', e.target.value)}
              />
            </Field>
          )}

          <label className="checkbox">
            <input
              type="checkbox"
              checked={profile.consent}
              onChange={(e) => set('consent', e.target.checked)}
            />
            <span>{t('f.consent')}</span>
          </label>
          {errors.consent && <span className="err">{errors.consent}</span>}
        </div>
      )}

      {/* ---------------- Goal ---------------- */}
      {stepKey === 'goal' && (
        <div className="stack stack-4">
          <Field label={t('f.level')} required error={errors.level}>
            <Select<StudyLevel>
              value={profile.level}
              onChange={(v) => set('level', v)}
              placeholder={t('opt.choose')}
              options={opts('opt.level', ['diploma', 'bachelors', 'masters']) as {
                value: StudyLevel
                label: string
              }[]}
            />
          </Field>

          <Field label={t('f.field')}>
            <Select
              value={profile.field || null}
              onChange={(v) => set('field', v)}
              placeholder={t('opt.choose')}
              options={opts('opt.field', FIELDS)}
            />
          </Field>

          <Field label={t('f.intake')}>
            <Select
              value={profile.intakeChoice || (profile.intake === 'undecided' ? 'undecided' : null)}
              onChange={(v) => {
                if (v === 'undecided') {
                  setProfile({ ...profile, intake: 'undecided', intakeChoice: '' })
                } else {
                  const found = intakes.find((i) => i.label === v)
                  setProfile({
                    ...profile,
                    intake: found?.horizon ?? null,
                    intakeChoice: v,
                  })
                }
              }}
              placeholder={t('opt.choose')}
              options={[
                ...intakes.map((i) => ({ value: i.label, label: i.label })),
                { value: 'undecided', label: t('opt.intake.undecided') },
              ]}
            />
          </Field>
        </div>
      )}

      {/* ---------------- Academics ---------------- */}
      {/* Only the qualifications the engine actually reads for the chosen level:
          SSC + HSC for diploma/bachelor's, HSC + undergrad for master's/PhD. */}
      {stepKey === 'academics' && (
        <div className="stack stack-4">
          {(isPostgrad ? (['ssc', 'hsc', 'undergrad'] as const) : (['ssc', 'hsc'] as const)).map(
            (stage) => {
              const entry = profile[stage]
              const systems: ResultSystem[] =
                stage === 'undergrad' ? ['cgpa4', 'cgpa5', 'percent'] : ['gpa5', 'grades', 'percent']
              return (
                <div className="subsection" key={stage}>
                  <div className="subsection-title label">
                    {t(stage === 'undergrad' ? 'f.ug' : `f.${stage}`)}
                  </div>
                  <div className="grid grid-2">
                    <Field label={t('f.system')}>
                      <Select<ResultSystem>
                        value={entry.system}
                        onChange={(v) => set(stage, { ...entry, system: v, value: null })}
                        options={
                          opts('opt.system', systems) as { value: ResultSystem; label: string }[]
                        }
                      />
                    </Field>
                    <Field label={t('f.value')}>
                      {entry.system === 'grades' ? (
                        <Select
                          value={entry.value !== null ? String(entry.value) : null}
                          onChange={(v) => set(stage, { ...entry, value: Number(v) })}
                          placeholder="—"
                          options={GRADE_VALUES.map((g) => ({
                            value: String(g),
                            label: t(`opt.grades.${g}`),
                          }))}
                        />
                      ) : (
                        <input
                          className="input"
                          type="number"
                          step="0.01"
                          min={0}
                          max={systemMax(entry.system)}
                          inputMode="decimal"
                          value={entry.value ?? ''}
                          placeholder={
                            entry.system === 'percent' ? '75' : entry.system === 'cgpa4' ? '3.20' : '4.50'
                          }
                          onChange={(e) => {
                            if (e.target.value === '') {
                              set(stage, { ...entry, value: null })
                              return
                            }
                            // Keep the result inside its scale: a GPA can't be 6.
                            const max = systemMax(entry.system)
                            const v = Math.min(max, Math.max(0, Number(e.target.value)))
                            set(stage, { ...entry, value: v })
                          }}
                        />
                      )}
                    </Field>
                  </div>
                </div>
              )
            },
          )}

        </div>
      )}

      {/* ---------------- English ---------------- */}
      {/* First: have they actually sat a test? A real certificate takes real
          scores; no certificate takes a predicted score, clearly labelled. */}
      {stepKey === 'english' && (
        <div className="stack stack-4">
          <Field label={t('f.englishTaken')} required error={errors.englishTest}>
            <div className="seg">
              <button
                type="button"
                aria-pressed={englishTaken === true}
                onClick={() => {
                  if (englishTaken !== true) {
                    setProfile({
                      ...profile,
                      englishTest: null,
                      englishPredicted: false,
                      englishOverall: null,
                      bandListening: null,
                      bandReading: null,
                      bandWriting: null,
                      bandSpeaking: null,
                    })
                  }
                  setTaken(true)
                }}
              >
                {t('opt.yes')}
              </button>
              <button
                type="button"
                aria-pressed={englishTaken === false}
                onClick={() => {
                  setProfile({ ...profile, englishTest: 'none', englishPredicted: false, englishOverall: null, bandListening: null, bandReading: null, bandWriting: null, bandSpeaking: null })
                  setTaken(false)
                }}
              >
                {t('opt.no')}
              </button>
            </div>
          </Field>

          {englishTaken === true && (
            <Field label={t('f.englishTest')} required>
              <Select<EnglishTest>
                value={profile.englishTest}
                onChange={(v) => set('englishTest', v)}
                placeholder={t('opt.choose')}
                options={
                  opts('opt.test', ['ielts', 'ielts_ukvi', 'pte', 'toefl', 'duolingo']) as {
                    value: EnglishTest
                    label: string
                  }[]
                }
              />
            </Field>
          )}

          {englishTaken === false && (
            <Field label={t('f.predicted')} hint={t('f.predicted.hint')}>
              <input
                className="input"
                type="number"
                step="0.5"
                min={0}
                max={9}
                inputMode="decimal"
                placeholder="6.0"
                value={profile.englishPredicted ? profile.englishOverall ?? '' : ''}
                onChange={(e) => {
                  const v = e.target.value === '' ? null : clampNum(Number(e.target.value), 9)
                  setProfile({
                    ...profile,
                    englishTest: v === null ? 'none' : 'ielts',
                    englishPredicted: v !== null,
                    englishOverall: v,
                  })
                }}
              />
            </Field>
          )}

          {englishTaken === true && hasScore && (
            <>
              <Field label={t('f.englishOverall')} required>
                <input
                  className="input"
                  type="number"
                  step={isIelts ? '0.5' : '1'}
                  min={0}
                  max={englishMax(profile.englishTest)}
                  inputMode="decimal"
                  value={profile.englishOverall ?? ''}
                  placeholder={isIelts ? '6.5' : profile.englishTest === 'toefl' ? '90' : '60'}
                  onChange={(e) =>
                    set(
                      'englishOverall',
                      e.target.value === ''
                        ? null
                        : clampNum(Number(e.target.value), englishMax(profile.englishTest)),
                    )
                  }
                />
              </Field>

              {isIelts && (
                <div className="subsection">
                  <div className="subsection-title label">{t('f.bands.title')}</div>
                  <p className="hint" style={{ marginBottom: 'var(--sam-sp-3)' }}>
                    {t('f.bands.hint')}
                  </p>
                  <div className="grid grid-2">
                    {(
                      [
                        ['bandListening', 'f.band.listening'],
                        ['bandReading', 'f.band.reading'],
                        ['bandWriting', 'f.band.writing'],
                        ['bandSpeaking', 'f.band.speaking'],
                      ] as const
                    ).map(([key, label]) => (
                      <Field key={key} label={t(label)}>
                        <input
                          className="input"
                          type="number"
                          step="0.5"
                          min={0}
                          max={9}
                          inputMode="decimal"
                          value={profile[key] ?? ''}
                          onChange={(e) =>
                            set(key, e.target.value === '' ? null : clampNum(Number(e.target.value), 9))
                          }
                        />
                      </Field>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* ---------------- Situation ---------------- */}
      {stepKey === 'situation' && (
        <div className="stack stack-4">
          <div className="grid grid-2">
            <Field label={t('f.gapYears')}>
              <input
                className="input"
                type="number"
                min={0}
                max={30}
                inputMode="numeric"
                value={profile.gapYears}
                onChange={(e) => set('gapYears', Number(e.target.value) || 0)}
              />
            </Field>
            {profile.gapYears > 0 && (
              <Field label={t('f.gapReason')}>
                <Select
                  value={profile.gapReason || null}
                  onChange={(v) => set('gapReason', v)}
                  placeholder={t('opt.choose')}
                  options={opts('opt.gapreason', GAP_REASONS)}
                />
              </Field>
            )}
          </div>

          <Field label={t('f.visaRefusal')}>
            <Toggle
              value={profile.visaRefusal}
              onChange={(v) => set('visaRefusal', v)}
              labels={[t('opt.yes'), t('opt.no')]}
            />
          </Field>

          {profile.visaRefusal && (
            <Field label={t('f.refusalDetails')}>
              <textarea
                className="input"
                value={profile.refusalDetails}
                onChange={(e) => set('refusalDetails', e.target.value)}
              />
            </Field>
          )}

          <div className="grid grid-2">
            <Field label={t('f.budget')} hint={t('f.budget.hint')} required>
              <Select
                value={profile.budgetBDT !== null ? String(profile.budgetBDT) : null}
                onChange={(v) => set('budgetBDT', Number(v))}
                placeholder={t('opt.choose')}
                options={BUDGET_VALUES.map((b) => ({
                  value: String(b),
                  label: t(`opt.budget.${b}`),
                }))}
              />
            </Field>
            <Field label={t('f.funding')}>
              <Select<FundingSource>
                value={profile.funding}
                onChange={(v) => set('funding', v)}
                placeholder={t('opt.choose')}
                options={opts('opt.funding', FUNDINGS) as { value: FundingSource; label: string }[]}
              />
            </Field>
          </div>

          <Field label={t('f.priorities')}>
            <ChipGroup<Priority>
              value={profile.priorities}
              onChange={(v) => set('priorities', v)}
              max={3}
              options={PRIORITIES.map((p) => ({ value: p, label: t(`opt.priority.${p}`) }))}
            />
          </Field>

          <Field label={t('f.preferred')} hint={t('f.preferred.hint')}>
            <ChipGroup
              value={profile.preferredCountries}
              onChange={(v) => set('preferredCountries', v)}
              options={DESTINATIONS.filter(
                (d) => !d.offeredLevels || d.offeredLevels.includes(profile.level ?? 'bachelors'),
              ).map((d) => ({
                value: d.id,
                label: (
                  <>
                    <Flag emoji={d.flag} /> {d.name[lang]}
                  </>
                ),
              }))}
            />
          </Field>
        </div>
      )}

      <div className="actions">
        {step > 1 ? (
          <button type="button" className="btn btn-ghost" onClick={() => setStep(step - 1)}>
            {t('btn.back')}
          </button>
        ) : (
          <button type="button" className="btn btn-ghost" onClick={onHome}>
            {t('btn.home')}
          </button>
        )}
        <div className="spacer" />
        <button type="button" className="btn btn-primary" onClick={next} disabled={submitting}>
          {submitting && <span className="spinner" />}
          {step === TOTAL_STEPS ? t('btn.submit') : t('btn.next')}
        </button>
      </div>
    </div>
  )
}
