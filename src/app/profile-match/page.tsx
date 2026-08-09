"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AppProvider, useApp } from '../../matcher/app/providers';
import { Compare } from '../../matcher/components/Compare';
import { Form, TOTAL_STEPS, emptyProfile } from '../../matcher/components/Form';
import { Results } from '../../matcher/components/Results';
import { UNVERIFIED } from '../../matcher/data';
import { CONFIG } from '../../matcher/config';
import { RULES_VERSION, matchStudent } from '../../matcher/engine/match';
import type { MatchOutput, StudentProfile } from '../../matcher/engine/types';
import '../../matcher/styles/matcher.css';

// The study-abroad-matcher destination-matching flow, ported wholesale.
// The hero's own "intro" screen now lives permanently on the homepage
// (see HomeHero.tsx), so this page starts straight at the form.
type Screen = 'form' | 'results' | 'compare';

const STORAGE_KEY = 'sam.draft';

function loadDraft(): StudentProfile {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (raw) return { ...emptyProfile, ...JSON.parse(raw) };
  } catch {}
  return emptyProfile;
}

/** Captures campaign attribution once so the counsellor knows where the lead came from. */
function attribution() {
  const p = new URLSearchParams(window.location.search);
  return {
    utm_source: p.get('utm_source') ?? '',
    utm_medium: p.get('utm_medium') ?? '',
    utm_campaign: p.get('utm_campaign') ?? '',
    referrer: document.referrer || '',
    device: navigator.userAgent.slice(0, 180),
  };
}

function ProfileMatchInner() {
  const { t, lang } = useApp();
  const router = useRouter();
  const [screen, setScreen] = useState<Screen>('form');
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<StudentProfile>(loadDraft);
  const [output, setOutput] = useState<MatchOutput | null>(null);
  const [picks, setPicks] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [saveError, setSaveError] = useState(false);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    } catch {}
  }, [profile]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [screen, step]);

  // Contact details are collected on the final step, so there is a single
  // submit: the lead is written once, complete, with its computed matches.
  async function post(): Promise<{ ok: boolean; matches: MatchOutput | null }> {
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          status: 'complete',
          profile,
          attribution: attribution(),
          rulesVersion: RULES_VERSION,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      const data = (await res.json()) as { ok?: boolean; matches?: MatchOutput | null };
      return { ok: data.ok !== false, matches: data.matches ?? null };
    } catch {
      return { ok: false, matches: null };
    }
  }

  async function handleSubmit() {
    setSubmitting(true);
    // Computed locally first so a backend failure never costs the student their result.
    const local = matchStudent(profile);
    const { ok, matches } = await post();
    // The server recomputes with the same engine; prefer its answer when available.
    setOutput(matches ?? local);
    setSaveError(!ok);
    setSubmitting(false);
    setScreen('results');
  }

  function restart() {
    setProfile(emptyProfile);
    setOutput(null);
    setPicks([]);
    setStep(1);
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {}
    router.push('/');
  }

  const level = profile.level ?? 'bachelors';

  return (
    <div className="app">
      <main className="main">
        {CONFIG.showDraftDataWarning && UNVERIFIED.length > 0 && (
          <div className="wrap" style={{ paddingTop: 'var(--sam-sp-4)' }}>
            <div className="notice notice-bad">
              {t('footer.draft', { n: UNVERIFIED.length, list: UNVERIFIED.join(', ') })}
            </div>
          </div>
        )}

        {screen === 'form' && (
          <div className="section">
            <div className="wrap wrap-narrow">
              <Form
                profile={profile}
                setProfile={setProfile}
                step={step}
                setStep={(n) => setStep(Math.max(1, Math.min(TOTAL_STEPS, n)))}
                onSubmit={handleSubmit}
                submitting={submitting}
                onHome={() => router.push('/')}
              />
            </div>
          </div>
        )}

        {screen === 'results' && output && (
          <div className="section">
            <div className="wrap">
              <Results
                output={output}
                profile={profile}
                level={level}
                picks={picks}
                setPicks={setPicks}
                onCompare={() => setScreen('compare')}
                onRestart={restart}
                saveError={saveError}
              />
            </div>
          </div>
        )}

        {screen === 'compare' && output && (
          <div className="section">
            <div className="wrap">
              <Compare output={output} picks={picks} level={level} onBack={() => setScreen('results')} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default function ProfileMatchPage() {
  return (
    <div className="sam-ui sam-home-hero">
      <AppProvider>
        <ProfileMatchInner />
      </AppProvider>
    </div>
  );
}
