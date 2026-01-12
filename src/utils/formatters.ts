/**
 * Formate une date au format français
 * @param dateString - La date à formater
 * @returns La date formatée (ex: 12/01/2026)
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

/**
 * Formate une heure au format français
 * @param dateString - La date contenant l'heure à formater
 * @returns L'heure formatée (ex: 14:30)
 */
export const formatTime = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Formate un montant en euros
 * @param amount - Le montant à formater
 * @param decimals - Nombre de décimales (défaut: 2)
 * @returns Le montant formaté (ex: 12.50 €)
 */
export const formatCurrency = (amount: number, decimals: number = 2): string => {
  return `${amount.toFixed(decimals)} €`;
};

/**
 * Génère le pluriel d'un mot si nécessaire
 * @param count - Le nombre d'éléments
 * @param singular - La forme singulière
 * @param plural - La forme plurielle (optionnel, ajoute 's' par défaut)
 * @returns Le mot avec la bonne forme
 */
export const pluralize = (count: number, singular: string, plural?: string): string => {
  return count > 1 ? plural || `${singular}s` : singular;
};
