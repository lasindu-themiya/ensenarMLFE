import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingSpinner from './LoadingSpinner';
import Alert from './Alert';
import { getDeepLearningRecommendation } from '../services/api';
import RecommendationResult from './RecommendationResult';

export default function DeepLearningRecommendation({ formData }) {
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [result, setResult] = useState(null);
  const [showRecommendation, setShowRecommendation] = useState(false);

  const handleGetRecommendation = async () => {
    setAlert(null);
    setLoading(true);

    try {
      const response = await getDeepLearningRecommendation(formData);
      setResult(response.prediction);
      setShowRecommendation(true);
      setAlert({ type: 'success', message: 'AI Recommendations generated successfully!' });
    } catch (error) {
      setAlert({ type: 'error', message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShowRecommendation(false);
    setResult(null);
    setAlert(null);
  };

  if (showRecommendation && result) {
    return <RecommendationResult result={result} onClose={handleClose} />;
  }

  return (
    <div className="mt-6">
      {alert && (
        <div className="mb-4">
          <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />
        </div>
      )}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-purple-500/30 rounded-xl p-6"
      >
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
          </div>
          
          <div className="flex-1">
            <h3 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
              🚀 AI-Powered Recommendations
              <span className="text-xs bg-purple-500 text-white px-2 py-1 rounded-full">Deep Learning</span>
            </h3>
            <p className="text-gray-300 mb-4">
              Get personalized improvement strategies powered by our advanced 5-layer neural network. 
              Discover your path to Grade A with data-driven insights!
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
              <div className="bg-black/30 rounded-lg p-3">
                <div className="text-2xl mb-1">🎯</div>
                <div className="text-sm text-gray-400">Priority Actions</div>
                <div className="text-white font-semibold">Ranked by Impact</div>
              </div>
              <div className="bg-black/30 rounded-lg p-3">
                <div className="text-2xl mb-1">📈</div>
                <div className="text-sm text-gray-400">Success Projection</div>
                <div className="text-white font-semibold">With Improvements</div>
              </div>
              <div className="bg-black/30 rounded-lg p-3">
                <div className="text-2xl mb-1">⏱️</div>
                <div className="text-sm text-gray-400">Action Timeline</div>
                <div className="text-white font-semibold">Week-by-Week</div>
              </div>
            </div>

            <button
              onClick={handleGetRecommendation}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Analyzing with AI...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  Get AI Recommendations
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
