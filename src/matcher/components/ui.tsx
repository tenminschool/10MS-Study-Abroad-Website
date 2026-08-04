import type { ReactNode } from 'react'

export function Field({
  label,
  hint,
  error,
  required,
  children,
}: {
  label?: string
  hint?: string
  error?: string
  required?: boolean
  children: ReactNode
}) {
  return (
    <div className="field">
      {label && <label className={required ? 'req' : undefined}>{label}</label>}
      {children}
      {error ? <span className="err">{error}</span> : hint ? <span className="hint">{hint}</span> : null}
    </div>
  )
}

export function Select<T extends string>({
  value,
  onChange,
  options,
  placeholder,
  id,
}: {
  value: T | null
  onChange: (v: T) => void
  options: { value: T; label: string }[]
  placeholder?: string
  id?: string
}) {
  return (
    <select
      id={id}
      className="select"
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value as T)}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  )
}

export function ChipGroup<T extends string>({
  value,
  onChange,
  options,
  max,
}: {
  value: T[]
  onChange: (v: T[]) => void
  options: { value: T; label: ReactNode }[]
  max?: number
}) {
  const toggle = (v: T) => {
    if (value.includes(v)) onChange(value.filter((x) => x !== v))
    else if (!max || value.length < max) onChange([...value, v])
  }
  return (
    <div className="chips">
      {options.map((o) => {
        const on = value.includes(o.value)
        const blocked = !on && !!max && value.length >= max
        return (
          <button
            key={o.value}
            type="button"
            className="chip"
            aria-pressed={on}
            disabled={blocked}
            onClick={() => toggle(o.value)}
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
}

export function Toggle({
  value,
  onChange,
  labels,
}: {
  value: boolean
  onChange: (v: boolean) => void
  labels: [string, string]
}) {
  return (
    <div className="seg">
      <button type="button" aria-pressed={!value} onClick={() => onChange(false)}>
        {labels[1]}
      </button>
      <button type="button" aria-pressed={value} onClick={() => onChange(true)}>
        {labels[0]}
      </button>
    </div>
  )
}

/** Tier and status pill. Tones map to the `.tag-*` classes in global.css. */
export function Tag({
  tone,
  children,
}: {
  tone: 'good' | 'warn' | 'bad' | 'neutral'
  children: ReactNode
}) {
  return <span className={`tag tag-${tone}`}>{children}</span>
}
