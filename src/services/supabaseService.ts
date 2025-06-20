import { supabase } from '../config/supabase';
import { Testimonial } from './testimonialService';
import { getFormattedYearsOfExperience } from './statsService';

// Interface pour les statistiques
interface Stats {
  familiesCount: number;
  lastUpdated: string;
  foundingYear: number;
}

// Tables Supabase
const TESTIMONIALS_TABLE = 'testimonials';
const STATS_TABLE = 'stats';

// ID pour les statistiques (nous n'utilisons qu'une seule ligne)
const STATS_ID = 1;

/**
 * Initialise la base de données avec des données par défaut si nécessaire
 */
export const initializeSupabase = async (): Promise<void> => {
  // Vérifier si les statistiques existent déjà
  const { data: statsData, error: statsError } = await supabase
    .from(STATS_TABLE)
    .select('*');

  if (statsError || !statsData) {
    // Créer les statistiques par défaut
    await supabase.from(STATS_TABLE).insert({
      id: STATS_ID,
      familiesCount: 95,
      lastUpdated: new Date().toISOString(),
      foundingYear: 2019
    });
  }

  // Vérifier si des témoignages existent déjà
  const { data: testimonials, error: testimonialError } = await supabase
    .from(TESTIMONIALS_TABLE)
    .select('*');

  if (testimonialError || (testimonials && testimonials.length === 0)) {
    // Ajouter des témoignages par défaut
    const initialTestimonials = [
      {
        name: 'Marie Johnson',
        relation: 'Daughter of Mrs. Johnson (85 years old)',
        rating: 5,
        text: 'Fidelity Quality Care has transformed my mother\'s life. Their caregivers are not only professional but also very caring. My mother feels safe and happy at home.',
        service: 'Comprehensive home care',
        date: new Date().toISOString()
      }
    ];

    await supabase.from(TESTIMONIALS_TABLE).insert(initialTestimonials);
  }
};

/**
 * Récupère tous les témoignages depuis Supabase
 */
export const getTestimonialsFromSupabase = async (): Promise<Testimonial[]> => {
  const { data, error } = await supabase
    .from(TESTIMONIALS_TABLE)
    .select('*')
    .order('date', { ascending: false });
    
  if (error) {
    console.error('Erreur lors de la récupération des témoignages:', error);
    return [];
  }

  return data.map(item => ({
    ...item,
    date: new Date(item.date),
    id: item.id
  }));
};

/**
 * Ajoute un nouveau témoignage à Supabase
 */
export const addTestimonialToSupabase = async (testimonial: Omit<Testimonial, 'id' | 'date'>): Promise<Testimonial> => {
  const newTestimonial = {
    ...testimonial,
    date: new Date().toISOString()
  };

  const { data, error } = await supabase
    .from(TESTIMONIALS_TABLE)
    .insert(newTestimonial)
    .select()
    .single();

  if (error) {
    console.error('Erreur lors de l\'ajout du témoignage:', error);
    throw new Error('Impossible d\'ajouter le témoignage');
  }

  return {
    ...data,
    date: new Date(data.date)
  };
};

/**
 * Récupère les statistiques depuis Supabase
 */
export const getStatsFromSupabase = async (): Promise<Stats> => {
  const { data, error } = await supabase
    .from(STATS_TABLE)
    .select('*')
    .eq('id', STATS_ID)
    .single();

  if (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    // Retourner des valeurs par défaut en cas d'erreur
    return {
      familiesCount: 95,
      lastUpdated: new Date().toISOString(),
      foundingYear: 2019
    };
  }

  return data;
};

/**
 * Incrémente le compteur de familles dans Supabase
 */
export const incrementFamiliesCountInSupabase = async (): Promise<Stats> => {
  try {
    // D'abord, récupérer les statistiques actuelles
    const currentStats = await getStatsFromSupabase();
    
    if (!currentStats || typeof currentStats.familiesCount !== 'number') {
      console.error('Statistiques invalides:', currentStats);
      return currentStats || { familiesCount: 95, lastUpdated: new Date().toISOString(), foundingYear: 2019 };
    }
    
    // Préparer les données pour la mise à jour
    const newFamiliesCount = currentStats.familiesCount + 1;
    const now = new Date().toISOString();
    
    
    // Créer un objet de mise à jour explicite (sans référence à l'objet original)
    const updateData = {
      familiesCount: newFamiliesCount,
      lastUpdated: now
    };
    
    // Effectuer la mise à jour dans Supabase
    const { data, error } = await supabase
      .from(STATS_TABLE)
      .update(updateData)
      .eq('id', STATS_ID)
      .select();

    if (error) {
      console.error('Erreur lors de la mise à jour des statistiques:', error);
      return currentStats;
    }

    // Si la mise à jour a réussi mais n'a pas retourné de données, récupérer les données mises à jour
    if (!data || data.length === 0) {      
      const { data: fetchedData, error: fetchError } = await supabase
        .from(STATS_TABLE)
        .select('*')
        .eq('id', STATS_ID)
        .single();
      
      if (fetchError) {
        console.error('Erreur lors de la récupération des statistiques après mise à jour:', fetchError);
        // Retourner un objet avec les valeurs mises à jour, même si la récupération a échoué
        return {
          ...currentStats,
          familiesCount: newFamiliesCount,
          lastUpdated: now
        };
      }
      
      return fetchedData;
    }
    
    return data[0];
  } catch (err) {
    console.error('Exception lors de la mise à jour des statistiques:', err);
    // Récupérer les statistiques actuelles en cas d'erreur
    return await getStatsFromSupabase();
  }
};

/**
 * Calcule le taux de satisfaction basé sur les témoignages
 */
export const getSatisfactionRateFromSupabase = async (): Promise<number> => {
  const testimonials = await getTestimonialsFromSupabase();
  
  if (testimonials.length === 0) {
    return 98; // Valeur par défaut si aucun témoignage
  }

  const totalRating = testimonials.reduce((sum, testimonial) => sum + testimonial.rating, 0);
  return Math.round((totalRating / (testimonials.length * 5)) * 100);
};

/**
 * Calcule les statistiques pour l'affichage
 */
export const calculateStatsFromSupabase = async () => {
  const stats = await getStatsFromSupabase();
  const satisfactionRate = await getSatisfactionRateFromSupabase();
  
  return [
    { number: `${satisfactionRate}%`, label: 'Satisfaction rate' },
    { number: `${stats.familiesCount}+`, label: 'Families helped' },
    { number: '24/7', label: 'Support available' },
    { id: 'experience', number: getFormattedYearsOfExperience(), label: 'Years of experience' }
  ];
};
