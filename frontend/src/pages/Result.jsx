import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import API from '../services/api'
import ScoreGauge from '../components/ScoreGauge'
import SubScoresPanel from '../components/SubScoresPanel'
import KeywordBadges from '../components/KeywordBadges'
import JobMatchCards from '../components/JobMatchCards'
import FeedbackCards from '../components/FeedbackCards'
import AskAI from '../components/AskAI'
import GoalTracker from '../components/GoalTracker'

const Result = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    API.get(`/resume/${id}`)
      .then(res => {
        setData(res.data)
        setLoading(false)
      })
      .catch(() => {
        setError('Could not load results. Please try again.')
        setLoading(false)
      })
  }, [id])

  if (loading) return (
    <div className="min-h-screen flex items-center 
                    justify-center bg-slate-50">
      <div className="text-center">
        <div className="text-5xl mb-4 animate-bounce">🧠</div>
        <p className="text-slate-500 font-medium">
          Loading your analysis...
        </p>
      </div>
    </div>
  )

  if (error) return (
    <div className="min-h-screen flex items-center 
                    justify-center bg-slate-50">
      <div className="text-center">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => navigate('/upload')}
          className="text-blue-600 underline text-sm">
          Try uploading again
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/upload')}
            className="flex items-center gap-2 text-slate-500 
                       hover:text-blue-600 transition 
                       text-sm font-medium">
            ← Upload Another Resume
          </button>
          <span className="text-slate-400 text-sm">
            📄 {data?.filename}
          </span>
        </div>

        {/* ROW 1: Score + Sub-scores */}
        <div className="grid grid-cols-1 md:grid-cols-2 
                        gap-6 mb-6">
          <ScoreGauge score={data?.ats_score || 0} />
          <SubScoresPanel subScores={data?.sub_scores} />
        </div>

        {/* ROW 2: Keywords */}
        <div className="mb-6">
          <KeywordBadges
            matched={data?.matched_keywords}
            missing={data?.missing_keywords}
          />
        </div>

        {/* ROW 3: Job Matches + AI Feedback */}
        <div className="grid grid-cols-1 md:grid-cols-2 
                        gap-6 mb-6">
          <JobMatchCards matches={data?.job_matches} />
          <FeedbackCards feedback={data?.feedback} />
        </div>

        {/* ROW 4: Ask AI */}
        <div className="mb-6">
          <AskAI resumeId={id} />
        </div>

        {/* ROW 5: Goal Tracker */}
        <div className="mb-6">
          <GoalTracker />
        </div>

      </div>
    </div>
  )
}

export default Result