import { PayrollScreen } from './PayrollScreen'
import type { Persona, Step } from '../data/personas'

type Mode = 'flow' | 'doc'

interface PayrollOutputWalkthroughProps {
  current: Persona
  step: Step
  index: number
  mode: Mode
  setIndex: (index: number) => void
  setMode: (mode: Mode) => void
}

export function PayrollOutputWalkthrough({
  current,
  step,
  index,
  mode,
  setIndex,
  setMode,
}: PayrollOutputWalkthroughProps) {
  const isLast = index === current.steps.length - 1

  return (
    <>
      <div className="docbar">
        <div>
          <div className="dt">{current.label} — full payroll walkthrough</div>
          <div className="ds">Every screen in sequence, formatted for printing or export.</div>
        </div>
        <div style={{ flex: 1 }} />
        <button className="btn btn-primary" onClick={() => window.print()}>
          Print / Save as PDF
        </button>
      </div>

      <div className="layout">
        <aside className="rail" aria-label="Pages">
          <h2>{current.label} · {current.steps.length} pages</h2>
          <ol>
            {current.steps.map((stepItem, stepIndex) => (
              <li key={stepItem.title}>
                <button
                  className={`rstep ${stepIndex < index ? 'is-done' : stepIndex === index ? 'is-current' : ''}`}
                  onClick={() => {
                    setIndex(stepIndex)
                    if (mode === 'doc') setMode('flow')
                  }}
                >
                  <span className="rnum">{stepIndex < index ? '✓' : stepIndex + 1}</span>
                  <span className="rlabel">
                    {stepItem.title}
                    <span className="rmini">{stepItem.tag}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </aside>

        <section className="stage" id="stage">
          {mode === 'doc'
            ? current.steps.map((screen, screenIndex) => (
                <PayrollScreen key={screen.title} step={screen} mode="doc" screenIndex={screenIndex} />
              ))
            : <PayrollScreen step={step} mode="flow" screenIndex={index} />}

          {mode === 'flow' ? (
            <div className="foot">
              <button className="btn" onClick={() => setIndex(Math.max(index - 1, 0))} disabled={index === 0}>
                ← Back
              </button>
              <div className="progress">
                <div className="pmeta">
                  <span>Page {index + 1} of {current.steps.length}</span>
                  <span>{Math.round(((index + 1) / current.steps.length) * 100)}% viewed</span>
                </div>
                <div className="pbar">
                  <div className="fill" style={{ width: `${Math.round(((index + 1) / current.steps.length) * 100)}%` }} />
                </div>
              </div>
              <button className="btn btn-primary" onClick={() => setIndex(Math.min(index + 1, current.steps.length - 1))}>
                {isLast ? 'Done' : 'Next →'}
              </button>
            </div>
          ) : null}
        </section>
      </div>
    </>
  )
}
