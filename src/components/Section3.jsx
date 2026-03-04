export default function Section3({ data, onChange }) {
  const update = (key, val) => onChange({ ...data, [key]: val })

  const bets = [
    {
      key: 'bigBetDeal',
      title: 'The Deal / Account',
      subtitle: 'Your signature win this half',
      placeholder: 'Which deal or account is your big bet? What\'s the ACV, stage, and why do you believe you can close it this half? What\'s the play?',
    },
    {
      key: 'bigBetCapability',
      title: 'The Capability',
      subtitle: 'New product you\'re betting on',
      placeholder: 'What new Yext capability or product are you planning to lead with in H1? How are you learning it and how are you bringing it to customers?',
    },
    {
      key: 'bigBetMilestone',
      title: 'The Milestone',
      subtitle: 'What proves you\'ve leveled up',
      placeholder: 'What\'s the milestone that would prove — to yourself and to leadership — that you\'ve arrived at the next level? How will you know when you\'ve hit it?',
    },
  ]

  return (
    <div className="section-card">
      <div className="section-card-header">
        <div className="section-card-title">Big Bets</div>
        <div className="section-card-subtitle">
          The three bets you're making in H1 — on a deal, a capability, and a milestone. Be specific and ambitious.
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {bets.map(bet => (
          <div
            key={bet.key}
            style={{
              background: 'var(--bg-1)',
              border: '1px solid var(--border-1)',
              borderRadius: 'var(--radius-md)',
              padding: 20,
              display: 'flex',
              flexDirection: 'column',
              gap: 12
            }}
          >
            <div style={{ borderBottom: '1px solid var(--border-0)', paddingBottom: 10 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-0)' }}>{bet.title}</div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>{bet.subtitle}</div>
            </div>
            <div className="form-group" style={{ flex: 1 }}>
              <textarea
                className="form-textarea"
                style={{ minHeight: 160 }}
                value={data[bet.key]}
                onChange={e => update(bet.key, e.target.value)}
                placeholder={bet.placeholder}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
