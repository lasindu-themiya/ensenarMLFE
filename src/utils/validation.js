// Validation rules
export const VALIDATION_RULES = {
  marks: {
    min: 0,
    max: 100,
    message: 'Marks must be between 0 and 100'
  },
  hours: {
    min: 0,
    max: 24,
    message: 'Hours must be between 0 and 24'
  },
  sleepHours: {
    min: 0,
    max: 24,
    message: 'Sleep hours must be between 0 and 24'
  },
  studyHours: {
    min: 0,
    max: 24,
    message: 'Study hours must be between 0 and 24'
  },
  socialMediaHours: {
    min: 0,
    max: 24,
    message: 'Social media hours must be between 0 and 24'
  },
  pastPapersCount: {
    min: 0,
    max: 100,
    message: 'Past papers count must be between 0 and 100'
  },
  distractionLevel: {
    min: 1,
    max: 5,
    message: 'Must be between 1 and 5'
  },
  consistency: {
    min: 1,
    max: 5,
    message: 'Must be between 1 and 5'
  }
};

// Validate a field
export const validateField = (name, value, rules = VALIDATION_RULES) => {
  const rule = rules[name];
  if (!rule) return null;

  const numValue = parseFloat(value);
  
  if (isNaN(numValue)) {
    return 'Please enter a valid number';
  }
  
  if (numValue < rule.min || numValue > rule.max) {
    return rule.message;
  }
  
  return null;
};

// Validate all required fields
export const validateFormData = (formData) => {
  const errors = {};
  
  // Required fields - matches backend requirements
  const requiredFields = [
    'Stream', 'Subject', 'Gender', 'Medium', 'Social Media Platform',
    'Daily Usage', 'Notification Status', 'Distraction Level',
    'Sleep Hours', 'Timing Behavior', 'Study Hours', 'Consistency',
    'Recent Past Paper', 'Past Papers Count', 'Avg Five Papers'
  ];
  
  requiredFields.forEach(field => {
    if (!formData[field] || formData[field] === '') {
      errors[field] = 'This field is required';
    }
  });
  
  // Numeric validations
  const numericFields = {
    'Daily Usage': 'socialMediaHours',
    'Distraction Level': 'distractionLevel',
    'Sleep Hours': 'sleepHours',
    'Study Hours': 'studyHours',
    'Consistency': 'consistency',
    'Past Papers Count': 'pastPapersCount',
    'Recent Past Paper': 'marks',
    'Avg Five Papers': 'marks'
  };
  
  Object.entries(numericFields).forEach(([fieldName, validationKey]) => {
    const value = formData[fieldName];
    if (value !== undefined && value !== '') {
      const error = validateField(validationKey, value);
      if (error) {
        errors[fieldName] = error;
      }
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
