import { useState, useEffect } from 'react';
import { initializeSupabase } from '../services/supabaseService';

/**
 * Hook pour initialiser Supabase et gérer l'état de chargement
 */
export const useSupabaseInit = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initialize = async () => {
      try {
        setIsLoading(true);
        await initializeSupabase();
        setIsLoading(false);
      } catch (err) {
        console.error('Erreur lors de l\'initialisation de Supabase:', err);
        setError('Impossible de se connecter à la base de données. Veuillez réessayer plus tard.');
        setIsLoading(false);
      }
    };

    initialize();
  }, []);

  return { isLoading, error };
};

/**
 * Hook pour gérer les témoignages avec Supabase
 */
export const useSupabaseData = <T>(
  fetchFunction: () => Promise<T>,
  dependencies: any[] = []
) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const result = await fetchFunction();
        setData(result);
        setIsLoading(false);
      } catch (err) {
        console.error('Erreur lors de la récupération des données:', err);
        setError('Impossible de récupérer les données. Veuillez réessayer plus tard.');
        setIsLoading(false);
      }
    };

    fetchData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return { data, isLoading, error };
};
