import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import LoadingSpinner from './LoadingSpinner';
import Alert from './Alert';
import PredictionResult from './PredictionResult';
import { makePrediction } from '../services/api';
import { getSubjectsForStream } from '../utils/subjectMapping';
import { 
  dailyUsageToRange, 
  sleepHoursToCategory, 
  studyHoursToCategory,
  marksToRange,
  pastPapersToCategory
} from '../utils/rangeMappers';
import { validateFormData } from '../utils/validation';

const INITIAL_FORM_STATE = {
  Stream: '',
  Subject: '',
  Gender: '',
  Medium: '',
  'Social Media Platform': '',
  'Daily Usage': '',
  'Notification Status': '',
  'Distraction Level': '',
  'Sleep Hours': '',
  'Timing Behavior': '',
  'Study Hours': '',
  'Consistency': '',
  'Recent Past Paper': '',
  'Past Papers Count': '',
  'Avg Five Papers': ''
};

export default function PredictionForm() {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);
  const [result, setResult] = useState(null);
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [apiFormData, setApiFormData] = useState(null);

  // Update available subjects when stream changes
  useEffect(() => {
    if (formData.Stream) {
      const subjects = getSubjectsForStream(formData.Stream);
      setAvailableSubjects(subjects);
      // Reset subject if it's not in the new stream
      if (formData.Subject && !subjects.includes(formData.Subject)) {
        setFormData(prev => ({ ...prev, Subject: '' }));
      }
    } else {
      setAvailableSubjects([]);
      setFormData(prev => ({ ...prev, Subject: '' }));
    }
  }, [formData.Stream]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlert(null);

    // Validate form
    const validation = validateFormData(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      setAlert({ type: 'error', message: 'Please fix the errors in the form' });
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      // Transform data for API - convert to exact format expected by model
      const apiData = {
        Stream: formData.Stream,
        Subject: formData.Subject,
        Gender: formData.Gender,
        Medium: formData.Medium,
        'Social Media Platform': formData['Social Media Platform'],
        'Daily Usage': dailyUsageToRange(parseFloat(formData['Daily Usage'])),
        'Notification Status': formData['Notification Status'],
        'Distraction Level': parseInt(formData['Distraction Level']),
        'Sleep Hours': sleepHoursToCategory(parseFloat(formData['Sleep Hours'])),
        'Timing Behavior': formData['Timing Behavior'],
        'Study Hours': studyHoursToCategory(parseFloat(formData['Study Hours'])),
        'Consistency': parseInt(formData['Consistency']),
        'Recent Past Paper': marksToRange(parseFloat(formData['Recent Past Paper'])),
        'Past Papers Count': pastPapersToCategory(parseInt(formData['Past Papers Count'])),
        'Avg Five Papers': marksToRange(parseFloat(formData['Avg Five Papers']))
      };

      const response = await makePrediction(formData.Subject, apiData);
      setResult(response.prediction);
      setApiFormData(apiData); // Store the API data for deep learning
      setAlert({ type: 'success', message: 'Prediction completed successfully!' });
    } catch (error) {
      setAlert({ type: 'error', message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM_STATE);
    setErrors({});
    setResult(null);
    setApiFormData(null);
    setAlert(null);
  };

  if (result) {
    return <PredictionResult result={result} onReset={handleReset} formData={apiFormData} />;
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card p-8"
    >
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8 text-center"
      >
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-purple-500/30 animate-pulse-glow">
            <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
            </svg>
          </div>
        </div>
  <h2 className="text-4xl font-bold gradient-text mb-3">Student Performance Prediction</h2>
  <p className="text-gray-400 text-lg">Guide to Your OWN Success</p>
        <div className="flex items-center justify-center gap-2 mt-3">
          <span className="ai-badge">🤖 Machine Learning</span>
          <span className="ai-badge">📊 Data Analysis</span>
          <span className="ai-badge">🎯 Personalized</span>
        </div>
      </motion.div>

      {alert && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <Alert type={alert.type} message={alert.message} onClose={() => setAlert(null)} />
        </motion.div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Stream and Subject Selection */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className="mb-4 flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              1
            </div>
            <h3 className="text-xl font-bold text-white">Academic Details</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-10">
            <FormSelect
              label="Stream"
              name="Stream"
              value={formData.Stream}
              onChange={handleChange}
              options={['Mathematics', 'Biology', 'Commerce']}
              error={errors.Stream}
              placeholder="Select stream"
              required
            />

            <FormSelect
              label="Subject"
              name="Subject"
              value={formData.Subject}
              onChange={handleChange}
              options={availableSubjects}
              error={errors.Subject}
              placeholder={formData.Stream ? 'Select subject' : 'Select stream first'}
              disabled={!formData.Stream}
              required
            />
          </div>
        </motion.div>

        {/* Personal Information */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="border-t border-gray-700/50 pt-6"
        >
          <div className="mb-4 flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              2
            </div>
            <h3 className="text-xl font-bold text-white">Personal Information</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-10">
            <FormSelect
              label="Gender"
              name="Gender"
              value={formData.Gender}
              onChange={handleChange}
              options={['Male', 'Female']}
              error={errors.Gender}
              required
            />

            <FormSelect
              label="Medium"
              name="Medium"
              value={formData.Medium}
              onChange={handleChange}
              options={['Sinhala', 'English']}
              error={errors.Medium}
              required
            />
          </div>
        </motion.div>

        {/* Social Media Usage */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="border-t border-gray-700/50 pt-6"
        >
          <div className="mb-4 flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              3
            </div>
            <h3 className="text-xl font-bold text-white">Social Media Usage</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-10">
            <FormSelect
              label="Social Media Platform"
              name="Social Media Platform"
              value={formData['Social Media Platform']}
              onChange={handleChange}
              options={['Facebook', 'Instagram', 'TikTok', 'WhatsApp', 'YouTube']}
              error={errors['Social Media Platform']}
              required
            />

            <FormInput
              label="Daily Usage (hours)"
              name="Daily Usage"
              type="number"
              value={formData['Daily Usage']}
              onChange={handleChange}
              error={errors['Daily Usage']}
              placeholder="e.g., 3"
              min="0"
              max="24"
              step="0.5"
              required
            />

            <FormSelect
              label="Notification Status"
              name="Notification Status"
              value={formData['Notification Status']}
              onChange={handleChange}
              options={['Always kept on', 'Usually kept on', 'Sometimes turned off', 'Always turned off']}
              error={errors['Notification Status']}
              required
            />

            <FormInput
              label="Distraction Level (1-5)"
              name="Distraction Level"
              type="number"
              value={formData['Distraction Level']}
              onChange={handleChange}
              error={errors['Distraction Level']}
              placeholder="1 = Low, 5 = Very High"
              min="1"
              max="5"
              step="1"
              required
            />
          </div>
        </motion.div>

        {/* Study Habits */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="border-t border-gray-700/50 pt-6"
        >
          <div className="mb-4 flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              4
            </div>
            <h3 className="text-xl font-bold text-white">Study Habits</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pl-10">
            <FormInput
              label="Sleep Hours (per day)"
              name="Sleep Hours"
              type="number"
              value={formData['Sleep Hours']}
              onChange={handleChange}
              error={errors['Sleep Hours']}
              placeholder="e.g., 7"
              min="0"
              max="24"
              step="0.5"
              required
            />

            <FormInput
              label="Study Hours (per day)"
              name="Study Hours"
              type="number"
              value={formData['Study Hours']}
              onChange={handleChange}
              error={errors['Study Hours']}
              placeholder="e.g., 4"
              min="0"
              max="24"
              step="0.5"
              required
            />

            <FormInput
              label="Consistency (1-5)"
              name="Consistency"
              type="number"
              value={formData['Consistency']}
              onChange={handleChange}
              error={errors['Consistency']}
              placeholder="1 = Low, 5 = High"
              min="1"
              max="5"
              step="1"
              required
            />
          </div>
          
          <div className="grid grid-cols-1 gap-6 mt-6 pl-10">
            <FormSelect
              label="Timing Behavior"
              name="Timing Behavior"
              value={formData['Timing Behavior']}
              onChange={handleChange}
              options={[
                'Always completed within the allocated time limit',
                'Usually completed within the time limit',
                'Sometimes exceeded the time limit',
                'Often exceeded the time limit',
                'Always took longer than the allocated time'
              ]}
              error={errors['Timing Behavior']}
              required
            />
          </div>
        </motion.div>

        {/* Past Performance */}
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="border-t border-gray-700/50 pt-6"
        >
          <div className="mb-4 flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-500 rounded-lg flex items-center justify-center text-white font-bold text-sm">
              5
            </div>
            <h3 className="text-xl font-bold text-white">Past Performance</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-10">
            <FormInput
              label="Recent Past Paper (%)"
              name="Recent Past Paper"
              type="number"
              value={formData['Recent Past Paper']}
              onChange={handleChange}
              placeholder="e.g., 75"
              min="0"
              max="100"
              step="0.1"
              error={errors['Recent Past Paper']}
              required
            />

            <FormInput
              label="Past Papers Count"
              name="Past Papers Count"
              type="number"
              value={formData['Past Papers Count']}
              onChange={handleChange}
              error={errors['Past Papers Count']}
              placeholder="e.g., 10"
              min="0"
              max="100"
              step="1"
              required
            />

            <FormInput
              label="Average of Five Papers (%)"
              name="Avg Five Papers"
              type="number"
              value={formData['Avg Five Papers']}
              onChange={handleChange}
              error={errors['Avg Five Papers']}
              placeholder="e.g., 75.5"
              min="0"
              max="100"
              step="0.1"
              required
            />
          </div>
        </motion.div>

        {/* Submit Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex gap-4 pt-6"
        >
          <button type="submit" disabled={loading} className="btn-primary flex-1 flex items-center justify-center gap-2">
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Analyzing with AI...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Predict Performance
              </>
            )}
          </button>
          <button type="button" onClick={handleReset} className="btn-secondary flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Reset
          </button>
        </motion.div>
      </form>

      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8"
        >
          <LoadingSpinner />
        </motion.div>
      )}
    </motion.div>
  );
}
