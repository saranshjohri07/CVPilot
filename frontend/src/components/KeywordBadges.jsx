const KeywordBadges = ({ matched, missing }) => {
  return (
    <div className="bg-white rounded-2xl p-6 
                    shadow-sm border border-slate-100">
      <div className="grid grid-cols-2 gap-6">

        {/* Matched */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">✅</span>
            <p className="font-semibold text-slate-700">
              Matched Keywords
            </p>
            <span className="ml-auto text-xs font-bold 
                             text-green-600 bg-green-50 
                             px-2 py-0.5 rounded-full">
              {matched?.length || 0}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {matched?.map(kw => (
              <span key={kw}
                    className="text-xs px-3 py-1 rounded-full
                               bg-green-50 text-green-700
                               border border-green-200 font-medium">
                {kw}
              </span>
            ))}
          </div>
        </div>

        {/* Missing */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">❌</span>
            <p className="font-semibold text-slate-700">
              Missing Keywords
            </p>
            <span className="ml-auto text-xs font-bold 
                             text-red-500 bg-red-50 
                             px-2 py-0.5 rounded-full">
              {missing?.length || 0}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {missing?.slice(0, 24).map(kw => (
              <span key={kw}
                    title="Adding this keyword can improve your score"
                    className="text-xs px-3 py-1 rounded-full
                               bg-red-50 text-red-600
                               border border-red-200 font-medium
                               cursor-help">
                {kw}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

export default KeywordBadges