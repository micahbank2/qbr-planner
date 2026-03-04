import { useState, useEffect, useCallback, useRef } from 'react'
import { doc, setDoc, serverTimestamp, collection, onSnapshot } from 'firebase/firestore'
import { db } from './firebase'
import AEView from './components/AEView'
import ManagerView from './components/ManagerView'
import PresenterView from './components/PresenterView'

const initialData = {
  section1: {
    h1Target: '',
    netNewPipeline: { pipelineMix: '', creativeApproach: '', buildPlan: '' },
    clientExpansion: { playsRunning: '', educationGap: '', gettingDeeper: '' },
    excitingProspects: [],
    clientWhitespace: [],
    retention: {
      renewalsCount: '', acvAtStake: '', atRiskCount: '', retentionCommitment: '',
      execEngagement: '', commercialLevers: '', supportNeeded: ''
    },
    atRiskTracker: [],
    q1FastStart: { action1: '', action2: '', action3: '' }
  },
  section2: { headlineNarrative: '', movingUpmarket: '', oneThingOwn: '' },
  section3: { bigBetDeal: '', bigBetCapability: '', bigBetMilestone: '' },
  section4: { leadershipAsks: '', gtmDealDesk: '', marketing: '', solutionsEngineering: '' }
}

function deepMerge(base, incoming) {
  if (!incoming || typeof incoming !== 'object') return base
  const result = { ...base }
  for (const key of Object.keys(incoming)) {
    if (
      incoming[key] !== null &&
      typeof incoming[key] === 'object' &&
      !Array.isArray(incoming[key]) &&
      typeof base[key] === 'object' &&
      !Array.isArray(base[key])
    ) {
      result[key] = deepMerge(base[key] || {}, incoming[key])
    } else {
      result[key] = incoming[key]
    }
  }
  return result
}

export default function App() {
  const [view, setView] = useState('ae')
  const [aeName, setAeName] = useState('')
  const [nameSubmitted, setNameSubmitted] = useState(false)
  const [formData, setFormData] = useState(initialData)
  const [saveStatus, setSaveStatus] = useState('idle')
  const [allAEs, setAllAEs] = useState([])
  const [managerLoading, setManagerLoading] = useState(false)
  const saveTimerRef = useRef(null)
  const skipSnapshotRef = useRef(false)
  const formDataRef = useRef(formData)
  formDataRef.current = formData

  // ── Real-time AE data listener ──────────────────────────────────────────
  useEffect(() => {
    if (!nameSubmitted || !aeName) return
    const docRef = doc(db, 'ae-plans', aeName.trim())
    const unsub = onSnapshot(docRef, (snap) => {
      // Skip snapshots triggered by our own saves
      if (skipSnapshotRef.current) {
        skipSnapshotRef.current = false
        return
      }
      if (snap.exists()) {
        const { name: _n, lastUpdated: _l, ...rest } = snap.data()
        setFormData(deepMerge(initialData, rest))
      }
    }, (err) => {
      console.error('Snapshot error:', err)
    })
    return () => unsub()
  }, [nameSubmitted, aeName])

  // ── Real-time manager listener ──────────────────────────────────────────
  useEffect(() => {
    if (view !== 'manager') return
    setManagerLoading(true)
    const unsub = onSnapshot(collection(db, 'ae-plans'), (snapshot) => {
      const data = snapshot.docs.map(d => d.data())
      setAllAEs(data.sort((a, b) => (a.name || '').localeCompare(b.name || '')))
      setManagerLoading(false)
    }, (err) => {
      console.error('Manager listener error:', err)
      setManagerLoading(false)
    })
    return () => unsub()
  }, [view])

  // ── Debounced auto-save ─────────────────────────────────────────────────
  const saveToFirestore = useCallback(async (data, name) => {
    if (!name) return
    setSaveStatus('saving')
    skipSnapshotRef.current = true
    try {
      await setDoc(doc(db, 'ae-plans', name), {
        ...data,
        name,
        lastUpdated: serverTimestamp()
      })
      setSaveStatus('saved')
      setTimeout(() => setSaveStatus('idle'), 2500)
    } catch (err) {
      console.error('Save error:', err)
      skipSnapshotRef.current = false
      setSaveStatus('error')
      setTimeout(() => setSaveStatus('idle'), 4000)
    }
  }, [])

  useEffect(() => {
    if (!nameSubmitted || !aeName) return
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
    saveTimerRef.current = setTimeout(() => {
      saveToFirestore(formData, aeName)
    }, 500)
    return () => clearTimeout(saveTimerRef.current)
  }, [formData, nameSubmitted, aeName, saveToFirestore])

  // ── Save immediately on page unload ────────────────────────────────────
  useEffect(() => {
    if (!nameSubmitted || !aeName) return
    const handleUnload = () => {
      if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
      // Best-effort synchronous save via sendBeacon isn't possible with Firestore,
      // so flush the pending save immediately
      saveToFirestore(formDataRef.current, aeName)
    }
    window.addEventListener('beforeunload', handleUnload)
    return () => window.removeEventListener('beforeunload', handleUnload)
  }, [nameSubmitted, aeName, saveToFirestore])

  const handleNameSubmit = async (name) => {
    setNameSubmitted(true)
    // onSnapshot will load existing data automatically once listener is set up
    void name
  }

  return (
    <div className="app">
      <header className={`header${view === 'presenter' ? ' header-hidden-print' : ''}`}>
        <div className="header-inner">
          <div className="header-brand">
            <div className="header-logo">Y</div>
            <div>
              <div className="header-title">H1 FY27 Planning QBR</div>
              <div className="header-subtitle">Sales Team · H1 Fast Start</div>
            </div>
          </div>
          <div className="header-actions">
            {saveStatus === 'saving' && <span className="save-status saving">Saving…</span>}
            {saveStatus === 'saved' && <span className="save-status saved">Saved</span>}
            {saveStatus === 'error' && <span className="save-status error">Save failed</span>}
            {view === 'presenter' ? (
              <button className="btn btn-outline btn-sm" onClick={() => setView('ae')}>
                Back to Editor
              </button>
            ) : view === 'manager' ? (
              <button className="btn btn-outline btn-sm" onClick={() => setView('ae')}>
                AE View
              </button>
            ) : (
              <button className="btn btn-outline btn-sm" onClick={() => setView('manager')}>
                Manager View
              </button>
            )}
          </div>
        </div>
      </header>

      <main className={view === 'presenter' ? 'main-presenter' : 'main'}>
        {view === 'ae' && (
          <AEView
            aeName={aeName}
            setAeName={setAeName}
            nameSubmitted={nameSubmitted}
            onNameSubmit={handleNameSubmit}
            formData={formData}
            setFormData={setFormData}
            onPresent={() => setView('presenter')}
          />
        )}
        {view === 'manager' && (
          <ManagerView allAEs={allAEs} loading={managerLoading} />
        )}
        {view === 'presenter' && (
          <PresenterView aeName={aeName} formData={formData} onBack={() => setView('ae')} />
        )}
      </main>
    </div>
  )
}
