# Schéma de la base de données Supabase pour Fidelity Quality Care

## Table: testimonials

| Colonne      | Type        | Description                                      |
|--------------|-------------|--------------------------------------------------|
| id           | uuid        | Identifiant unique (clé primaire, auto-généré)   |
| name         | text        | Nom de la personne ayant laissé le témoignage    |
| text         | text        | Contenu du témoignage                            |
| rating       | integer     | Note donnée (de 1 à 5)                           |
| date         | timestamp   | Date de création du témoignage                   |
| created_at   | timestamp   | Date d'ajout dans la base (auto-généré)          |

## Table: stats

| Colonne       | Type        | Description                                      |
|---------------|-------------|--------------------------------------------------|
| id            | integer     | Identifiant unique (toujours 1)                  |
| familiesCount | integer     | Nombre de familles aidées                        |
| foundingYear  | integer     | Année de fondation de l'entreprise               |
| lastUpdated   | timestamp   | Date de dernière mise à jour des statistiques    |

## Relations et contraintes

- La table `stats` ne contient qu'une seule ligne avec id=1
- Aucune relation directe entre les tables

## Requêtes SQL pour créer les tables

```sql
-- Création de la table testimonials
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  text TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Création de la table stats
CREATE TABLE stats (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  familiesCount INTEGER NOT NULL DEFAULT 95,
  foundingYear INTEGER NOT NULL DEFAULT 2019,
  lastUpdated TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insertion des données initiales dans stats
INSERT INTO stats (id, familiesCount, foundingYear, lastUpdated)
VALUES (1, 95, 2019, CURRENT_TIMESTAMP)
ON CONFLICT (id) DO NOTHING;
```

## Politiques de sécurité recommandées

Pour sécuriser vos données dans Supabase, vous pouvez configurer les politiques d'accès suivantes :

### Pour la table testimonials
```sql
-- Autoriser la lecture pour tous
CREATE POLICY "Testimonials are viewable by everyone" 
ON testimonials FOR SELECT USING (true);

-- Autoriser l'insertion pour tous (pour permettre aux visiteurs d'ajouter des témoignages)
CREATE POLICY "Anyone can add testimonials" 
ON testimonials FOR INSERT WITH CHECK (true);

-- Empêcher la modification ou la suppression des témoignages existants
CREATE POLICY "No one can update testimonials" 
ON testimonials FOR UPDATE USING (false);

CREATE POLICY "No one can delete testimonials" 
ON testimonials FOR DELETE USING (false);
```

### Pour la table stats
```sql
-- Autoriser la lecture pour tous
CREATE POLICY "Stats are viewable by everyone" 
ON stats FOR SELECT USING (true);

-- Autoriser la mise à jour uniquement pour les utilisateurs authentifiés (si vous ajoutez l'authentification plus tard)
CREATE POLICY "Only authenticated users can update stats" 
ON stats FOR UPDATE USING (auth.role() = 'authenticated');
```
