# 🎓 Portail BDE SUPINFO - Campus Caen

Une plateforme moderne et élégante de gestion de fidélité et de vente de snacks pour le Bureau Des Étudiants (BDE) de SUPINFO Caen.

## ✨ Caractéristiques du Design

### 🎨 Design Moderne & Professionnel
- **Gradients colorés** - Palettes de couleurs vibrantes et harmonieuses
- **Glassmorphism** - Effets de verre avec backdrop-blur pour un rendu moderne
- **Animations fluides** - Transitions et animations CSS personnalisées
- **Effets de hover** - Interactions utilisateur engageantes
- **Icônes Font Awesome** - Bibliothèque complète d'icônes professionnelles
- **Typography Inter** - Police moderne et lisible

### 🎭 Animations & Effets
- ⚡ Animations d'entrée pour tous les composants
- 🌊 Effets de vague et de flottement
- ✨ Effets shimmer sur les cartes
- 🎯 Transitions fluides entre les pages
- 💫 Effets de glow sur les éléments actifs
- 🔄 Rotations et transformations au hover

## 🎯 Fonctionnalités

### 📊 Dashboard Statistiques
- Indicateurs clés (Total des ventes, Bénéfice, Nombre de clients, etc.)
- Tableau des produits les plus vendus
- Graphique camembert de répartition des moyens de paiement
- Graphique des ventes par mois
- Classements Top 10 clients (par commandes et par produits)

### 💳 Carte de Fidélité
- Système de 8 tampons à collecter
- Récompense à la clé (1 produit offert)
- Accès à la boutique de snacks
- Interface interactive pour ajouter/retirer des tampons

### 👥 Gestion des Utilisateurs
- Tableau avec recherche et filtres (par promo)
- Pagination dynamique
- Actions : éditer, commander, supprimer (admin seulement)
- Affichage du rôle (Admin/Utilisateur)

### 📦 Gestion des Produits
- Tableau avec recherche et filtres (Actif/Inactif)
- Pagination dynamique
- Actions CRUD (Créer, Lire, Modifier, Supprimer)
- Toggle pour activer/désactiver les produits

### 📜 Historique des Commandes
- Liste complète des commandes avec détails
- Filtrage par utilisateur
- Recherche par nom, produit ou date
- Statistiques globales (total commandes, montant, moyenne)
- Pagination avancée

## 🚀 Technologies Utilisées

- **React 18** - Bibliothèque UI
- **TypeScript** - Typage statique
- **React Router v7** - Navigation
- **Tailwind CSS** - Framework CSS
- **Recharts** - Graphiques et visualisations
- **Lucide React** - Icônes modernes
- **Vite** - Build tool rapide

## 📦 Installation

1. **Cloner le projet**
   ```bash
   git clone <votre-repo-url>
   cd 3web-exercice-1
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Lancer le serveur de développement**
   ```bash
   npm run dev
   ```

4. **Ouvrir dans le navigateur**
   ```
   http://localhost:5173
   ```

## 🏗️ Structure du Projet

```
3web-exercice-1/
├── public/
├── src/
│   ├── components/
│   │   └── Layout.tsx          # Layout principal avec navigation
│   ├── pages/
│   │   ├── Dashboard.tsx       # Page dashboard avec statistiques
│   │   ├── CarteFidelite.tsx   # Carte de fidélité et boutique
│   │   ├── Utilisateurs.tsx    # Gestion des utilisateurs
│   │   ├── Produits.tsx        # Gestion des produits
│   │   └── Commandes.tsx       # Historique des commandes
│   ├── types/
│   │   └── index.ts            # Types TypeScript
│   ├── App.tsx                 # Composant racine
│   ├── main.tsx                # Point d'entrée
│   └── index.css               # Styles globaux
├── data.json                   # Données de l'application
├── index.html
├── package.json
├── tailwind.config.js
└── README.md
```

## 📱 Design Responsive

L'application est entièrement responsive avec des breakpoints optimisés :
- **Mobile** : < 640px
- **Tablette** : 640px - 1024px
- **Desktop** : > 1024px

## 🎨 Design System

### Couleurs principales
- **Bleu** : Navigation et éléments principaux
- **Vert** : Produits et actions positives
- **Orange** : Commandes et alertes
- **Violet** : Fidélité et récompenses

### Composants réutilisables
- Cards avec ombre et hover effects
- Boutons avec différentes variantes (primary, secondary, danger)
- Tableaux avec recherche, filtres et pagination
- Graphiques interactifs

## 👤 Gestion des Utilisateurs

L'application permet de changer d'utilisateur via le menu en bas de la sidebar. Vous pouvez tester différents rôles :
- **Utilisateurs normaux** : Accès limité aux actions
- **Administrateurs** : Accès complet (édition, suppression)

## 📊 Données

Les données sont chargées depuis `data.json` et incluent :
- Statistiques globales
- Répartition des paiements
- Ventes par mois
- Liste des utilisateurs (10)
- Liste des produits (18)
- Carte de fidélité
- Top clients
- Historique des commandes

## 🛠️ Scripts Disponibles

```bash
# Développement
npm run dev

# Build production
npm run build

# Preview du build
npm run preview

# Linter
npm run lint

# Formatage du code
npm run format
```

## 🎓 Projet Pédagogique

Ce projet a été développé dans le cadre d'un exercice de 4 heures pour évaluer les compétences suivantes :
- ✅ Création de composants React réutilisables
- ✅ Gestion de l'état avec les hooks (useState, useEffect, useMemo)
- ✅ Consommation de données JSON
- ✅ Utilisation de React Router pour la navigation
- ✅ Mise en place d'un design moderne et responsive
- ✅ Visualisation de données avec des graphiques

## 📝 Licence

Projet éducatif - SUPINFO Caen

---

**Développé avec ❤️ pour le BDE SUPINFO Caen**
