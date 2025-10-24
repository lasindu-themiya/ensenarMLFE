import { motion } from 'framer-motion';
import DeepLearningRecommendation from './DeepLearningRecommendation';

export default function PredictionResult({ result, onReset, formData }) {
  if (!result) return null;

  const getGradeColor = (grade) => {
    if (grade === 'A') return 'from-green-400 to-emerald-500';
    if (grade === 'B') return 'from-blue-400 to-cyan-500';
    if (grade === 'C') return 'from-yellow-400 to-orange-500';
    return 'from-red-400 to-pink-500';
  };

  const getGradeTextColor = (grade) => {
    if (grade === 'A') return 'text-green-400';
    if (grade === 'B') return 'text-blue-400';
    if (grade === 'C') return 'text-yellow-400';
    return 'text-red-400';
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return 'text-green-400';
    if (confidence >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getConfidenceBg = (confidence) => {
    if (confidence >= 80) return 'from-green-500/20 to-emerald-500/20 border-green-500/30';
    if (confidence >= 60) return 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30';
    return 'from-red-500/20 to-pink-500/20 border-red-500/30';
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header with AI Badge */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 mb-3">
          <span className="ai-badge">🤖 ML Prediction</span>
          <span className="ai-badge">📊 Analyzed</span>
        </div>
        <h2 className="text-4xl font-bold gradient-text mb-2">Prediction Results</h2>
        <p className="text-gray-400">AI-powered analysis based on your data</p>
      </motion.div>

      {/* Main Results Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Predicted Grade Card */}
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`card p-8 text-center relative overflow-hidden bg-gradient-to-br ${getConfidenceBg(result.confidence * 100)} border`}
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white to-transparent rounded-full blur-2xl"></div>
          </div>
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-2 mb-3">
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              <p className="text-gray-400 text-sm uppercase tracking-wide font-semibold">Predicted Grade</p>
            </div>
            <motion.p 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
              className={`text-7xl font-bold ${getGradeTextColor(result.predicted_grade)} mb-2`}
            >
              {result.predicted_grade}
            </motion.p>
            <div className={`inline-block px-4 py-1 rounded-full bg-gradient-to-r ${getGradeColor(result.predicted_grade)} text-white text-sm font-semibold`}>
              Most Likely Outcome
            </div>
          </div>
        </motion.div>

        {/* Confidence Card */}
        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="card p-8 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-purple-500 to-transparent rounded-full blur-2xl"></div>
          </div>
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-2 mb-3">
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p className="text-gray-400 text-sm uppercase tracking-wide font-semibold">Model Confidence</p>
            </div>
            <motion.p 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              className={`text-7xl font-bold ${getConfidenceColor(result.confidence * 100)} mb-2`}
            >
              {(result.confidence * 100).toFixed(1)}%
            </motion.p>
            <div className="w-full bg-gray-700 rounded-full h-3 mt-4">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${result.confidence * 100}%` }}
                transition={{ delay: 0.6, duration: 1 }}
                className={`h-3 rounded-full bg-gradient-to-r ${getGradeColor(result.predicted_grade)}`}
              ></motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {result.probabilities && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="card p-6"
        >
          <h3 className="section-header">
            Grade Probabilities
          </h3>
          <div className="space-y-4">
            {Object.entries(result.probabilities)
              .sort(([, a], [, b]) => b - a)
              .map(([grade, probability], index) => {
                const percentValue = probability * 100;
                return (
                  <motion.div
                    key={grade}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="space-y-2"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${grade === result.predicted_grade ? getGradeColor(grade) : 'from-gray-600 to-gray-700'} flex items-center justify-center font-bold text-white shadow-lg`}>
                          {grade}
                        </div>
                        <span className="text-gray-300 font-medium">Grade {grade}</span>
                      </div>
                      <div className="text-right">
                        <span className={`font-bold text-lg ${grade === result.predicted_grade ? getGradeTextColor(grade) : 'text-gray-400'}`}>
                          {percentValue.toFixed(2)}%
                        </span>
                      </div>
                    </div>
                    <div className="relative w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentValue}%` }}
                        transition={{ delay: 0.6 + index * 0.1, duration: 0.8 }}
                        className={`h-3 rounded-full ${
                          grade === result.predicted_grade 
                            ? `bg-gradient-to-r ${getGradeColor(grade)} shadow-lg` 
                            : 'bg-gray-600'
                        }`}
                      />
                    </div>
                  </motion.div>
                );
              })}
          </div>
        </motion.div>
      )}

      {result.feature_importance && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="card p-6 bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-purple-500/30"
        >
          <h3 className="section-header">
            🎯 Key Influencing Factors
          </h3>
          <div className="space-y-3">
            {Object.entries(result.feature_importance)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 5)
              .map(([feature, importance], index) => (
                <motion.div
                  key={feature}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg hover:bg-gray-800/70 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                      {index + 1}
                    </div>
                    <span className="text-gray-300 font-medium">{feature}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-24 bg-gray-700 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${importance * 100}%` }}
                        transition={{ delay: 0.7 + index * 0.1, duration: 0.8 }}
                        className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500"
                      />
                    </div>
                    <span className="text-purple-400 font-bold min-w-[50px] text-right">{(importance * 100).toFixed(1)}%</span>
                  </div>
                </motion.div>
              ))}
          </div>
        </motion.div>
      )}

      {/* Deep Learning Recommendations */}
      {formData && <DeepLearningRecommendation formData={formData} />}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="flex justify-center pt-4"
      >
        <button 
          onClick={onReset} 
          className="btn-secondary flex items-center gap-2"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Make Another Prediction
        </button>
      </motion.div>
    </motion.div>
  );
}
