import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'CRITICAL': return 'from-red-500 to-red-600';
    case 'HIGH': return 'from-orange-500 to-orange-600';
    case 'MEDIUM': return 'from-yellow-500 to-yellow-600';
    default: return 'from-blue-500 to-blue-600';
  }
};

const getStatusColor = (status) => {
  switch (status) {
    case 'CRITICAL': return 'text-red-400';
    case 'EXCELLENT': return 'text-green-400';
    case 'GOOD': return 'text-blue-400';
    case 'MODERATE': return 'text-yellow-400';
    default: return 'text-gray-400';
  }
};

const CircularProgress = ({ percentage, size = 200, strokeWidth = 12 }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const offset = circumference - (percentage / 100) * circumference;
  
  const getColor = (percent) => {
    if (percent >= 75) return '#10b981'; // green
    if (percent >= 50) return '#3b82f6'; // blue
    if (percent >= 25) return '#f59e0b'; // yellow
    return '#ef4444'; // red
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#374151"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColor(percentage)}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          style={{
            strokeDasharray: circumference,
          }}
        />
      </svg>
      <div className="absolute text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="text-4xl font-bold"
          style={{ color: getColor(percentage) }}
        >
          {percentage.toFixed(1)}%
        </motion.div>
      </div>
    </div>
  );
};

export default function RecommendationResult({ result, onClose }) {
  const [selectedTab, setSelectedTab] = useState('overview');
  const currentProb = parseFloat(result.grade_a_probability) * 100;
  const projectedProb = result.combined_effect ? parseFloat(result.combined_effect.projected_probability.replace('%', '')) : currentProb;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 py-8"
    >
      {/* Print-only header */}
      <div className="print-header hidden">
        <h1 className="text-3xl font-bold text-purple-900">Ensenar - AI Performance Analysis Report</h1>
        <p className="text-gray-700 mt-2">Guide to Your OWN Success</p>
        <p className="text-sm text-gray-600 mt-1">Generated on {new Date().toLocaleDateString()}</p>
      </div>

      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 mb-8 text-white shadow-2xl"
        >
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
                🎓 Your Personalized Success Plan
                <span className="text-sm bg-white/20 px-3 py-1 rounded-full">AI Analysis</span>
              </h1>
              <p className="text-purple-100 text-lg">
                Deep Learning Neural Network • 5-Layer Architecture (128-64-32-16-1)
              </p>
            </div>
            <button
              onClick={onClose}
              className="bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </motion.div>

        {/* Status Overview */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          {/* Current Status */}
          <div className="card p-6 text-center">
            <h3 className="text-gray-400 text-sm uppercase mb-4">Current Status</h3>
            <CircularProgress percentage={currentProb} size={160} />
            <div className={`mt-4 text-2xl font-bold ${getStatusColor(result.status)}`}>
              {result.status}
            </div>
            <div className="text-gray-400 mt-2">{result.predicted_grade}</div>
          </div>

          {/* Projected Status */}
          {result.combined_effect && (
            <div className="card p-6 text-center bg-gradient-to-br from-green-500/10 to-blue-500/10 border-green-500/30">
              <h3 className="text-gray-400 text-sm uppercase mb-4">With Improvements</h3>
              <CircularProgress percentage={projectedProb} size={160} />
              <div className="mt-4 text-2xl font-bold text-green-400">
                {projectedProb >= 75 ? 'EXCELLENT' : 'IMPROVED'}
              </div>
              <div className="text-green-400 mt-2">Grade A Likely!</div>
            </div>
          )}

          {/* Improvement Potential */}
          {result.combined_effect && (
            <div className="card p-6">
              <h3 className="text-gray-400 text-sm uppercase mb-6">Improvement Potential</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-400">Total Gain</span>
                    <span className="text-green-400 font-bold">{result.combined_effect.total_improvement}</span>
                  </div>
                  <div className="h-3 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((projectedProb - currentProb) / 100 * 100, 100)}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className="h-full bg-gradient-to-r from-green-500 to-blue-500"
                    />
                  </div>
                </div>
                <div className="text-center pt-4">
                  <div className="text-3xl font-bold text-white mb-2">
                    {currentProb.toFixed(1)}% → {projectedProb}%
                  </div>
                  <div className="text-sm text-gray-400">Probability of Grade A</div>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Action Plan */}
        {result.combined_effect && (
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="card p-8 mb-8 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-blue-500/30"
          >
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              🎯 {result.combined_effect.action_plan}
            </h2>
            <p className="text-gray-300 text-lg mb-4">
              <strong>Timeline:</strong> {result.combined_effect.timeline}
            </p>
          </motion.div>
        )}

        {/* Tabs */}
        <div className="mb-6 flex gap-4 border-b border-gray-700 no-print">
          <button
            onClick={() => setSelectedTab('overview')}
            className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
              selectedTab === 'overview'
                ? 'border-purple-500 text-purple-400'
                : 'border-transparent text-gray-400 hover:text-gray-300'
            }`}
          >
            📊 Overview
          </button>
          <button
            onClick={() => setSelectedTab('recommendations')}
            className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
              selectedTab === 'recommendations'
                ? 'border-purple-500 text-purple-400'
                : 'border-transparent text-gray-400 hover:text-gray-300'
            }`}
          >
            🚀 Recommendations
          </button>
          <button
            onClick={() => setSelectedTab('tips')}
            className={`px-6 py-3 font-semibold transition-colors border-b-2 ${
              selectedTab === 'tips'
                ? 'border-purple-500 text-purple-400'
                : 'border-transparent text-gray-400 hover:text-gray-300'
            }`}
          >
            💡 Success Tips
          </button>
        </div>

        {/* Tab Content - Show all in print */}
        <div className="print:block hidden print-all-tabs">
          {/* Overview Section */}
          {result.current_status_analysis && (
            <div className="space-y-6 mb-8 print-section">
              <h2 className="text-2xl font-bold text-white mb-4">📊 Current Status Analysis</h2>
              <div className="card p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(result.current_status_analysis.key_factors).map(([key, factor], index) => (
                    <div
                      key={key}
                      className="bg-gray-800/50 rounded-lg p-4 border border-gray-700"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-white capitalize">
                          {key.replace(/_/g, ' ')}
                        </h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          factor.status === 'GOOD' ? 'bg-green-500/20 text-green-400' :
                          factor.status === 'MODERATE' ? 'bg-yellow-500/20 text-yellow-400' :
                          factor.status === 'LOW' || factor.status === 'BELOW OPTIMAL' ? 'bg-red-500/20 text-red-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {factor.status}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm">{factor.impact}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Recommendations Section */}
          {result.prioritized_recommendations && (
            <div className="space-y-4 mb-8 print-section">
              <h2 className="text-2xl font-bold text-white mb-4">🚀 Priority Recommendations</h2>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 mb-4">
                <p className="text-blue-300 text-sm">
                  <strong>{result.prioritized_recommendations.length} AI-identified recommendation{result.prioritized_recommendations.length !== 1 ? 's' : ''}</strong> - The most impactful areas for your improvement
                </p>
              </div>
              {result.prioritized_recommendations.map((rec, index) => (
                <div
                  key={index}
                  className="card p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br ${getPriorityColor(rec.priority)} rounded-lg flex items-center justify-center text-white font-bold text-lg`}>
                      #{index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-white">{rec.feature}</h3>
                          <span className={`inline-block mt-1 text-xs px-3 py-1 rounded-full ${
                            rec.priority === 'CRITICAL' ? 'bg-red-500/20 text-red-400' :
                            rec.priority === 'HIGH' ? 'bg-orange-500/20 text-orange-400' :
                            'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {rec.priority} Priority
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-400">{rec.improvement}</div>
                          <div className="text-xs text-gray-400">Improvement</div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-800/50 rounded-lg p-4 mb-3">
                        <div className="grid grid-cols-2 gap-4 mb-3">
                          <div>
                            <div className="text-xs text-gray-400 mb-1">Current</div>
                            <div className="text-white font-semibold">{rec.current}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-400 mb-1">Suggested</div>
                            <div className="text-green-400 font-semibold">{rec.suggested}</div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-300">
                          <strong className="text-white">Why: </strong>{rec.reason}
                        </div>
                      </div>

                      <div className="flex items-center justify-between bg-blue-500/10 rounded-lg p-3 border border-blue-500/30">
                        <span className="text-sm text-gray-300">New Success Rate:</span>
                        <span className="text-lg font-bold text-blue-400">{rec.new_probability}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Success Tips Section */}
          {result.combined_effect?.success_tips && (
            <div className="mb-8 print-section">
              <h2 className="text-2xl font-bold text-white mb-4">💡 Success Tips</h2>
              <div className="card p-8">
                <div className="space-y-4">
                  {result.combined_effect.success_tips.map((tip, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 bg-gray-800/50 rounded-lg p-4"
                    >
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <p className="text-gray-300 text-lg flex-1">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Tab Content - Interactive (screen only) */}
        <div className="print:hidden">
        <AnimatePresence mode="wait">
          {selectedTab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              {result.current_status_analysis && (
                <div className="card p-6">
                  <h3 className="text-xl font-bold text-white mb-6">Current Status Analysis</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(result.current_status_analysis.key_factors).map(([key, factor], index) => (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-gray-800/50 rounded-lg p-4 border border-gray-700"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-white capitalize">
                            {key.replace(/_/g, ' ')}
                          </h4>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            factor.status === 'GOOD' ? 'bg-green-500/20 text-green-400' :
                            factor.status === 'MODERATE' ? 'bg-yellow-500/20 text-yellow-400' :
                            factor.status === 'LOW' || factor.status === 'BELOW OPTIMAL' ? 'bg-red-500/20 text-red-400' :
                            'bg-gray-500/20 text-gray-400'
                          }`}>
                            {factor.status}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm">{factor.impact}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {selectedTab === 'recommendations' && result.prioritized_recommendations && (
            <motion.div
              key="recommendations"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-4"
            >
              {/* Info message about recommendation count */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-4"
              >
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <div className="flex-1">
                    <p className="text-blue-300 text-sm font-medium">
                      <strong>AI Analysis:</strong> {result.prioritized_recommendations.length} prioritized recommendation{result.prioritized_recommendations.length !== 1 ? 's' : ''} identified
                    </p>
                    <p className="text-blue-400/80 text-xs mt-1">
                      Our neural network has identified the most impactful areas for improvement based on your specific data. 
                      {result.prioritized_recommendations.length < 5 && " Some subjects may have fewer recommendations when current performance is already strong in certain areas."}
                    </p>
                  </div>
                </div>
              </motion.div>

              {result.prioritized_recommendations.map((rec, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card p-6 hover:shadow-xl transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className={`flex-shrink-0 w-12 h-12 bg-gradient-to-br ${getPriorityColor(rec.priority)} rounded-lg flex items-center justify-center text-white font-bold text-lg`}>
                      #{index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="text-xl font-bold text-white">{rec.feature}</h3>
                          <span className={`inline-block mt-1 text-xs px-3 py-1 rounded-full ${
                            rec.priority === 'CRITICAL' ? 'bg-red-500/20 text-red-400' :
                            rec.priority === 'HIGH' ? 'bg-orange-500/20 text-orange-400' :
                            'bg-yellow-500/20 text-yellow-400'
                          }`}>
                            {rec.priority} Priority
                          </span>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-green-400">{rec.improvement}</div>
                          <div className="text-xs text-gray-400">Improvement</div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-800/50 rounded-lg p-4 mb-3">
                        <div className="grid grid-cols-2 gap-4 mb-3">
                          <div>
                            <div className="text-xs text-gray-400 mb-1">Current</div>
                            <div className="text-white font-semibold">{rec.current}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-400 mb-1">Suggested</div>
                            <div className="text-green-400 font-semibold">{rec.suggested}</div>
                          </div>
                        </div>
                        <div className="text-sm text-gray-300">
                          <strong className="text-white">Why: </strong>{rec.reason}
                        </div>
                      </div>

                      <div className="flex items-center justify-between bg-blue-500/10 rounded-lg p-3 border border-blue-500/30">
                        <span className="text-sm text-gray-300">New Success Rate:</span>
                        <span className="text-lg font-bold text-blue-400">{rec.new_probability}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}

          {selectedTab === 'tips' && result.combined_effect?.success_tips && (
            <motion.div
              key="tips"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="card p-8"
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                💡 Success Tips for Your Journey
              </h3>
              <div className="space-y-4">
                {result.combined_effect.success_tips.map((tip, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4 bg-gray-800/50 rounded-lg p-4 hover:bg-gray-800/70 transition-colors"
                  >
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <p className="text-gray-300 text-lg flex-1">{tip}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        </div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 flex gap-4 no-print"
        >
          <button
            onClick={onClose}
            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-semibold py-4 px-6 rounded-lg transition-colors"
          >
            ← Back to Form
          </button>
          <button
            onClick={() => window.print()}
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print Report
          </button>
        </motion.div>
      </div>

      {/* Print-only footer */}
      <div className="print-footer hidden">
        <p>© 2025 Ensenar - Guide to Your OWN Success | AI-Powered Performance Analysis</p>
      </div>
    </motion.div>
  );
}
