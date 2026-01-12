export interface Statistiques {
  totalVentes: number;
  totalDepense: number;
  benefice: number;
  nombreClients: number;
  nombreCommandes: number;
  nombreProduits: number;
  produitPlusVendu: {
    nom: string;
    quantite: number;
  };
  heureMoyenneCommande: string;
  moyenneEurosParCommande: number;
  meilleurePromo: string;
}

export interface RepartitionPaiement {
  type: string;
  pourcentage: number;
}

export interface VenteParMois {
  mois: string;
  montant: number;
}

export interface Utilisateur {
  id: number;
  nomComplet: string;
  email: string;
  promo: string;
  codeAdherent: string;
  points: number;
  estAdmin: boolean;
}

export interface Produit {
  id: number;
  nom: string;
  prix: number;
  actif: boolean;
}

export interface CarteFidelite {
  nombreTampons: number;
  recompense: string;
}

export interface TopClient {
  nom: string;
  nombreCommandes?: number;
  nombreProduits?: number;
}

export interface TopClients {
  parCommandes: TopClient[];
  parProduits: TopClient[];
}

export interface Commande {
  id: number;
  utilisateurId: number;
  produitId: number;
  quantite: number;
  date: string;
  montant: number;
}

export interface DataType {
  statistiques: Statistiques;
  repartitionPaiements: RepartitionPaiement[];
  ventesParMois: VenteParMois[];
  utilisateurs: Utilisateur[];
  produits: Produit[];
  carteFidelite: CarteFidelite;
  topClients: TopClients;
  commandes: Commande[];
}
