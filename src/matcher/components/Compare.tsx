"use client";

import { useApp } from '../app/providers'
import { destinationById } from '../engine/match'
import type { Destination, MatchOutput, MatchResult, StudyLevel } from '../engine/types'
import { band, money, moneyRange, num } from '../lib/format'
import { Flag } from './Flag'

type Row = {
  key: string
  /** Value renderer. */
  cell: (d: Destination, r: MatchResult) => string
  /** Lower is better, higher is better, or not comparable. */
  best?: 'low' | 'high'
  metric?: (d: Destination, r: MatchResult) => number
}

export function Compare({
  output,
  picks,
  level,
  onBack,
}: {
  output: MatchOutput
  picks: string[]
  level: StudyLevel
  onBack: () => void
}) {
  const { t, lang } = useApp()

  const entries = picks
    .map((id) => {
      const d = destinationById(id)
      const r = output.results.find((x) => x.destinationId === id)
      return d && r ? { d, r } : null
    })
    .filter(Boolean) as { d: Destination; r: MatchResult }[]

  if (entries.length < 2) {
    return (
      <div className="card">
        <p className="lede">{t('cmp.pickMore')}</p>
        <div className="actions">
          <button className="btn btn-ghost" type="button" onClick={onBack}>
            {t('btn.backToResults')}
          </button>
        </div>
      </div>
    )
  }

  const rows: Row[] = [
    {
      key: 'cmp.row.fit',
      cell: (_d, r) => num(r.score, lang),
      best: 'high',
      metric: (_d, r) => r.score,
    },
    { key: 'cmp.row.verdict', cell: (_d, r) => t(`res.tier.${r.tier}`) },
    {
      key: 'cmp.row.tuition',
      cell: (d) =>
        moneyRange(
          d.cost.tuitionPerYearBDT[level].low,
          d.cost.tuitionPerYearBDT[level].high,
          lang,
        ),
      best: 'low',
      metric: (d) => d.cost.tuitionPerYearBDT[level].typical,
    },
    {
      key: 'cmp.row.living',
      cell: (d) => moneyRange(d.cost.livingPerYearBDT.low, d.cost.livingPerYearBDT.high, lang),
      best: 'low',
      metric: (d) => d.cost.livingPerYearBDT.typical,
    },
    {
      key: 'cmp.row.totalMin',
      cell: (_d, r) => money(r.cost.firstYearMinimum, lang),
      best: 'low',
      metric: (_d, r) => r.cost.firstYearMinimum,
    },
    {
      key: 'cmp.row.totalTypical',
      cell: (_d, r) => money(r.cost.firstYearTypical, lang),
      best: 'low',
      metric: (_d, r) => r.cost.firstYearTypical,
    },
    {
      key: 'cmp.row.upfront',
      cell: (d) => (d.cost.upfrontDepositBDT > 0 ? money(d.cost.upfrontDepositBDT, lang) : t('fact.none')),
      best: 'low',
      metric: (d) => d.cost.upfrontDepositBDT,
    },
    {
      key: 'cmp.row.ieltsMin',
      cell: (d) => band(d.levels[level].ieltsMinOverall, lang),
      best: 'low',
      metric: (d) => d.levels[level].ieltsMinOverall,
    },
    {
      key: 'cmp.row.ieltsBand',
      cell: (d) => band(d.levels[level].ieltsNoBandBelow, lang),
      best: 'low',
      metric: (d) => d.levels[level].ieltsNoBandBelow,
    },
    {
      key: 'cmp.row.ieltsTarget',
      cell: (d) => band(d.levels[level].ieltsExpected, lang),
    },
    {
      key: 'cmp.row.academic',
      cell: (d) =>
        `${num(d.levels[level].academicMinNative, lang, 2)} ${t(
          `scale.${d.levels[level].academicScale}`,
        )}`,
      best: 'low',
      metric: (d) => d.levels[level].academicIndexMin,
    },
    {
      key: 'cmp.row.gap',
      cell: (d) => {
        const y =
          level === 'diploma'
            ? d.gapTolerance.diplomaYears
            : level === 'bachelors'
              ? d.gapTolerance.bachelorsYears
              : level === 'masters'
                ? d.gapTolerance.mastersYears
                : d.gapTolerance.phdYears
        return t('fact.years', { n: num(y, lang) })
      },
      best: 'high',
      metric: (d) =>
        level === 'bachelors' ? d.gapTolerance.bachelorsYears : d.gapTolerance.mastersYears,
    },
    { key: 'cmp.row.scholarship', cell: (d) => t(`rating.${d.scholarships.rating}`) },
    {
      key: 'cmp.row.waiver',
      cell: (d) =>
        t('fact.waiverRange', {
          min: num(d.scholarships.typicalMeritWaiverPercent.min, lang),
          max: num(d.scholarships.typicalMeritWaiverPercent.max, lang),
        }),
      best: 'high',
      metric: (d) => d.scholarships.typicalMeritWaiverPercent.max,
    },
    {
      key: 'cmp.row.work',
      cell: (d) => t('fact.hoursWeek', { n: num(d.work.termTimeHoursPerWeek, lang) }),
      best: 'high',
      metric: (d) => d.work.termTimeHoursPerWeek,
    },
    {
      key: 'cmp.row.earnings',
      cell: (d) => money(d.work.realisticMonthlyEarningsBDT, lang),
      best: 'high',
      metric: (d) => d.work.realisticMonthlyEarningsBDT,
    },
    {
      key: 'cmp.row.psw',
      cell: (d) =>
        d.postStudy.monthsByLevel[level] > 0
          ? t('fact.months', { n: num(d.postStudy.monthsByLevel[level], lang) })
          : t('fact.none'),
      best: 'high',
      metric: (d) => d.postStudy.monthsByLevel[level],
    },
    { key: 'cmp.row.pr', cell: (d) => t(`rating.${d.pr.rating}`) },
    {
      key: 'cmp.row.prYears',
      cell: (d) =>
        t('fact.yearsRange', {
          min: num(d.pr.realisticYearsToPR.min, lang),
          max: num(d.pr.realisticYearsToPR.max, lang),
        }),
      best: 'low',
      metric: (d) => d.pr.realisticYearsToPR.min,
    },
    {
      key: 'cmp.row.processing',
      cell: (d) =>
        t('fact.weeksRange', {
          min: num(d.visa.processingWeeks.min, lang),
          max: num(d.visa.processingWeeks.max, lang),
        }),
      best: 'low',
      metric: (d) => d.visa.processingWeeks.max,
    },
    { key: 'cmp.row.refusal', cell: (d) => t(`impact.${d.visa.priorRefusalImpact}`) },
    {
      key: 'cmp.row.intakes',
      cell: (d) => d.intakes.map((i) => i.month.slice(0, 3)).join(', '),
      best: 'high',
      metric: (d) => d.intakes.length,
    },
    { key: 'cmp.row.interview', cell: (d) => (d.visa.interviewRequired ? t('opt.yes') : t('opt.no')) },
    { key: 'cmp.row.dependants', cell: (d) => (d.work.dependantsAllowed ? t('opt.yes') : t('opt.no')) },
  ]

  return (
    <div className="stack stack-5">
      <div className="sec-head">
        <h2 className="h2">
          <span className="heavy">{t('cmp.title')}</span>
        </h2>
        <p className="lede">{t('cmp.sub')}</p>
      </div>

      <div className="table-scroll">
        <table className="compare">
          <thead>
            <tr>
              <th />
              {entries.map(({ d }) => (
                <th key={d.id}>
                  <Flag emoji={d.flag} className="row-flag" />{' '}
                  {d.name[lang]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => {
              let bestIdx = -1
              if (row.best && row.metric) {
                const vals = entries.map(({ d, r }) => row.metric!(d, r))
                const target = row.best === 'low' ? Math.min(...vals) : Math.max(...vals)
                // Only highlight when there is a genuine winner.
                if (vals.filter((v) => v === target).length === 1) bestIdx = vals.indexOf(target)
              }
              return (
                <tr key={row.key}>
                  <th scope="row">{t(row.key)}</th>
                  {entries.map(({ d, r }, i) => (
                    <td key={d.id} className={i === bestIdx ? 'best' : undefined}>
                      {row.cell(d, r)}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <div className="disclaimer">{t('res.disclaimer')}</div>

      <div className="cta-row">
        <button className="btn btn-ghost" type="button" onClick={onBack}>
          {t('btn.backToResults')}
        </button>
        <button className="btn btn-ghost" type="button" onClick={() => window.print()}>
          {t('btn.print')}
        </button>
      </div>
    </div>
  )
}
