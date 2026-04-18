import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts'

const ScoreGauge = ({ score }) => {
  const getColor = (score) => {
    if (score >= 70) return '#10B981' // green
    if (score >= 40) return '#F59E0B' // yellow
    return '#EF4444'                  // red
  }

  const getMessage = (score) => {
    if (score >= 70) return 'Strong resume! Minor improvements needed.'
    if (score >= 40) return 'Average. Several improvements recommended.'
    return 'Needs significant work before applying.'
  }

  const color = getColor(score)
  const data = [{ value: score, fill: color }]

  return (
    <div className="bg-white rounded-2xl p-6 
                    shadow-sm border border-slate-100
                    flex flex-col items-center">
      <p className="text-slate-500 text-sm font-medium mb-4">
        ATS Compatibility Score
      </p>

      {/* Circular gauge */}
      <div className="relative w-48 h-48">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="70%"
            outerRadius="100%"
            startAngle={90}
            endAngle={-270}
            data={data}
          >
            <RadialBar
              dataKey="value"
              cornerRadius={10}
              background={{ fill: '#F1F5F9' }}
              max={100}
            />
          </RadialBarChart>
        </ResponsiveContainer>

        {/* Score in center */}
        <div className="absolute inset-0 flex flex-col 
                        items-center justify-center">
          <span className="text-5xl font-black"
                style={{ color }}>
            {score}
          </span>
          <span className="text-slate-400 text-xs mt-1">
            out of 100
          </span>
        </div>
      </div>

      {/* Message */}
      <p className="text-center text-sm font-medium 
                    text-slate-600 mt-4 max-w-xs">
        {getMessage(score)}
      </p>
    </div>
  )
}

export default ScoreGauge