const JobMatchCards = ({ matches }) => {
  if (!matches || matches.length === 0) return null

  const getColor = (percent) => {
    if (percent >= 60) return { bg: 'bg-green-50', text: 'text-green-700', bar: 'bg-green-500' }
    if (percent >= 30) return { bg: 'bg-yellow-50', text: 'text-yellow-700', bar: 'bg-yellow-500' }
    return { bg: 'bg-red-50', text: 'text-red-600', bar: 'bg-red-400' }
  }

  return (
    <div className="bg-white rounded-2xl p-6 
                    shadow-sm border border-slate-100">
      <div className="flex items-center gap-2 mb-6">
        <span className="text-xl">💼</span>
        <p className="font-semibold text-slate-700">
          Top Job Matches
        </p>
      </div>

      <div className="space-y-4">
        {matches.map((job, i) => {
          const colors = getColor(job.match_percent)
          return (
            <div key={i}
                 className="border border-slate-100 
                            rounded-xl p-4 hover:border-blue-200 
                            transition">
              {/* Role + percentage */}
              <div className="flex items-center 
                              justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold 
                                   text-slate-400">
                    #{i + 1}
                  </span>
                  <span className="font-semibold text-slate-800">
                    {job.role}
                  </span>
                </div>
                <span className={`text-sm font-bold px-3 py-1 
                                  rounded-full ${colors.bg} 
                                  ${colors.text}`}>
                  {job.match_percent}% match
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-100 
                              rounded-full h-2 mb-3">
                <div
                  className={`h-2 rounded-full transition-all 
                              ${colors.bar}`}
                  style={{ width: `${job.match_percent}%` }}
                />
              </div>

              {/* Missing skills */}
              {job.missing_skills?.length > 0 && (
                <div>
                  <p className="text-xs text-slate-400 mb-2">
                    Skills to add:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {job.missing_skills.slice(0, 6).map(s => (
                      <span key={s}
                            className="text-xs text-slate-500 
                                       bg-slate-50 px-2 py-0.5 
                                       rounded-full border 
                                       border-slate-200">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default JobMatchCards