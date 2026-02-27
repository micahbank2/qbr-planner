import { useState, useEffect, useCallback, useRef } from 'react'
import { doc, setDoc, getDoc, serverTimestamp, collection, getDocs } from 'firebase/firestore'
import { db } from './firebase'
import AEView from './components/AEView'
import ManagerView from './components/ManagerView'

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
  const [loadingName, setLoadingName] = useState(false)
  const [managerLoading, setManagerLoading] = useState(false)
  const saveTimerRef = useRef(null)

  const saveToFirestore = useCallback(async (data, name) => {
    if (!name) return
    setSaveStatus('saving')
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
      setSaveStatus('error')
      setTimeout(() => setSaveStatus('idle'), 4000)
    }
  }, [])

  useEffect(() => {
    if (!nameSubmitted || !aeName) return
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current)
    saveTimerRef.current = setTimeout(() => {
      saveToFirestore(formData, aeName)
    }, 900)
    return () => clearTimeout(saveTimerRef.current)
  }, [formData, nameSubmitted, aeName, saveToFirestore])

  const handleNameSubmit = async () => {
    const trimmed = aeName.trim()
    if (!trimmed) return
    setLoadingName(true)
    try {
      const docRef = doc(db, 'ae-plans', trimmed)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        const { name: _n, lastUpdated: _l, ...rest } = docSnap.data()
        setFormData(deepMerge(initialData, rest))
      }
    } catch (err) {
      console.error('Load error:', err)
    }
    setLoadingName(false)
    setNameSubmitted(true)
  }

  const fetchAllAEs = async () => {
    setManagerLoading(true)
    try {
      const snapshot = await getDocs(collection(db, 'ae-plans'))
      const data = snapshot.docs.map(d => d.data())
      setAllAEs(data.sort((a, b) => (a.name || '').localeCompare(b.name || '')))
    } catch (err) {
      console.error('Fetch error:', err)
    }
    setManagerLoading(false)
  }

  const handleManagerView = () => {
    fetchAllAEs()
    setView('manager')
  }

  return (
    <div className="app">
      <header className="header">
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
            {saveStatus === 'saved' && <span className="save-status saved">✓ Saved</span>}
            {saveStatus === 'error' && <span className="save-status error">Save failed</span>}
            <button
              className="btn btn-outline btn-sm"
              onClick={view === 'manager' ? () => setView('ae') : handleManagerView}
            >
              {view === 'manager' ? '← AE View' : 'Manager View'}
            </button>
          </div>
        </div>
      </header>

      <main className="main">
        {view === 'ae' ? (
          <AEView
            aeName={aeName}
            setAeName={setAeName}
            nameSubmitted={nameSubmitted}
            loadingName={loadingName}
            onNameSubmit={handleNameSubmit}
            formData={formData}
            setFormData={setFormData}
          />
        ) : (
          <ManagerView allAEs={allAEs} loading={managerLoading} onRefresh={fetchAllAEs} />
        )}
      </main>
    </div>
  )
}
