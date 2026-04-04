import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import API from '../services/api'

const Upload = () => {
  const [file, setFile] = useState(null)
  const [dragging, setDragging] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  // Handle file selection
  const handleFileSelect = (selectedFile) => {
    if (!selectedFile) return

    // Validate PDF only
    if (!selectedFile.name.endsWith('.pdf')) {
      setError('Only PDF files are allowed')
      setFile(null)
      return
    }

    // Validate size (5MB max)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError('File too large. Maximum size is 5MB')
      setFile(null)
      return
    }

    setError('')
    setFile(selectedFile)
  }

  // Drag and drop handlers
  const handleDragOver = (e) => {
    e.preventDefault()
    setDragging(true)
  }

  const handleDragLeave = () => {
    setDragging(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragging(false)
    const droppedFile = e.dataTransfer.files[0]
    handleFileSelect(droppedFile)
  }

  // Upload to backend
  const handleUpload = async () => {
    if (!file) return

    setLoading(true)
    setError('')

    try {
      // FormData needed for file upload
      const formData = new FormData()
      formData.append('file', file)

      const response = await API.post(
        '/resume/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      )

      // Navigate to result page with resume_id
      navigate(`/result/${response.data.resume_id}`)

    } catch (err) {
      setError(
        err.response?.data?.detail ||
        'Upload failed. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 
                    flex items-center justify-center px-4">
      <div className="w-full max-w-xl">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Analyze Your Resume
          </h1>
          <p className="text-slate-500">
            Upload your PDF resume and get your ATS score instantly
          </p>
        </div>

        {/* Upload Box */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-2xl p-12
                      text-center cursor-pointer transition
                      ${dragging
                        ? 'border-blue-500 bg-blue-50'
                        : file
                        ? 'border-green-400 bg-green-50'
                        : 'border-slate-300 bg-white hover:border-blue-400'
                      }`}
          onClick={() => document.getElementById('fileInput').click()}
        >
          {/* Icon */}
          <div className="text-5xl mb-4">
            {file ? '✅' : dragging ? '📂' : '📄'}
          </div>

          {/* Text */}
          {file ? (
            <div>
              <p className="font-semibold text-green-700 text-lg">
                {file.name}
              </p>
              <p className="text-green-600 text-sm mt-1">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
              <p className="text-slate-400 text-sm mt-2">
                Click to change file
              </p>
            </div>
          ) : (
            <div>
              <p className="font-semibold text-slate-700 text-lg">
                Drop your resume here
              </p>
              <p className="text-slate-400 text-sm mt-1">
                or click to browse files
              </p>
              <p className="text-slate-300 text-xs mt-3">
                PDF only • Max 5MB
              </p>
            </div>
          )}

          {/* Hidden file input */}
          <input
            id="fileInput"
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={(e) => handleFileSelect(e.target.files[0])}
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 bg-red-50 border border-red-200
                          text-red-600 text-sm rounded-xl px-4 py-3">
            {error}
          </div>
        )}

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          disabled={!file || loading}
          className="w-full mt-6 bg-blue-600 text-white py-4
                     rounded-xl font-semibold text-lg
                     hover:bg-blue-700 transition
                     disabled:opacity-40 disabled:cursor-not-allowed
                     shadow-lg shadow-blue-100"
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <span className="animate-spin">⏳</span>
              Analyzing your resume...
            </span>
          ) : (
            'Analyze My Resume →'
          )}
        </button>

        {/* Info */}
        <p className="text-center text-xs text-slate-400 mt-4">
          Your resume is analyzed securely and never shared
        </p>

      </div>
    </div>
  )
}

export default Upload