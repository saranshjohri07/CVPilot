import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts'

const MiniGauge = ({ label, value, color }) => {
  const data = [{ value, fill: color }]

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-24 h-24">
        <ResponsiveContainer width="100%" height="100%">
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="65%"
            outerRadius="100%"
            startAngle={90}
            endAngle={-270}
            data={data}
          >
            <RadialBar
              dataKey="value"
              cornerRadius={6}
              background={{ fill: '#F1F5F9' }}
              max={100}
            />
          </RadialBarChart>
        </ResponsiveContainer>

        <div className="absolute inset-0 flex items-center 
                        justify-center">
          <span className="text-lg font-black"
                style={{ color }}>
            {value}
          </span>
        </div>
      </div>
      <p className="text-xs font-medium text-slate-500 
                    mt-2 text-center">
        {label}
      </p>
    </div>
  )
}

const SubScoresPanel = ({ subScores }) => {
  const scores = [
    { label: "Skills Match", key: "skills",   color: "#3B82F6" },
    { label: "Keywords",     key: "keywords", color: "#8B5CF6" },
    { label: "Format",       key: "format",   color: "#10B981" },
    { label: "Experience",   key: "experience", color: "#F59E0B" },
  ]

  return (
    <div className="bg-white rounded-2xl p-6 
                    shadow-sm border border-slate-100">
      <p className="text-slate-700 font-semibold mb-6">
        Score Breakdown
      </p>
      <div className="grid grid-cols-2 gap-6">
        {scores.map(s => (
          <MiniGauge
            key={s.key}
            label={s.label}
            value={subScores?.[s.key] || 0}
            color={s.color}
          />
        ))}
      </div>
    </div>
  )
}

export default SubScoresPanel