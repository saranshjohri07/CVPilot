import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import API from '../services/api'

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
        setError('Could not load results')
        setLoading(false)
      })
  }, [id])

  if (loading) return (
    <div className="min-h-screen flex items-center 
                    justify-center">
      <div className="text-center">
        <div className="text-4xl mb-4">⏳</div>
        <p className="text-slate-500">Loading results...</p>
      </div>
    </div>
  )

  if (error) return (
    <div className="min-h-screen flex items-center 
                    justify-center">
      <p className="text-red-500">{error}</p>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => navigate('/upload')}
            className="text-slate-500 hover:text-blue-600 
                       transition text-sm font-medium">
            ← Upload Another
          </button>
          <span className="text-slate-400 text-sm">
            {data?.filename}
          </span>
        </div>

        {/* ATS Score */}
        <div className="bg-white rounded-2xl p-8 
                        shadow-sm border border-slate-100 mb-6
                        text-center">
          <p className="text-slate-500 text-sm mb-2">
            ATS Compatibility Score
          </p>
          <div className={`text-7xl font-black mb-2
            ${data?.ats_score >= 70 ? 'text-green-500' :
              data?.ats_score >= 40 ? 'text-yellow-500' :
              'text-red-500'}`}>
            {data?.ats_score}
          </div>
          <p className="text-slate-400 text-sm">out of 100</p>
          <p className="mt-3 font-medium text-slate-600">
            {data?.ats_score >= 70
              ? '✅ Strong resume!'
              : data?.ats_score >= 40
              ? '⚠️ Needs improvement'
              : '❌ Significant work needed'}
          </p>
        </div>

        {/* Keywords Grid */}
        <div className="grid grid-cols-2 gap-6 mb-6">

          {/* Matched */}
          <div className="bg-white rounded-2xl p-6 
                          shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-4">
              ✅ Matched Keywords
              <span className="ml-2 text-green-500 
                               text-sm font-normal">
                ({data?.matched_keywords?.length})
              </span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {data?.matched_keywords?.map(kw => (
                <span key={kw}
                      className="bg-green-50 text-green-700 
                                 text-xs px-3 py-1 rounded-full
                                 font-medium border border-green-200">
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* Missing */}
          <div className="bg-white rounded-2xl p-6 
                          shadow-sm border border-slate-100">
            <h3 className="font-bold text-slate-800 mb-4">
              ❌ Missing Keywords
              <span className="ml-2 text-red-400 
                               text-sm font-normal">
                ({data?.missing_keywords?.length})
              </span>
            </h3>
            <div className="flex flex-wrap gap-2">
              {data?.missing_keywords?.slice(0,20).map(kw => (
                <span key={kw}
                      className="bg-red-50 text-red-600 
                                 text-xs px-3 py-1 rounded-full
                                 font-medium border border-red-200">
                  {kw}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Job Matches */}
        <div className="bg-white rounded-2xl p-6 
                        shadow-sm border border-slate-100">
          <h3 className="font-bold text-slate-800 mb-4">
            💼 Top Job Matches
          </h3>
          <div className="space-y-4">
            {data?.job_matches?.map((job, i) => (
              <div key={i}
                   className="border border-slate-100 
                              rounded-xl p-4">
                <div className="flex items-center 
                                justify-between mb-2">
                  <span className="font-semibold text-slate-800">
                    {job.role}
                  </span>
                  <span className={`text-sm font-bold px-3 py-1 
                                   rounded-full
                    ${job.match_percent >= 60
                      ? 'bg-green-50 text-green-600'
                      : job.match_percent >= 30
                      ? 'bg-yellow-50 text-yellow-600'
                      : 'bg-red-50 text-red-500'}`}>
                    {job.match_percent}% match
                  </span>
                </div>
                {/* Progress bar */}
                <div className="w-full bg-slate-100 
                                rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full 
                               transition-all"
                    style={{width: `${job.match_percent}%`}}
                  />
                </div>
                {/* Missing skills */}
                {job.missing_skills?.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {job.missing_skills.slice(0,5).map(s => (
                      <span key={s}
                            className="text-xs text-slate-400 
                                       bg-slate-50 px-2 py-0.5 
                                       rounded-full">
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default Result