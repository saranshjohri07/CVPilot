import { useState, useEffect } from 'react'

const STORAGE_KEY = 'cvpilot_goals'

const priorityConfig = {
  high:   { emoji: '🔴', label: 'High',   color: 'text-red-500' },
  medium: { emoji: '🟡', label: 'Medium', color: 'text-yellow-500' },
  low:    { emoji: '🟢', label: 'Low',    color: 'text-green-500' },
}

const GoalTracker = () => {
  const [goals, setGoals] = useState([])
  const [filter, setFilter] = useState('all')
  const [text, setText] = useState('')
  const [deadline, setDeadline] = useState('')
  const [priority, setPriority] = useState('medium')

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) setGoals(JSON.parse(saved))
  }, [])

  // Save to localStorage
  const save = (updated) => {
    setGoals(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }

  const addGoal = () => {
    if (!text.trim()) return
    const newGoal = {
      id: Date.now(),
      text: text.trim(),
      deadline,
      priority,
      done: false,
      createdAt: new Date().toISOString()
    }
    save([...goals, newGoal])
    setText('')
    setDeadline('')
    setPriority('medium')
  }

  const toggleDone = (id) => {
    save(goals.map(g => g.id === id ? { ...g, done: !g.done } : g))
  }

  const deleteGoal = (id) => {
    save(goals.filter(g => g.id !== id))
  }

  const filtered = goals.filter(g => {
    if (filter === 'active') return !g.done
    if (filter === 'completed') return g.done
    return true
  })

  const completedCount = goals.filter(g => g.done).length

  return (
    <div className="bg-white rounded-2xl p-6 
                    shadow-sm border border-slate-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <span className="text-xl">🎯</span>
          <p className="font-semibold text-slate-700">
            Goal Tracker
          </p>
        </div>
        <span className="text-xs text-slate-400 font-medium">
          {completedCount}/{goals.length} completed
        </span>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-6">
        {['all', 'active', 'completed'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-xs px-4 py-1.5 rounded-full 
                        font-medium capitalize transition
                        ${filter === f
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                        }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Goals list */}
      <div className="space-y-3 mb-6 min-h-16">
        {filtered.length === 0 ? (
          <p className="text-center text-slate-400 text-sm py-4">
            {filter === 'all'
              ? 'No goals yet. Add your first one below ↓'
              : `No ${filter} goals`}
          </p>
        ) : (
          filtered.map(goal => {
            const p = priorityConfig[goal.priority] || priorityConfig.medium
            return (
              <div key={goal.id}
                   className="flex items-start gap-3 p-3
                              border border-slate-100 rounded-xl
                              hover:border-slate-200 transition group">
                {/* Checkbox */}
                <input
                  type="checkbox"
                  checked={goal.done}
                  onChange={() => toggleDone(goal.id)}
                  className="mt-0.5 w-4 h-4 accent-blue-600 
                             cursor-pointer flex-shrink-0"
                />

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium 
                                 ${goal.done
                                   ? 'line-through text-slate-400'
                                   : 'text-slate-700'}`}>
                    {goal.text}
                  </p>
                  <div className="flex items-center gap-3 mt-1">
                    {goal.deadline && (
                      <span className="text-xs text-slate-400">
                        Due {new Date(goal.deadline).toLocaleDateString()}
                      </span>
                    )}
                    <span className={`text-xs ${p.color}`}>
                      {p.emoji} {p.label}
                    </span>
                  </div>
                </div>

                {/* Delete */}
                <button
                  onClick={() => deleteGoal(goal.id)}
                  className="opacity-0 group-hover:opacity-100
                             text-slate-300 hover:text-red-400
                             transition text-lg leading-none
                             flex-shrink-0"
                >
                  ×
                </button>
              </div>
            )
          })
        )}
      </div>

      {/* Add goal form */}
      <div className="border-t border-slate-100 pt-4 space-y-3">
        <input
          type="text"
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addGoal()}
          placeholder="Add a new goal..."
          className="w-full px-4 py-2.5 border border-slate-200
                     rounded-xl text-sm text-slate-800
                     placeholder-slate-400
                     focus:outline-none focus:border-blue-500
                     focus:ring-2 focus:ring-blue-100 transition"
        />
        <div className="flex gap-2">
          <input
            type="date"
            value={deadline}
            onChange={e => setDeadline(e.target.value)}
            className="flex-1 px-3 py-2 border border-slate-200
                       rounded-xl text-sm text-slate-600
                       focus:outline-none focus:border-blue-500 transition"
          />
          <select
            value={priority}
            onChange={e => setPriority(e.target.value)}
            className="px-3 py-2 border border-slate-200
                       rounded-xl text-sm text-slate-600
                       focus:outline-none focus:border-blue-500 transition"
          >
            <option value="high">🔴 High</option>
            <option value="medium">🟡 Medium</option>
            <option value="low">🟢 Low</option>
          </select>
          <button
            onClick={addGoal}
            disabled={!text.trim()}
            className="px-5 py-2 bg-blue-600 text-white
                       rounded-xl text-sm font-semibold
                       hover:bg-blue-700 transition
                       disabled:opacity-40"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  )
}

export default GoalTracker