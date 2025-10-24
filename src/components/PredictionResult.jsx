export default function PredictionResult({ result, onReset }) {
  if (!result) return null;

  const getGradeColor = (grade) => {
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

  return (
    <div className="card p-8 space-y-6 animate-fade-in">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-primary-400 mb-2">Prediction Results</h2>
        <p className="text-gray-400">Based on your input data</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-700/50 rounded-lg p-6 text-center">
          <p className="text-gray-400 text-sm uppercase tracking-wide mb-2">Predicted Grade</p>
          <p className={`text-5xl font-bold ${getGradeColor(result.predicted_grade)}`}>
            {result.predicted_grade}
          </p>
        </div>

        <div className="bg-gray-700/50 rounded-lg p-6 text-center">
          <p className="text-gray-400 text-sm uppercase tracking-wide mb-2">Confidence</p>
          <p className={`text-5xl font-bold ${getConfidenceColor(result.confidence * 100)}`}>
            {(result.confidence * 100).toFixed(2)}%
          </p>
        </div>
      </div>

      {result.probabilities && (
        <div className="bg-gray-700/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-200 mb-4">Grade Probabilities</h3>
          <div className="space-y-3">
            {Object.entries(result.probabilities)
              .sort(([, a], [, b]) => b - a)
              .map(([grade, probability]) => {
                const percentValue = probability * 100;
                return (
                  <div key={grade} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300 font-medium">Grade {grade}</span>
                      <span className={`font-semibold ${grade === result.predicted_grade ? 'text-primary-400' : 'text-gray-400'}`}>
                        {percentValue.toFixed(2)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-600 rounded-full h-2.5">
                      <div
                        className={`h-2.5 rounded-full transition-all duration-500 ${
                          grade === result.predicted_grade ? 'bg-primary-500' : 'bg-gray-500'
                        }`}
                        style={{ width: `${percentValue}%` }}
                      />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}

      {result.feature_importance && (
        <div className="bg-gray-700/50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-200 mb-4">Key Factors</h3>
          <div className="space-y-2 text-sm">
            {Object.entries(result.feature_importance)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 5)
              .map(([feature, importance]) => (
                <div key={feature} className="flex justify-between text-gray-300">
                  <span>{feature}</span>
                  <span className="text-primary-400">{(importance * 100).toFixed(1)}%</span>
                </div>
              ))}
          </div>
        </div>
      )}

      <div className="flex justify-center pt-4">
        <button onClick={onReset} className="btn-secondary">
          Make Another Prediction
        </button>
      </div>
    </div>
  );
}
