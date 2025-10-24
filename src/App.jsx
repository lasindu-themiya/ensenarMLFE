import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PredictionForm from './components/PredictionForm';
import Alert from './components/Alert';
import { checkHealth } from './services/api';

function App() {
  const [apiStatus, setApiStatus] = useState(null);

  useEffect(() => {
    // Check API health on mount
    const checkApiHealth = async () => {
      try {
        await checkHealth();
        setApiStatus('connected');
      } catch (error) {
        setApiStatus('disconnected');
      }
    };

    checkApiHealth();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 neural-bg">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Header */}
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-800/50 border-b border-gray-700/50 backdrop-blur-md sticky top-0 z-50 shadow-lg shadow-purple-500/10"
      >
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/30">
                <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold gradient-text">Ensenar</h1>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-gray-400 text-sm">Guide to Your OWN Success</p>
                  <span className="ai-badge">🤖 Neural Network</span>
                </div>
              </div>
            </motion.div>
            <motion.div 
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <div className={`w-3 h-3 rounded-full ${apiStatus === 'connected' ? 'bg-green-500' : 'bg-red-500'} animate-pulse shadow-lg ${apiStatus === 'connected' ? 'shadow-green-500/50' : 'shadow-red-500/50'}`}></div>
              <span className={`text-sm font-medium ${apiStatus === 'connected' ? 'text-green-400' : 'text-red-400'}`}>
                {apiStatus === 'connected' ? '✓ API Connected' : '✗ API Disconnected'}
              </span>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 relative z-10">
        {apiStatus === 'disconnected' && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Alert 
              type="warning" 
              message="Cannot connect to the backend API. Please ensure the server is running on http://localhost:5000"
            />
          </motion.div>
        )}

        <div className="max-w-5xl mx-auto">
          <PredictionForm />
        </div>
      </main>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-gray-800/30 border-t border-gray-700/50 mt-16 backdrop-blur-sm relative z-10"
      >
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div>
              <h3 className="text-white font-semibold mb-2 flex items-center justify-center md:justify-start gap-2">
                <span className="text-purple-400">🚀</span> Powered By
              </h3>
              <p className="text-gray-400 text-sm">Machine Learning & Deep Learning</p>
              <p className="text-gray-500 text-xs mt-1">Neural Network Architecture</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2 flex items-center justify-center md:justify-start gap-2">
                <span className="text-blue-400">📊</span> Features
              </h3>
              <p className="text-gray-400 text-sm">Grade Prediction</p>
              <p className="text-gray-400 text-sm">AI Recommendations</p>
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2 flex items-center justify-center md:justify-start gap-2">
                <span className="text-cyan-400">🎓</span> Coverage
              </h3>
              <p className="text-gray-400 text-sm">Multiple Subjects</p>
              <p className="text-gray-400 text-sm">All Streams Supported</p>
            </div>
          </div>
          <div className="text-center mt-6 pt-6 border-t border-gray-700/50">
            <p className="text-gray-500 text-sm">© 2025 Ensenar - Guide to Your OWN Success</p>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}

export default App;
