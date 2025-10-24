export default function FormSelect({ 
  label, 
  name, 
  value, 
  onChange, 
  options, 
  error, 
  placeholder = 'Select an option',
  required = false,
  disabled = false
}) {
  return (
    <div className="space-y-1">
      <label htmlFor={name} className="label-text">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className={`select-field ${error ? 'border-red-500 focus:ring-red-500' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-sm text-red-400 mt-1">{error}</p>
      )}
    </div>
  );
}
