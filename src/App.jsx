import { useState, useEffect } from 'react';
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="bg-gray-800/50 border-b border-gray-700 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary-400">Ensenar ML</h1>
              <p className="text-gray-400 text-sm mt-1">Student Performance Prediction System</p>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full ${apiStatus === 'connected' ? 'bg-green-500' : 'bg-red-500'} animate-pulse`}></div>
              <span className="text-sm text-gray-400">
                {apiStatus === 'connected' ? 'API Connected' : 'API Disconnected'}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {apiStatus === 'disconnected' && (
          <div className="mb-6">
            <Alert 
              type="warning" 
              message="Cannot connect to the backend API. Please ensure the server is running on http://localhost:5000"
            />
          </div>
        )}

        <div className="max-w-5xl mx-auto">
          <PredictionForm />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800/30 border-t border-gray-700 mt-16">
        <div className="container mx-auto px-4 py-6 text-center text-gray-500 text-sm">
          <p>© 2025 Ensenar ML - Powered by Machine Learning & Deep Learning</p>
          <p className="mt-2">
            Predicting student performance across multiple subjects using advanced ML algorithms
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
