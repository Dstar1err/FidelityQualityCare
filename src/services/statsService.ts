// Service to manage statistics like families served

export interface Stats {
  familiesCount: number;
  lastUpdated: Date;
  foundingYear?: number;
}

const STATS_STORAGE_KEY = 'fidelity_quality_care_stats';

// Initialize stats with default values if not present
const initializeStats = (): Stats => {
  const defaultStats: Stats = {
    familiesCount: 95, // Default starting value
    lastUpdated: new Date(),
    foundingYear: 2019 // Année de fondation de l'entreprise
  };
  
  localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(defaultStats));
  return defaultStats;
};

// Get current stats
export const getStats = (): Stats => {
  const statsJson = localStorage.getItem(STATS_STORAGE_KEY);
  
  if (!statsJson) {
    return initializeStats();
  }
  
  try {
    const stats = JSON.parse(statsJson);
    stats.lastUpdated = new Date(stats.lastUpdated);
    return stats;
  } catch (error) {
    console.error('Error parsing stats from localStorage:', error);
    return initializeStats();
  }
};

// Increment families count
export const incrementFamiliesCount = (): Stats => {
  const stats = getStats();
  stats.familiesCount += 1;
  stats.lastUpdated = new Date();
  localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(stats));
  return stats;
};

// Alias functions for backward compatibility
export const incrementFamiliesHelped = incrementFamiliesCount;
export const incrementFamiliesServed = incrementFamiliesCount;

// Reset stats to initial values
export const resetStatsToInitial = (): Stats => {
  const defaultStats: Stats = {
    familiesCount: 95,
    lastUpdated: new Date(),
    foundingYear: 2019
  };
  localStorage.setItem(STATS_STORAGE_KEY, JSON.stringify(defaultStats));
  return defaultStats;
};

// Reset stats to default values (for testing or admin purposes)
export const resetStats = (): Stats => {
  return initializeStats();
};

/**
 * Calcule le nombre d'années d'expérience basé sur l'année de fondation
 * Met à jour automatiquement chaque année
 */
export const getYearsOfExperience = (): number => {
  const stats = getStats();
  const foundingYear = stats.foundingYear || 2019; // Année par défaut si non définie
  const currentYear = new Date().getFullYear();
  
  return currentYear - foundingYear;
};

/**
 * Obtient les années d'expérience sous forme de chaîne formatée (ex: "6+")
 */
export const getFormattedYearsOfExperience = (): string => {
  return `${getYearsOfExperience()}+`;
};
