import { useState } from 'react'
import API from '../services/api'

const AskAI = ({ resumeId }) => {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [loading, setLoading] = useState(false)
  const [asked, setAsked] = useState(false)

  const suggestions = [
    "How can I improve my experience section?",
    "What skills should I add for a backend role?",
    "How do I make my resume ATS-friendly?",
    "What's missing from my resume?",
  ]

  const handleAsk = async (q) => {
    const finalQ = q || question
    if (!finalQ.trim()) return

    setLoading(true)
    setAsked(true)
    setAnswer('')

    try {
      const res = await API.post(
        `/resume/${resumeId}/ask`,
        { question: finalQ }
      )
      setAnswer(res.data.answer)
    } catch {
      setAnswer('Sorry, could not get a response. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-2xl p-6 
                    shadow-sm border border-slate-100">
      {/* Header */}
      <div className="flex items-center gap-2 mb-6">
        <span className="text-xl">💬</span>
        <p className="font-semibold text-slate-700">
          Ask AI About Your Resume
        </p>
      </div>

      {/* Suggestion chips */}
      <div className="flex flex-wrap gap-2 mb-4">
        {suggestions.map(s => (
          <button
            key={s}
            onClick={() => {
              setQuestion(s)
              handleAsk(s)
            }}
            className="text-xs px-3 py-1.5 rounded-full
                       bg-blue-50 text-blue-600
                       border border-blue-200
                       hover:bg-blue-100 transition font-medium"
          >
            {s}
          </button>
        ))}
      </div>

      {/* Input */}
      <div className="flex gap-3">
        <input
          type="text"
          value={question}
          onChange={e => setQuestion(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleAsk()}
          placeholder="Ask anything about your resume..."
          className="flex-1 px-4 py-3 border border-slate-200
                     rounded-xl text-sm text-slate-800
                     placeholder-slate-400
                     focus:outline-none focus:border-blue-500
                     focus:ring-2 focus:ring-blue-100 transition"
        />
        <button
          onClick={() => handleAsk()}
          disabled={loading || !question.trim()}
          className="px-6 py-3 bg-blue-600 text-white
                     rounded-xl font-semibold text-sm
                     hover:bg-blue-700 transition
                     disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {loading ? '...' : 'Ask →'}
        </button>
      </div>

      {/* Answer */}
      {asked && (
        <div className="mt-4 p-4 bg-slate-50 rounded-xl
                        border border-slate-200">
          {loading ? (
            <div className="flex items-center gap-2 
                            text-slate-400 text-sm">
              <span className="animate-spin">⏳</span>
              AI is thinking...
            </div>
          ) : (
            <div>
              <p className="text-xs text-slate-400 mb-2 
                            font-medium">
                🤖 AI Response:
              </p>
              <p className="text-sm text-slate-700 
                            leading-relaxed">
                {answer}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default AskAI