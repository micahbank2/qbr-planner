export default function Section3({ data, onChange }) {
  const update = (key, val) => onChange({ ...data, [key]: val })

  return (
    <div className="section-card">
      <div className="section-card-header">
        <div className="section-card-title">
          <div className="section-card-icon">🎲</div>
          Big Bets
        </div>
        <div className="section-card-subtitle">
          The three bets you're making in H1 — on a deal, a capability, and a milestone. Be specific and ambitious.
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 20
        }}
      >
        <div
          style={{
            background: 'var(--bg-3)',
            border: '1px solid rgba(43,122,61,0.15)',
            borderRadius: 'var(--radius-md)',
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 12
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 9,
                background: 'var(--accent-dim)',
                border: '1px solid rgba(43,122,61,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18
              }}
            >🏆</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-0)' }}>The Deal / Account</div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>Your signature win this half</div>
            </div>
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label className="form-label">Account &amp; Deal</label>
            <textarea
              className="form-textarea"
              style={{ minHeight: 160 }}
              value={data.bigBetDeal}
              onChange={e => update('bigBetDeal', e.target.value)}
              placeholder="Which deal or account is your big bet? What's the ACV, stage, and why do you believe you can close it this half? What's the play?"
            />
          </div>
        </div>

        <div
          style={{
            background: 'var(--bg-3)',
            border: '1px solid rgba(43,122,61,0.15)',
            borderRadius: 'var(--radius-md)',
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 12
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 9,
                background: 'var(--accent-dim)',
                border: '1px solid rgba(43,122,61,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18
              }}
            >⚙️</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-0)' }}>The Capability</div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>New product you're betting on</div>
            </div>
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label className="form-label">Capability Bet</label>
            <textarea
              className="form-textarea"
              style={{ minHeight: 160 }}
              value={data.bigBetCapability}
              onChange={e => update('bigBetCapability', e.target.value)}
              placeholder="What new Yext capability or product are you planning to lead with in H1? How are you learning it and how are you bringing it to customers?"
            />
          </div>
        </div>

        <div
          style={{
            background: 'var(--bg-3)',
            border: '1px solid rgba(43,122,61,0.15)',
            borderRadius: 'var(--radius-md)',
            padding: 24,
            display: 'flex',
            flexDirection: 'column',
            gap: 12
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 9,
                background: 'var(--accent-dim)',
                border: '1px solid rgba(43,122,61,0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18
              }}
            >🚩</div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-0)' }}>The Milestone</div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>What proves you've leveled up</div>
            </div>
          </div>
          <div className="form-group" style={{ flex: 1 }}>
            <label className="form-label">Milestone</label>
            <textarea
              className="form-textarea"
              style={{ minHeight: 160 }}
              value={data.bigBetMilestone}
              onChange={e => update('bigBetMilestone', e.target.value)}
              placeholder="What's the milestone that would prove — to yourself and to leadership — that you've arrived at the next level? How will you know when you've hit it?"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
