import TableInput from './TableInput'

const PROSPECTS_COLS = [
  { key: 'account', label: 'Account', placeholder: 'Account name', width: '160px' },
  { key: 'solutions', label: 'Potential Solutions', placeholder: 'Products / solutions', width: '180px' },
  { key: 'whyNow', label: 'Why Now', placeholder: 'Urgency / trigger', width: '160px' },
  { key: 'potentialACV', label: 'Potential ACV', placeholder: '$0', width: '110px' },
  { key: 'closeDate', label: 'Close Date', placeholder: 'Q1 / Q2…', width: '100px' }
]

const WHITESPACE_COLS = [
  { key: 'account', label: 'Account', placeholder: 'Account name', width: '180px' },
  { key: 'relationships', label: 'Relationships to Build', placeholder: 'Titles / teams to connect with', width: '240px' },
  { key: 'products', label: 'Products / Potential ACV', placeholder: 'e.g. Reviews · $80K', width: '200px' }
]

const ATRISK_COLS = [
  { key: 'account', label: 'Account', placeholder: 'Account name', width: '180px' },
  { key: 'riskSignal', label: 'Risk Signal', placeholder: 'What are you seeing?', width: '240px' },
  { key: 'nextAction', label: 'Next Action', placeholder: 'Your immediate move', width: '220px' }
]

export default function Section1({ data, onChange }) {
  const update = (key, val) => onChange({ ...data, [key]: val })
  const nest = (parent, key, val) => onChange({ ...data, [parent]: { ...data[parent], [key]: val } })

  return (
    <>
      {/* ── Card 1: Target & Net New Pipeline ── */}
      <div className="section-card">
        <div className="section-card-header">
          <div className="section-card-title">
            <div className="section-card-icon">🎯</div>
            Target & Net New Pipeline
          </div>
          <div className="section-card-subtitle">Set your H1 number and articulate how you'll build the pipe to get there.</div>
        </div>

        <div className="form-grid" style={{ gridTemplateColumns: '240px 1fr', gap: 20 }}>
          <div className="form-group">
            <label className="form-label">H1 Target ($)</label>
            <input
              className="form-input"
              type="text"
              value={data.h1Target}
              onChange={e => update('h1Target', e.target.value)}
              placeholder="e.g. $1,200,000"
            />
            <span className="form-hint">Your full-year H1 revenue target</span>
          </div>
        </div>

        <div className="section-divider" />

        <div className="subsection-label">Net New Pipeline Thinking</div>
        <div className="form-grid form-grid-3">
          <div className="form-group">
            <label className="form-label">Pipeline Mix</label>
            <textarea
              className="form-textarea md"
              value={data.netNewPipeline.pipelineMix}
              onChange={e => nest('netNewPipeline', 'pipelineMix', e.target.value)}
              placeholder="How are you thinking about inbound vs. outbound, segment mix, product mix…"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Creative Build Approach</label>
            <textarea
              className="form-textarea md"
              value={data.netNewPipeline.creativeApproach}
              onChange={e => nest('netNewPipeline', 'creativeApproach', e.target.value)}
              placeholder="What's a non-obvious way you're generating pipe? Events, referrals, partner plays…"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Build Plan</label>
            <textarea
              className="form-textarea md"
              value={data.netNewPipeline.buildPlan}
              onChange={e => nest('netNewPipeline', 'buildPlan', e.target.value)}
              placeholder="Week-by-week or milestone-based plan to hit your pipeline target…"
            />
          </div>
        </div>

        <div className="section-divider" />

        <div className="subsection-label">Client Expansion</div>
        <div className="form-grid form-grid-3">
          <div className="form-group">
            <label className="form-label">Plays Running</label>
            <textarea
              className="form-textarea md"
              value={data.clientExpansion.playsRunning}
              onChange={e => nest('clientExpansion', 'playsRunning', e.target.value)}
              placeholder="Which expansion plays are active right now? (upsell, cross-sell, add-ons…)"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Education Gap</label>
            <textarea
              className="form-textarea md"
              value={data.clientExpansion.educationGap}
              onChange={e => nest('clientExpansion', 'educationGap', e.target.value)}
              placeholder="Where do your accounts not yet understand Yext's full value or roadmap?"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Getting Deeper</label>
            <textarea
              className="form-textarea md"
              value={data.clientExpansion.gettingDeeper}
              onChange={e => nest('clientExpansion', 'gettingDeeper', e.target.value)}
              placeholder="How are you expanding relationships — exec access, new business units, new stakeholders?"
            />
          </div>
        </div>
      </div>

      {/* ── Card 2: Account Tables ── */}
      <div className="section-card">
        <div className="section-card-header">
          <div className="section-card-title">
            <div className="section-card-icon">🏢</div>
            Account Opportunities
          </div>
          <div className="section-card-subtitle">Map your highest-potential new logo and whitespace opportunities.</div>
        </div>

        <div className="subsection-label">Exciting Prospects</div>
        <TableInput
          columns={PROSPECTS_COLS}
          rows={data.excitingProspects}
          onChange={rows => update('excitingProspects', rows)}
          addLabel="Add Prospect"
        />

        <div className="section-divider" />

        <div className="subsection-label">Client Whitespace</div>
        <TableInput
          columns={WHITESPACE_COLS}
          rows={data.clientWhitespace}
          onChange={rows => update('clientWhitespace', rows)}
          addLabel="Add Whitespace Account"
        />
      </div>

      {/* ── Card 3: Retention ── */}
      <div className="section-card">
        <div className="section-card-header">
          <div className="section-card-title">
            <div className="section-card-icon">🔒</div>
            Retention
          </div>
          <div className="section-card-subtitle">Protect and grow your base — what's at stake and how you'll defend it.</div>
        </div>

        <div className="form-grid form-grid-4">
          <div className="form-group">
            <label className="form-label">Renewals Count</label>
            <input
              className="form-input"
              type="text"
              value={data.retention.renewalsCount}
              onChange={e => nest('retention', 'renewalsCount', e.target.value)}
              placeholder="# of renewals in H1"
            />
          </div>
          <div className="form-group">
            <label className="form-label">ACV at Stake ($)</label>
            <input
              className="form-input"
              type="text"
              value={data.retention.acvAtStake}
              onChange={e => nest('retention', 'acvAtStake', e.target.value)}
              placeholder="e.g. $450,000"
            />
          </div>
          <div className="form-group">
            <label className="form-label">At-Risk Count</label>
            <input
              className="form-input"
              type="text"
              value={data.retention.atRiskCount}
              onChange={e => nest('retention', 'atRiskCount', e.target.value)}
              placeholder="# of at-risk accounts"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Retention Commitment</label>
            <input
              className="form-input"
              type="text"
              value={data.retention.retentionCommitment}
              onChange={e => nest('retention', 'retentionCommitment', e.target.value)}
              placeholder="e.g. 95% NRR"
            />
          </div>
        </div>

        <div className="section-divider" />

        <div className="subsection-label">Plan of Attack</div>
        <div className="form-grid form-grid-3">
          <div className="form-group">
            <label className="form-label">Exec Engagement</label>
            <textarea
              className="form-textarea md"
              value={data.retention.execEngagement}
              onChange={e => nest('retention', 'execEngagement', e.target.value)}
              placeholder="How are you getting executive sponsors involved in at-risk accounts?"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Commercial Levers</label>
            <textarea
              className="form-textarea md"
              value={data.retention.commercialLevers}
              onChange={e => nest('retention', 'commercialLevers', e.target.value)}
              placeholder="Pricing flexibility, term structure, bundling strategies…"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Support Needed</label>
            <textarea
              className="form-textarea md"
              value={data.retention.supportNeeded}
              onChange={e => nest('retention', 'supportNeeded', e.target.value)}
              placeholder="What do you need from leadership, CS, or SE to close the risk gap?"
            />
          </div>
        </div>

        <div className="section-divider" />

        <div className="subsection-label">At-Risk Account Tracker</div>
        <TableInput
          columns={ATRISK_COLS}
          rows={data.atRiskTracker}
          onChange={rows => update('atRiskTracker', rows)}
          addLabel="Add At-Risk Account"
        />
      </div>

      {/* ── Card 4: Q1 Fast Start ── */}
      <div className="section-card">
        <div className="section-card-header">
          <div className="section-card-title">
            <div className="section-card-icon">⚡</div>
            Q1 Fast Start
          </div>
          <div className="section-card-subtitle">
            Your top 3 concrete actions to lock in momentum by <strong style={{ color: 'var(--accent-text)' }}>April 30</strong>.
          </div>
        </div>

        <div className="form-grid form-grid-3">
          {[1, 2, 3].map(n => (
            <div className="form-group" key={n}>
              <label className="form-label">Action {n} (by Apr 30)</label>
              <textarea
                className="form-textarea md"
                value={data.q1FastStart[`action${n}`]}
                onChange={e => nest('q1FastStart', `action${n}`, e.target.value)}
                placeholder={`Specific, measurable action #${n} with a clear owner and outcome…`}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
