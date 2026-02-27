import { useState } from 'react'
import ProgressBar, { calcCompletion } from './ProgressBar'
import Section1 from './Section1'
import Section2 from './Section2'
import Section3 from './Section3'
import Section4 from './Section4'

const SECTIONS = [
  { num: '01', label: 'Pipeline & Growth', shortLabel: 'Pipeline' },
  { num: '02', label: 'Your Story', shortLabel: 'Story' },
  { num: '03', label: 'Big Bets', shortLabel: 'Big Bets' },
  { num: '04', label: 'Big Asks', shortLabel: 'Asks' }
]

function NameEntry({ aeName, setAeName, onSubmit, loading }) {
  const handleKey = e => { if (e.key === 'Enter') onSubmit() }

  return (
    <div className="name-entry">
      <div className="name-entry-card">
        <div className="name-entry-icon">✍️</div>
        <h1>H1 FY27 QBR Planning</h1>
        <p>
          Enter your name to load or start your plan. Your progress auto-saves as you type — you can return anytime.
        </p>
        <div className="name-entry-input-wrap">
          <input
            className="form-input"
            type="text"
            value={aeName}
            onChange={e => setAeName(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Your full name (e.g. Sarah Chen)"
            autoFocus
            style={{ textAlign: 'center', fontSize: 15 }}
          />
          <button
            className="btn btn-primary btn-lg"
            onClick={onSubmit}
            disabled={!aeName.trim() || loading}
            style={{ width: '100%' }}
          >
            {loading ? (
              <><span className="spinner" /> Loading…</>
            ) : (
              'Start My Plan →'
            )}
          </button>
        </div>
        <p style={{ marginTop: 20, fontSize: 12, color: 'var(--text-3)', marginBottom: 0 }}>
          Data is saved securely in Firestore and visible to your manager.
        </p>
      </div>
    </div>
  )
}

export default function AEView({ aeName, setAeName, nameSubmitted, loadingName, onNameSubmit, formData, setFormData }) {
  const [activeSection, setActiveSection] = useState(0)

  if (!nameSubmitted) {
    return (
      <NameEntry
        aeName={aeName}
        setAeName={setAeName}
        onSubmit={onNameSubmit}
        loading={loadingName}
      />
    )
  }

  const { sections } = calcCompletion(formData)

  const updateSection = (sectionKey, newData) =>
    setFormData(prev => ({ ...prev, [sectionKey]: newData }))

  const initials = aeName.trim().split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)

  return (
    <div>
      {/* AE Identity Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          marginBottom: 20,
          padding: '12px 20px',
          background: 'var(--bg-2)',
          border: '1px solid var(--border-1)',
          borderRadius: 'var(--radius-md)'
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'var(--accent-dim)',
            border: '1px solid rgba(43,122,61,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 13,
            fontWeight: 700,
            color: 'var(--accent-text)',
            flexShrink: 0
          }}
        >
          {initials}
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-0)' }}>{aeName}</div>
          <div style={{ fontSize: 11, color: 'var(--text-3)' }}>H1 FY27 Plan · Auto-saving</div>
        </div>
        <div style={{ flex: 1 }} />
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => window.location.reload()}
          style={{ fontSize: 12, color: 'var(--text-3)' }}
        >
          Switch AE
        </button>
      </div>

      <ProgressBar formData={formData} />

      {/* Section Nav */}
      <div className="section-nav">
        {SECTIONS.map((s, i) => (
          <button
            key={i}
            className={`section-tab ${activeSection === i ? 'active' : ''}`}
            onClick={() => setActiveSection(i)}
          >
            <span className="section-tab-num">Section {s.num}</span>
            <span className="section-tab-label">{s.label}</span>
            <span className="section-tab-pct">{sections[i]}%</span>
          </button>
        ))}
      </div>

      {/* Section Content */}
      {activeSection === 0 && (
        <Section1
          data={formData.section1}
          onChange={d => updateSection('section1', d)}
        />
      )}
      {activeSection === 1 && (
        <Section2
          data={formData.section2}
          onChange={d => updateSection('section2', d)}
        />
      )}
      {activeSection === 2 && (
        <Section3
          data={formData.section3}
          onChange={d => updateSection('section3', d)}
        />
      )}
      {activeSection === 3 && (
        <Section4
          data={formData.section4}
          onChange={d => updateSection('section4', d)}
        />
      )}

      {/* Section navigation footer */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: 28,
          paddingTop: 20,
          borderTop: '1px solid var(--border-0)'
        }}
      >
        <button
          className="btn btn-outline"
          onClick={() => setActiveSection(s => Math.max(0, s - 1))}
          disabled={activeSection === 0}
        >
          ← Previous
        </button>
        <span style={{ fontSize: 12, color: 'var(--text-3)', alignSelf: 'center' }}>
          Section {activeSection + 1} of {SECTIONS.length}
        </span>
        <button
          className="btn btn-primary"
          onClick={() => setActiveSection(s => Math.min(SECTIONS.length - 1, s + 1))}
          disabled={activeSection === SECTIONS.length - 1}
        >
          Next Section →
        </button>
      </div>
    </div>
  )
}
