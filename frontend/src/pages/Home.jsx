import { useEffect, useState } from 'react'
import { checkHealth } from '../services/api'

const Home = () => {
  const [apiStatus, setApiStatus] = useState('Checking API...')
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    checkHealth()
      .then(res => {
        setApiStatus(`✅ API Connected — ${res.data.app} v${res.data.version}`)
        setIsConnected(true)
      })
      .catch(() => {
        setApiStatus('❌ API Offline — start your FastAPI server')
        setIsConnected(false)
      })
  }, [])

  return (
    <div className="min-h-screen flex items-center 
                    justify-center bg-slate-50">
      <div className="text-center max-w-2xl px-6">

        {/* Logo */}
        <div className="inline-flex items-center gap-2 mb-6">
          <div className="w-12 h-12 bg-blue-600 rounded-xl 
                          flex items-center justify-center">
            <span className="text-white font-black text-xl">C</span>
          </div>
          <span className="text-3xl font-bold text-slate-800">
            CVPilot
          </span>
        </div>

        {/* Hero */}
        <h1 className="text-5xl font-black text-slate-900 
                       mb-4 leading-tight">
          Know Your Resume.
          <span className="text-blue-600"> Land Your Role.</span>
        </h1>

        <p className="text-lg text-slate-500 mb-10">
          AI-powered ATS scoring, skill gap analysis, 
          and job matching — in 30 seconds.
        </p>

        {/* CTAs */}
        <div className="flex gap-4 justify-center mb-12">
          <button className="bg-blue-600 text-white px-8 
                             py-3 rounded-xl font-semibold 
                             text-lg hover:bg-blue-700 
                             transition shadow-lg">
            Analyze My Resume
          </button>
          <button className="border-2 border-slate-200 
                             text-slate-600 px-8 py-3 
                             rounded-xl font-semibold text-lg
                             hover:border-blue-300 
                             hover:text-blue-600 transition">
            How It Works
          </button>
        </div>

        {/* 3 Steps */}
        <div className="grid grid-cols-3 gap-6 mb-12">
          {[
            { icon: '📤', step: '1', label: 'Upload PDF' },
            { icon: '🤖', step: '2', label: 'AI Analyzes' },
            { icon: '📊', step: '3', label: 'Get Results' },
          ].map(item => (
            <div key={item.step}
                 className="bg-white rounded-2xl p-6 
                            shadow-sm border border-slate-100">
              <div className="text-3xl mb-2">{item.icon}</div>
              <div className="text-xs font-bold text-blue-500 
                              uppercase tracking-wider mb-1">
                Step {item.step}
              </div>
              <div className="font-semibold text-slate-700">
                {item.label}
              </div>
            </div>
          ))}
        </div>

        {/* API Status Badge */}
        <div className={`text-sm px-4 py-2 rounded-full 
                        inline-block font-medium
                        ${isConnected
                          ? 'bg-green-50 text-green-600'
                          : 'bg-red-50 text-red-500'}`}>
          {apiStatus}
        </div>

      </div>
    </div>
  )
}

export default Home