export function calcCompletion(formData) {
  if (!formData) return { overall: 0, sections: [0, 0, 0, 0] }
  const s1 = formData.section1 || {}
  const s2 = formData.section2 || {}
  const s3 = formData.section3 || {}
  const s4 = formData.section4 || {}

  const f = v => !!(v && String(v).trim().length > 0)
  const t = arr => Array.isArray(arr) && arr.length > 0

  const s1Checks = [
    f(s1.h1Target),
    f(s1.netNewPipeline?.pipelineMix), f(s1.netNewPipeline?.creativeApproach), f(s1.netNewPipeline?.buildPlan),
    f(s1.clientExpansion?.playsRunning), f(s1.clientExpansion?.educationGap), f(s1.clientExpansion?.gettingDeeper),
    t(s1.excitingProspects), t(s1.clientWhitespace),
    f(s1.retention?.renewalsCount), f(s1.retention?.acvAtStake), f(s1.retention?.atRiskCount),
    f(s1.retention?.retentionCommitment),
    f(s1.retention?.execEngagement), f(s1.retention?.commercialLevers), f(s1.retention?.supportNeeded),
    t(s1.atRiskTracker),
    f(s1.q1FastStart?.action1), f(s1.q1FastStart?.action2), f(s1.q1FastStart?.action3)
  ]
  const s2Checks = [f(s2.headlineNarrative), f(s2.movingUpmarket), f(s2.oneThingOwn)]
  const s3Checks = [f(s3.bigBetDeal), f(s3.bigBetCapability), f(s3.bigBetMilestone)]
  const s4Checks = [f(s4.leadershipAsks), f(s4.gtmDealDesk), f(s4.marketing), f(s4.solutionsEngineering)]

  const pct = checks => Math.round(checks.filter(Boolean).length / checks.length * 100)
  const sec1 = pct(s1Checks)
  const sec2 = pct(s2Checks)
  const sec3 = pct(s3Checks)
  const sec4 = pct(s4Checks)
  const overall = Math.round((sec1 + sec2 + sec3 + sec4) / 4)

  return { overall, sections: [sec1, sec2, sec3, sec4] }
}

export default function ProgressBar({ formData }) {
  const { overall, sections } = calcCompletion(formData)

  return (
    <div className="progress-bar-container">
      <span className="progress-label">Progress</span>
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${overall}%` }} />
      </div>
      <div className="progress-sections">
        {sections.map((pct, i) => (
          <div key={i} className="progress-section-pip" title={`Section ${i + 1}: ${pct}%`}>
            <div className={`progress-pip-dot ${pct === 100 ? 'complete' : pct > 0 ? 'partial' : ''}`} />
          </div>
        ))}
      </div>
      <span className="progress-pct">{overall}%</span>
    </div>
  )
}
