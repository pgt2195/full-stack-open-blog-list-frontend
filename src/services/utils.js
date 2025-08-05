/**
 * Fichier utils.js
 * Contient des fonctions utilitaires pour la gestion des blogs
 */

/**
 * Représente un blog vide pour l'initialisation
 * @type {Object}
 */
const emptyBlog = {
  title: "",
  author: "",
  url: "",
};

/**
 * Génère un ID unique pour un nouveau blog
 * @returns {string} Un ID unique basé sur le timestamp et un random
 */
const generateId = () => {
  return Date.now().toString() + Math.random().toString(36).substring(2, 6);
}

export { emptyBlog, generateId };
