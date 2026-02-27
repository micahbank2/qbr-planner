const ASK_GROUPS = [
  {
    key: 'leadershipAsks',
    icon: '👔',
    title: 'Leadership',
    subtitle: 'VP Sales / CRO',
    placeholder: 'Deal sponsorship, territory changes, headcount, escalation support, strategic guidance…'
  },
  {
    key: 'gtmDealDesk',
    icon: '📋',
    title: 'GTM / Deal Desk',
    subtitle: 'Pricing & deal structure',
    placeholder: 'Custom pricing approval, contract flexibility, multi-year structure support, CPQ help…'
  },
  {
    key: 'marketing',
    icon: '📣',
    title: 'Marketing',
    subtitle: 'Demand gen & content',
    placeholder: 'Executive events, account-specific content, case studies, field marketing support, co-sell plays…'
  },
  {
    key: 'solutionsEngineering',
    icon: '🔬',
    title: 'Solutions Engineering',
    subtitle: 'Technical & demo support',
    placeholder: 'Custom POC support, deep-dive demos, technical workshops, competitive positioning, RFP help…'
  }
]

export default function Section4({ data, onChange }) {
  const update = (key, val) => onChange({ ...data, [key]: val })

  return (
    <div className="section-card">
      <div className="section-card-header">
        <div className="section-card-title">
          <div className="section-card-icon">🙋</div>
          Big Asks
        </div>
        <div className="section-card-subtitle">
          Be specific about what you need from each team to hit your H1 targets. This is your chance to surface blockers.
        </div>
      </div>

      <div className="form-grid form-grid-2">
        {ASK_GROUPS.map(group => (
          <div
            key={group.key}
            style={{
              background: 'var(--bg-3)',
              border: '1px solid var(--border-1)',
              borderRadius: 'var(--radius-md)',
              padding: 20,
              display: 'flex',
              flexDirection: 'column',
              gap: 12
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: 'var(--bg-4)',
                  border: '1px solid var(--border-1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 15,
                  flexShrink: 0
                }}
              >
                {group.icon}
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-0)' }}>{group.title}</div>
                <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 1 }}>{group.subtitle}</div>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Your Ask</label>
              <textarea
                className="form-textarea lg"
                value={data[group.key]}
                onChange={e => update(group.key, e.target.value)}
                placeholder={group.placeholder}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
