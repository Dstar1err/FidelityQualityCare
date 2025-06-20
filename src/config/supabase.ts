import { createClient } from '@supabase/supabase-js';
import { count } from 'console';

// Récupérer les informations d'identification Supabase depuis les variables d'environnement
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

console.log('URL Supabase:', supabaseUrl);
console.log('Clé Supabase:', supabaseKey);

// Vérifier que les variables d'environnement sont définies
if (!supabaseUrl || !supabaseKey) {
  console.error(
    'Les variables d\'environnement Supabase ne sont pas définies. ' +
    'Assurez-vous d\'avoir un fichier .env avec VITE_SUPABASE_URL et VITE_SUPABASE_ANON_KEY.'
  );
}

// Créer un client Supabase
export const supabase = createClient(
  supabaseUrl as string, 
  supabaseKey as string
);

