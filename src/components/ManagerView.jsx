import { useState } from 'react'
import TableInput from './TableInput'
import { calcCompletion } from './ProgressBar'

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

function val(v) {
  return v && String(v).trim() ? v : null
}

function Field({ label, value, full }) {
  const empty = !val(value)
  return (
    <div className={`detail-field${full ? ' full' : ''}`}>
      <div className="detail-field-label">{label}</div>
      <div className={`detail-field-value${empty ? ' empty' : ''}`}>
        {empty ? 'Not filled in' : value}
      </div>
    </div>
  )
}

function SectionBlock({ title, children }) {
  return (
    <div className="detail-section">
      <div className="detail-section-header">{title}</div>
      {children}
    </div>
  )
}

function TableBlock({ label, columns, rows }) {
  return (
    <div className="detail-table-wrapper">
      {label && <div className="detail-table-label">{label}</div>}
      <TableInput columns={columns} rows={rows || []} onChange={() => {}} readOnly />
    </div>
  )
}

function AEDetail({ ae }) {
  if (!ae) return null
  const s1 = ae.section1 || {}
  const s2 = ae.section2 || {}
  const s3 = ae.section3 || {}
  const s4 = ae.section4 || {}
  const { overall } = calcCompletion(ae)

  const initials = (ae.name || '?').trim().split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  const lastUpdated = ae.lastUpdated?.toDate
    ? ae.lastUpdated.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
    : 'Unknown'

  return (
    <div className="ae-detail">
      {/* Header */}
      <div className="ae-detail-header">
        <div className="ae-detail-avatar">{initials}</div>
        <div style={{ flex: 1 }}>
          <div className="ae-detail-name">{ae.name}</div>
          <div className="ae-detail-meta">Last updated: {lastUpdated}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 28, fontWeight: 800, color: 'var(--accent-text)' }}>{overall}%</div>
          <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>Plan complete</div>
        </div>
      </div>

      {/* Section 1 */}
      <SectionBlock title="01 · Pipeline & Growth">
        <div className="detail-grid">
          <Field label="H1 Target" value={s1.h1Target} />
        </div>

        <div style={{ padding: '12px 24px 0', borderTop: '1px solid var(--border-0)' }}>
          <div className="detail-field-label" style={{ paddingTop: 4, marginBottom: 12 }}>Net New Pipeline</div>
          <div className="detail-grid" style={{ borderTop: '1px solid var(--border-0)' }}>
            <Field label="Pipeline Mix" value={s1.netNewPipeline?.pipelineMix} />
            <Field label="Creative Build Approach" value={s1.netNewPipeline?.creativeApproach} />
            <Field label="Build Plan" value={s1.netNewPipeline?.buildPlan} full />
          </div>
        </div>

        <div style={{ padding: '12px 24px 0', borderTop: '1px solid var(--border-0)' }}>
          <div className="detail-field-label" style={{ paddingTop: 4, marginBottom: 12 }}>Client Expansion</div>
          <div className="detail-grid" style={{ borderTop: '1px solid var(--border-0)' }}>
            <Field label="Plays Running" value={s1.clientExpansion?.playsRunning} />
            <Field label="Education Gap" value={s1.clientExpansion?.educationGap} />
            <Field label="Getting Deeper" value={s1.clientExpansion?.gettingDeeper} full />
          </div>
        </div>

        <TableBlock label="Exciting Prospects" columns={PROSPECTS_COLS} rows={s1.excitingProspects} />
        <TableBlock label="Client Whitespace" columns={WHITESPACE_COLS} rows={s1.clientWhitespace} />

        <div style={{ padding: '12px 24px 0', borderTop: '1px solid var(--border-0)' }}>
          <div className="detail-field-label" style={{ paddingTop: 4, marginBottom: 12 }}>Retention</div>
          <div className="detail-grid" style={{ borderTop: '1px solid var(--border-0)' }}>
            <Field label="Renewals Count" value={s1.retention?.renewalsCount} />
            <Field label="ACV at Stake" value={s1.retention?.acvAtStake} />
            <Field label="At-Risk Count" value={s1.retention?.atRiskCount} />
            <Field label="Retention Commitment" value={s1.retention?.retentionCommitment} />
            <Field label="Exec Engagement" value={s1.retention?.execEngagement} />
            <Field label="Commercial Levers" value={s1.retention?.commercialLevers} />
            <Field label="Support Needed" value={s1.retention?.supportNeeded} full />
          </div>
        </div>

        <TableBlock label="At-Risk Account Tracker" columns={ATRISK_COLS} rows={s1.atRiskTracker} />

        <div style={{ padding: '12px 24px 0', borderTop: '1px solid var(--border-0)' }}>
          <div className="detail-field-label" style={{ paddingTop: 4, marginBottom: 12 }}>Q1 Fast Start (by Apr 30)</div>
          <div className="detail-grid" style={{ borderTop: '1px solid var(--border-0)' }}>
            <Field label="Action 1" value={s1.q1FastStart?.action1} />
            <Field label="Action 2" value={s1.q1FastStart?.action2} />
            <Field label="Action 3" value={s1.q1FastStart?.action3} full />
          </div>
        </div>
      </SectionBlock>

      {/* Section 2 */}
      <SectionBlock title="02 · Your Story">
        <div className="detail-grid">
          <Field label="Headline Story / Narrative" value={s2.headlineNarrative} full />
          <Field label="What Moving Upmarket Means" value={s2.movingUpmarket} />
          <Field label="The One Thing You'll Own" value={s2.oneThingOwn} />
        </div>
      </SectionBlock>

      {/* Section 3 */}
      <SectionBlock title="03 · Big Bets">
        <div className="detail-grid">
          <Field label="The Deal / Account" value={s3.bigBetDeal} full />
          <Field label="The Capability" value={s3.bigBetCapability} />
          <Field label="The Milestone" value={s3.bigBetMilestone} />
        </div>
      </SectionBlock>

      {/* Section 4 */}
      <SectionBlock title="04 · Big Asks">
        <div className="detail-grid">
          <Field label="From Leadership" value={s4.leadershipAsks} />
          <Field label="From GTM / Deal Desk" value={s4.gtmDealDesk} />
          <Field label="From Marketing" value={s4.marketing} />
          <Field label="From Solutions Engineering" value={s4.solutionsEngineering} />
        </div>
      </SectionBlock>
    </div>
  )
}

export default function ManagerView({ allAEs, loading, onRefresh }) {
  const [selectedIdx, setSelectedIdx] = useState(0)

  if (loading) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">⏳</div>
        <h3>Loading plans…</h3>
        <p>Fetching all AE submissions from Firestore.</p>
      </div>
    )
  }

  if (!allAEs.length) {
    return (
      <div>
        <div className="manager-header">
          <div>
            <h2>Manager View</h2>
            <p>All submitted AE plans will appear here.</p>
          </div>
          <button className="btn btn-outline" onClick={onRefresh}>↻ Refresh</button>
        </div>
        <div className="empty-state">
          <div className="empty-state-icon">📋</div>
          <h3>No plans submitted yet</h3>
          <p>AEs can submit their plans using the AE view. Check back once submissions come in.</p>
        </div>
      </div>
    )
  }

  const selected = allAEs[selectedIdx]

  return (
    <div>
      <div className="manager-header">
        <div>
          <h2>Manager View</h2>
          <p>{allAEs.length} AE plan{allAEs.length !== 1 ? 's' : ''} submitted</p>
        </div>
        <button className="btn btn-outline" onClick={onRefresh}>↻ Refresh</button>
      </div>

      <div className="manager-layout">
        {/* Sidebar */}
        <div className="ae-sidebar">
          <div className="ae-sidebar-title">AE Plans</div>
          {allAEs.map((ae, i) => {
            const { overall } = calcCompletion(ae)
            const initials = (ae.name || '?').trim().split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
            return (
              <button
                key={ae.name}
                className={`ae-sidebar-item ${i === selectedIdx ? 'active' : ''}`}
                onClick={() => setSelectedIdx(i)}
              >
                <div className="ae-avatar">{initials}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div className="ae-sidebar-name">{ae.name}</div>
                  <div style={{ fontSize: 11, color: i === selectedIdx ? 'var(--accent-text)' : 'var(--text-3)', marginTop: 2 }}>
                    {overall}% complete
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Detail pane */}
        <AEDetail ae={selected} />
      </div>
    </div>
  )
}
