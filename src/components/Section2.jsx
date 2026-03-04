export default function Section2({ data, onChange }) {
  const update = (key, val) => onChange({ ...data, [key]: val })

  return (
    <div className="section-card">
      <div className="section-card-header">
        <div className="section-card-title">Your Story</div>
        <div className="section-card-subtitle">
          Craft the narrative that anchors your H1. Make it specific, honest, and compelling.
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Headline Story / Narrative</label>
        <textarea
          className="form-textarea xl"
          value={data.headlineNarrative}
          onChange={e => update('headlineNarrative', e.target.value)}
          placeholder="What's the story of your H1? Set the scene — where are you coming from, what's changed, and where are you headed? Write it like you'd tell it in a room…"
        />
        <span className="form-hint">Think of this as your QBR opening statement. Be specific and direct.</span>
      </div>

      <div className="section-divider" />

      <div className="form-grid form-grid-2">
        <div className="form-group">
          <label className="form-label">What Moving Upmarket Means to You</label>
          <textarea
            className="form-textarea lg"
            value={data.movingUpmarket}
            onChange={e => update('movingUpmarket', e.target.value)}
            placeholder="How does the upmarket push change your day-to-day, your deal size, your approach to prospecting and closing? What are you doing differently?"
          />
        </div>
        <div className="form-group">
          <label className="form-label">The One Thing You'll Own in H1</label>
          <textarea
            className="form-textarea lg"
            value={data.oneThingOwn}
            onChange={e => update('oneThingOwn', e.target.value)}
            placeholder="If you could only be remembered for one thing this half — one outcome, one deal, one capability — what would it be and why?"
          />
        </div>
      </div>
    </div>
  )
}
