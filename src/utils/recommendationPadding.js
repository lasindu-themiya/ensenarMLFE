/**
 * Pads recommendations to ensure consistent display (5 recommendations)
 * Adds general study tips when fewer than 5 specific recommendations are available
 */

const GENERAL_RECOMMENDATIONS = [
  {
    feature: "Active Learning Techniques",
    priority: "MEDIUM",
    current: "Standard study methods",
    suggested: "Active recall & spaced repetition",
    reason: "Active learning methods like flashcards, teaching others, and spaced repetition significantly improve long-term retention and understanding",
    improvement: "+5-10%",
    new_probability: "Enhanced retention",
    is_general: true
  },
  {
    feature: "Study Environment",
    priority: "MEDIUM",
    current: "Current setup",
    suggested: "Optimized distraction-free zone",
    reason: "A dedicated, quiet, well-lit study space with minimal distractions improves focus and productivity significantly",
    improvement: "+5-8%",
    new_probability: "Better focus",
    is_general: true
  },
  {
    feature: "Practice Testing",
    priority: "MEDIUM",
    current: "Limited testing",
    suggested: "Regular self-assessment",
    reason: "Testing yourself regularly (not just reviewing) strengthens memory and helps identify weak areas before exams",
    improvement: "+8-12%",
    new_probability: "Stronger recall",
    is_general: true
  },
  {
    feature: "Subject Review Schedule",
    priority: "MEDIUM",
    current: "Irregular revision",
    suggested: "Daily 15-30 min review",
    reason: "Brief daily review of material prevents forgetting and makes exam preparation much easier",
    improvement: "+6-10%",
    new_probability: "Better retention",
    is_general: true
  },
  {
    feature: "Peer Study Sessions",
    priority: "MEDIUM",
    current: "Solo study",
    suggested: "Weekly group study",
    reason: "Collaborative learning with peers helps clarify concepts, provides different perspectives, and maintains motivation",
    improvement: "+5-8%",
    new_probability: "Deeper understanding",
    is_general: true
  },
  {
    feature: "Note-Taking Strategy",
    priority: "MEDIUM",
    current: "Standard notes",
    suggested: "Cornell/Mind mapping method",
    reason: "Structured note-taking systems improve comprehension during learning and make revision more effective",
    improvement: "+4-7%",
    new_probability: "Better organization",
    is_general: true
  },
  {
    feature: "Physical Exercise",
    priority: "MEDIUM",
    current: "Minimal activity",
    suggested: "30 min daily exercise",
    reason: "Regular physical activity improves cognitive function, reduces stress, and enhances memory and learning capacity",
    improvement: "+3-6%",
    new_probability: "Enhanced cognition",
    is_general: true
  },
  {
    feature: "Healthy Diet & Hydration",
    priority: "MEDIUM",
    current: "Irregular eating patterns",
    suggested: "Balanced diet & 8 glasses water",
    reason: "Proper nutrition and hydration are crucial for brain function, concentration, and sustained energy during study",
    improvement: "+4-7%",
    new_probability: "Better energy",
    is_general: true
  }
];

/**
 * Ensures recommendations array has exactly 5 items
 * @param {Array} recommendations - Original recommendations from API
 * @returns {Array} Padded recommendations (always 5 items)
 */
export const padRecommendations = (recommendations) => {
  if (!recommendations || !Array.isArray(recommendations)) {
    return [];
  }

  // If already 5 or more, return as is
  if (recommendations.length >= 5) {
    return recommendations.slice(0, 5);
  }

  // Calculate how many general recommendations needed
  const needed = 5 - recommendations.length;
  
  // Get unused general recommendations (ones not similar to existing)
  const existingFeatures = new Set(
    recommendations.map(r => r.feature.toLowerCase())
  );
  
  const availableGeneral = GENERAL_RECOMMENDATIONS.filter(rec => {
    const featureLower = rec.feature.toLowerCase();
    return !existingFeatures.has(featureLower);
  });

  // Take the needed amount
  const generalToAdd = availableGeneral.slice(0, needed);

  // Combine and return
  return [...recommendations, ...generalToAdd];
};

/**
 * Checks if a recommendation is a general placeholder
 * @param {Object} recommendation 
 * @returns {boolean}
 */
export const isGeneralRecommendation = (recommendation) => {
  return recommendation?.is_general === true;
};

/**
 * Gets display message for recommendation count
 * @param {number} specificCount - Number of subject-specific recommendations
 * @param {number} totalCount - Total recommendations including general ones
 * @returns {string}
 */
export const getRecommendationCountMessage = (specificCount, totalCount) => {
  if (specificCount === totalCount) {
    return `${totalCount} AI-identified recommendations specific to your performance`;
  }
  
  const generalCount = totalCount - specificCount;
  return `${specificCount} AI-identified specific recommendation${specificCount !== 1 ? 's' : ''} + ${generalCount} general study tip${generalCount !== 1 ? 's' : ''}`;
};
