import { calcCompletion } from './ProgressBar'

function val(v) {
  return v && String(v).trim() ? String(v).trim() : null
}

function Field({ label, value, wide }) {
  const empty = !val(value)
  return (
    <div className={`pv-field${wide ? ' pv-field-wide' : ''}`}>
      <div className="pv-field-label">{label}</div>
      <div className={`pv-field-value${empty ? ' pv-field-empty' : ''}`}>
        {empty ? 'Not filled in' : value}
      </div>
    </div>
  )
}

function SectionHeader({ number, title }) {
  return (
    <div className="pv-section-header">
      <span className="pv-section-num">{number}</span>
      <span className="pv-section-title">{title}</span>
    </div>
  )
}

function DataTable({ columns, rows }) {
  if (!rows || rows.length === 0) {
    return <div className="pv-table-empty">No entries.</div>
  }
  return (
    <table className="pv-table">
      <thead>
        <tr>
          {columns.map(col => <th key={col.key}>{col.label}</th>)}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i}>
            {columns.map(col => (
              <td key={col.key}>{row[col.key] || '—'}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

const PROSPECTS_COLS = [
  { key: 'account', label: 'Account' },
  { key: 'solutions', label: 'Solutions' },
  { key: 'whyNow', label: 'Why Now' },
  { key: 'potentialACV', label: 'Potential ACV' },
  { key: 'closeDate', label: 'Close Date' }
]
const WHITESPACE_COLS = [
  { key: 'account', label: 'Account' },
  { key: 'relationships', label: 'Relationships to Build' },
  { key: 'products', label: 'Products / Potential ACV' }
]
const ATRISK_COLS = [
  { key: 'account', label: 'Account' },
  { key: 'riskSignal', label: 'Risk Signal' },
  { key: 'nextAction', label: 'Next Action' }
]

export default function PresenterView({ aeName, formData }) {
  const { overall, sections } = calcCompletion(formData)
  const s1 = formData.section1 || {}
  const s2 = formData.section2 || {}
  const s3 = formData.section3 || {}
  const s4 = formData.section4 || {}

  const initials = (aeName || '?').trim().split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

  return (
    <div className="pv-root">
      {/* Print button — hidden on print */}
      <div className="pv-print-bar no-print">
        <span className="pv-print-hint">Ready to present or print</span>
        <button className="btn btn-primary btn-sm" onClick={() => window.print()}>
          Print / Save as PDF
        </button>
      </div>

      {/* Cover */}
      <div className="pv-cover">
        <div className="pv-cover-avatar">{initials}</div>
        <h1 className="pv-cover-name">{aeName}</h1>
        <div className="pv-cover-meta">H1 FY27 QBR · Sales Planning</div>
        <div className="pv-cover-date">{today}</div>
        <div className="pv-cover-progress">
          <div className="pv-progress-track">
            <div className="pv-progress-fill" style={{ width: `${overall}%` }} />
          </div>
          <span className="pv-progress-label">{overall}% complete</span>
        </div>
      </div>

      <div className="pv-divider" />

      {/* Section 1 — Pipeline & Growth */}
      <div className="pv-section">
        <SectionHeader number="01" title="Pipeline & Growth" />

        {val(s1.h1Target) && (
          <div className="pv-highlight-box">
            <div className="pv-highlight-label">H1 Target</div>
            <div className="pv-highlight-value">{s1.h1Target}</div>
          </div>
        )}

        <div className="pv-block">
          <div className="pv-block-title">Net New Pipeline</div>
          <div className="pv-fields-grid">
            <Field label="Pipeline Mix" value={s1.netNewPipeline?.pipelineMix} />
            <Field label="Creative Build Approach" value={s1.netNewPipeline?.creativeApproach} />
            <Field label="Build Plan" value={s1.netNewPipeline?.buildPlan} wide />
          </div>
        </div>

        <div className="pv-block">
          <div className="pv-block-title">Client Expansion</div>
          <div className="pv-fields-grid">
            <Field label="Plays Running" value={s1.clientExpansion?.playsRunning} />
            <Field label="Education Gap" value={s1.clientExpansion?.educationGap} />
            <Field label="Getting Deeper" value={s1.clientExpansion?.gettingDeeper} wide />
          </div>
        </div>

        <div className="pv-block">
          <div className="pv-block-title">Exciting Prospects</div>
          <DataTable columns={PROSPECTS_COLS} rows={s1.excitingProspects} />
        </div>

        <div className="pv-block">
          <div className="pv-block-title">Client Whitespace</div>
          <DataTable columns={WHITESPACE_COLS} rows={s1.clientWhitespace} />
        </div>

        <div className="pv-block">
          <div className="pv-block-title">Retention</div>
          <div className="pv-stats-row">
            {val(s1.retention?.renewalsCount) && (
              <div className="pv-stat">
                <div className="pv-stat-value">{s1.retention.renewalsCount}</div>
                <div className="pv-stat-label">Renewals</div>
              </div>
            )}
            {val(s1.retention?.acvAtStake) && (
              <div className="pv-stat">
                <div className="pv-stat-value">{s1.retention.acvAtStake}</div>
                <div className="pv-stat-label">ACV at Stake</div>
              </div>
            )}
            {val(s1.retention?.atRiskCount) && (
              <div className="pv-stat">
                <div className="pv-stat-value">{s1.retention.atRiskCount}</div>
                <div className="pv-stat-label">At-Risk Accounts</div>
              </div>
            )}
            {val(s1.retention?.retentionCommitment) && (
              <div className="pv-stat">
                <div className="pv-stat-value">{s1.retention.retentionCommitment}</div>
                <div className="pv-stat-label">Retention Goal</div>
              </div>
            )}
          </div>
          <div className="pv-fields-grid" style={{ marginTop: 16 }}>
            <Field label="Exec Engagement" value={s1.retention?.execEngagement} />
            <Field label="Commercial Levers" value={s1.retention?.commercialLevers} />
            <Field label="Support Needed" value={s1.retention?.supportNeeded} wide />
          </div>
        </div>

        <div className="pv-block">
          <div className="pv-block-title">At-Risk Account Tracker</div>
          <DataTable columns={ATRISK_COLS} rows={s1.atRiskTracker} />
        </div>

        <div className="pv-block">
          <div className="pv-block-title">Q1 Fast Start — Actions by April 30</div>
          <div className="pv-fields-grid">
            <Field label="Action 1" value={s1.q1FastStart?.action1} />
            <Field label="Action 2" value={s1.q1FastStart?.action2} />
            <Field label="Action 3" value={s1.q1FastStart?.action3} />
          </div>
        </div>
      </div>

      <div className="pv-divider pv-page-break" />

      {/* Section 2 — Your Story */}
      <div className="pv-section">
        <SectionHeader number="02" title="Your Story" />

        {val(s2.headlineNarrative) && (
          <div className="pv-narrative-box">
            <div className="pv-block-title">Headline Narrative</div>
            <p className="pv-narrative-text">{s2.headlineNarrative}</p>
          </div>
        )}

        <div className="pv-fields-grid pv-fields-grid-2">
          <Field label="What Moving Upmarket Means to You" value={s2.movingUpmarket} />
          <Field label="The One Thing You'll Own in H1" value={s2.oneThingOwn} />
        </div>
      </div>

      <div className="pv-divider" />

      {/* Section 3 — Big Bets */}
      <div className="pv-section">
        <SectionHeader number="03" title="Big Bets" />
        <div className="pv-bets-grid">
          {[
            { label: 'The Deal / Account', subtitle: 'Your signature win this half', value: s3.bigBetDeal },
            { label: 'The Capability', subtitle: "New product you're betting on", value: s3.bigBetCapability },
            { label: 'The Milestone', subtitle: "What proves you've leveled up", value: s3.bigBetMilestone },
          ].map(bet => (
            <div key={bet.label} className="pv-bet-card">
              <div className="pv-bet-title">{bet.label}</div>
              <div className="pv-bet-subtitle">{bet.subtitle}</div>
              <div className={`pv-bet-body${!val(bet.value) ? ' pv-field-empty' : ''}`}>
                {val(bet.value) || 'Not filled in'}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pv-divider" />

      {/* Section 4 — Big Asks */}
      <div className="pv-section">
        <SectionHeader number="04" title="Big Asks" />
        <div className="pv-fields-grid pv-fields-grid-2">
          <Field label="From Leadership" value={s4.leadershipAsks} />
          <Field label="From GTM / Deal Desk" value={s4.gtmDealDesk} />
          <Field label="From Marketing" value={s4.marketing} />
          <Field label="From Solutions Engineering" value={s4.solutionsEngineering} />
        </div>
      </div>

      {/* Footer */}
      <div className="pv-footer no-print">
        <span>H1 FY27 QBR · {aeName}</span>
        <span>{overall}% complete · {today}</span>
      </div>
    </div>
  )
}
