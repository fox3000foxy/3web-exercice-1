# Refactorisation - Architecture des composants

## 📁 Structure du projet

```
src/
├── components/          # Composants UI réutilisables
│   ├── Avatar.tsx      # Avatars utilisateur avec initiales
│   ├── Badge.tsx       # Badges de statut colorés
│   ├── Button.tsx      # Boutons avec variantes
│   ├── Card.tsx        # Conteneurs de contenu
│   ├── FormField.tsx   # Champs de formulaire
│   ├── Layout.tsx      # Layout principal avec navigation
│   ├── Modal.tsx       # Modales personnalisables
│   ├── PageHeader.tsx  # En-têtes de page
│   ├── Pagination.tsx  # Contrôles de pagination
│   ├── SearchInput.tsx # Champ de recherche
│   ├── SelectFilter.tsx# Filtres dropdown
│   ├── StatCard.tsx    # Cartes de statistiques
│   └── index.ts        # Exports centralisés
├── hooks/              # Hooks React personnalisés
│   ├── usePagination.ts# Gestion de la pagination
│   ├── useSearch.ts    # Gestion de la recherche
│   └── index.ts        # Exports centralisés
├── pages/              # Pages de l'application
│   ├── CarteFidelite.tsx
│   ├── Commandes.tsx
│   ├── Dashboard.tsx
│   ├── Produits.tsx
│   └── Utilisateurs.tsx
├── types/              # Types TypeScript
│   └── index.ts
└── utils/              # Fonctions utilitaires
    └── formatters.ts   # Formatage date/montant/pluriel
```

## 🎯 Nouveaux composants créés

### Avatar
Composant d'avatar avec initiales automatiques et styles admin/utilisateur.

```tsx
<Avatar name="Jean Dupont" isAdmin={true} size="md" />
```

**Props:**
- `name`: Nom complet de l'utilisateur
- `isAdmin`: Affiche le style admin (orange) ou utilisateur (bleu)
- `size`: 'sm' | 'md' | 'lg'

### StatCard
Carte de statistique réutilisable avec icône et valeur.

```tsx
<StatCard
  label="Total Commandes"
  value={150}
  icon="shopping-cart"
  iconColorFrom="blue-500"
  iconColorTo="blue-600"
  valueColor="green-600"
/>
```

**Props:**
- `label`: Libellé de la statistique
- `value`: Valeur (string | number)
- `icon`: Icône Font Awesome
- `iconColorFrom/To`: Couleurs du gradient
- `valueColor`: Couleur de la valeur

## 🪝 Hooks personnalisés

### usePagination
Gère toute la logique de pagination de manière réutilisable.

```tsx
const { 
  currentPage, 
  totalPages, 
  paginatedItems, 
  startIndex, 
  setCurrentPage,
  resetPage 
} = usePagination({
  items: filteredData,
  itemsPerPage: 10
});
```

**Avantages:**
- Calcul automatique des pages
- Découpage automatique des items
- Fonction de reset pour les filtres

### useSearch
Simplifie la gestion de la recherche et synchronisation avec pagination.

```tsx
const { searchTerm, handleSearchChange } = useSearch();

// Dans le composant
<SearchInput 
  value={searchTerm}
  onChange={value => handleSearchChange(value, resetPage)}
/>
```

## 🛠️ Utilitaires

### formatters.ts
Fonctions de formatage centralisées.

```typescript
formatDate('2026-01-12') // "12/01/2026"
formatTime('2026-01-12T14:30:00') // "14:30"
formatCurrency(12.5) // "12.50 €"
pluralize(5, 'produit') // "produits"
```

## ✨ Améliorations apportées

### Avant la refactorisation
```tsx
// Pagination manuelle répétée
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 10;
const totalPages = Math.ceil(items.length / itemsPerPage);
const startIndex = (currentPage - 1) * itemsPerPage;
const paginatedItems = items.slice(startIndex, startIndex + itemsPerPage);

// Avatars répétés
<div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500...">
  {user.nomComplet.split(' ').map(n => n[0]).join('')}
</div>

// Stats cards répétées
<div className="bg-white rounded-lg shadow-sm...">
  <div className="flex items-center justify-between">
    <div>
      <p className="text-sm text-gray-600">Total</p>
      <p className="text-2xl font-bold">{total}</p>
    </div>
    <div className="w-12 h-12 bg-gradient-to-br...">
      <i className="fas fa-box"></i>
    </div>
  </div>
</div>
```

### Après la refactorisation
```tsx
// Pagination avec hook
const { currentPage, paginatedItems, setCurrentPage, resetPage } = usePagination({
  items: filteredData,
  itemsPerPage: 10
});

// Avatar composant
<Avatar name={user.nomComplet} isAdmin={user.estAdmin} size="md" />

// StatCard composant
<StatCard
  label="Total"
  value={total}
  icon="box"
  iconColorFrom="blue-500"
  iconColorTo="blue-600"
/>
```

## 📊 Réduction du code

| Page | Avant | Après | Gain |
|------|-------|-------|------|
| Utilisateurs | 213 lignes | ~180 lignes | -15% |
| Produits | 182 lignes | ~150 lignes | -18% |
| Commandes | 236 lignes | ~190 lignes | -20% |
| Layout | 151 lignes | ~140 lignes | -7% |

## 🎨 Design System

Tous les composants suivent le même design system:
- **Couleurs:** Gradients cohérents (blue, green, orange, red, purple)
- **Espacement:** Padding responsive (p-4 sm:p-5 md:p-6)
- **Typographie:** Font sizes adaptatifs
- **Animations:** Transitions douces sur hover
- **Responsive:** Mobile-first avec breakpoints cohérents

## 🚀 Avantages de cette architecture

1. **Réutilisabilité**: Composants utilisables dans toute l'app
2. **Maintenabilité**: Modification centralisée des composants
3. **Cohérence**: Design system unifié
4. **Performance**: Logique optimisée avec hooks
5. **Type Safety**: TypeScript pour tous les composants
6. **DRY Principle**: Élimination des répétitions
7. **Testabilité**: Composants isolés faciles à tester
