import { useState, useEffect } from 'react';
import { getStatsFromSupabase, getSatisfactionRateFromSupabase } from '../services/supabaseService';
import { useSupabaseInit } from './useSupabase';
import { getFormattedYearsOfExperience } from '../services/statsService';

// Custom hook for managing and sharing statistics across components
export const useStats = () => {
  // State for dynamic statistics
  const [familiesCount, setFamiliesCount] = useState<number>(95);
  const [satisfactionRate, setSatisfactionRate] = useState<number>(98);
  const [yearsOfExperience, setYearsOfExperience] = useState<string>('6+');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Initialize Supabase
  const { isLoading: isInitializing, error: initError } = useSupabaseInit();
  
  // Function to fetch and update stats
  const fetchAndUpdateStats = async () => {
    try {
      const stats = await getStatsFromSupabase();
      const satisfactionRate = await getSatisfactionRateFromSupabase();
      
      if (stats && typeof stats.familiesCount === 'number') {
        setFamiliesCount(stats.familiesCount);
      }
      
      if (typeof satisfactionRate === 'number') {
        setSatisfactionRate(satisfactionRate);
      }
      
      setYearsOfExperience(getFormattedYearsOfExperience());
      setIsLoading(false);
    } catch (err) {
      console.error('Error loading stats:', err);
      setError('Unable to load statistics. Please try again later.');
      setIsLoading(false);
    }
  };

  // Load stats from Supabase on component mount
  useEffect(() => {
    if (isInitializing || initError) return;
    
    // Initial fetch
    fetchAndUpdateStats();
    
    // Set up an interval to check for updates
    const interval = setInterval(() => {
      fetchAndUpdateStats();
    }, 3000); // Check every 3 seconds for more frequent updates
    
    return () => clearInterval(interval);
  }, [isInitializing, initError]);

  return {
    familiesCount,
    satisfactionRate,
    yearsOfExperience,
    isLoading: isLoading || isInitializing,
    error: error || initError,
    refreshStats: fetchAndUpdateStats
  };
};
