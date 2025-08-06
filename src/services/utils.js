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


/**
 * Formate le token pour l'utiliser dans les requêtes HTTP
 * @param {string} token - Le token de l'utilisateur
 * @returns {string} Le token formaté pour l'authentification Bearer
 */
const formatToken = (token) => {
  return `Bearer ${token}`;
}

export { emptyBlog, generateId, formatToken };
