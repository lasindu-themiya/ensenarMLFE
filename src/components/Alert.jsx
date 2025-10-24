export default function Alert({ type = 'info', message, onClose }) {
  const styles = {
    success: 'bg-green-900/50 border-green-500 text-green-100',
    error: 'bg-red-900/50 border-red-500 text-red-100',
    warning: 'bg-yellow-900/50 border-yellow-500 text-yellow-100',
    info: 'bg-blue-900/50 border-blue-500 text-blue-100',
  };

  const icons = {
    success: '✓',
    error: '✕',
    warning: '⚠',
    info: 'ℹ',
  };

  return (
    <div className={`flex items-start p-4 border-l-4 rounded-lg ${styles[type]}`}>
      <span className="text-2xl mr-3">{icons[type]}</span>
      <div className="flex-1">
        <p className="text-sm">{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-4 text-xl hover:opacity-75 transition-opacity"
        >
          ×
        </button>
      )}
    </div>
  );
}
