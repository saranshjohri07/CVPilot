const priorityConfig = {
  high:   { border: 'border-red-500',    bg: 'bg-red-50',    text: 'text-red-600',    emoji: '🔴', label: 'High Priority' },
  medium: { border: 'border-yellow-500', bg: 'bg-yellow-50', text: 'text-yellow-600', emoji: '🟡', label: 'Medium' },
  low:    { border: 'border-green-500',  bg: 'bg-green-50',  text: 'text-green-600',  emoji: '🟢', label: 'Low' },
}

const categoryColors = {
  Skills:     'bg-blue-100 text-blue-700',
  Format:     'bg-purple-100 text-purple-700',
  Keywords:   'bg-orange-100 text-orange-700',
  Experience: 'bg-pink-100 text-pink-700',
  Summary:    'bg-teal-100 text-teal-700',
  General:    'bg-slate-100 text-slate-700',
}

const FeedbackCards = ({ feedback }) => {
  if (!feedback || feedback.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 
                      shadow-sm border border-slate-100">
        <p className="text-slate-400 text-center">
          No feedback available
        </p>
      </div>
    )
  }

  // Sort by priority: high first
  const sorted = [...feedback].sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2 }
    return (order[a.priority] || 1) - (order[b.priority] || 1)
  })

  return (
    <div className="bg-white rounded-2xl p-6 
                    shadow-sm border border-slate-100">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-xl">🤖</span>
        <p className="text-slate-700 font-semibold">
          AI Improvement Tips
        </p>
      </div>

      <div className="space-y-3">
        {sorted.map((item, i) => {
          const p = priorityConfig[item.priority] || priorityConfig.medium
          const catColor = categoryColors[item.category] || categoryColors.General

          return (
            <div key={i}
                 className={`border-l-4 ${p.border} 
                             rounded-r-xl p-4 ${p.bg}`}>
              <div className="flex items-center 
                              justify-between mb-2">
                <span className={`text-xs px-2 py-0.5 
                                  rounded-full font-medium
                                  ${catColor}`}>
                  {item.category}
                </span>
                <span className={`text-xs font-medium ${p.text}`}>
                  {p.emoji} {p.label}
                </span>
              </div>
              <p className="text-sm text-slate-700 
                            font-medium leading-relaxed">
                {item.tip}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FeedbackCards