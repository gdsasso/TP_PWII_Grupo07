const mysql = require('mysql2/promise');
const { DB_CONFIG } = require('./config');

let connection;

/**
 * Error específico para recursos inexistentes en la DB.
 */
 class ResourceNotFoundError extends Error {
    /**
     * @param {string} message
     * @param {string} resource
     * @param {number} id
     */
    constructor(message, resource, id) {
      super(message);
      this.resource = resource;
      this.id = id;
    }
  }
  
  /**
   * @typedef {Object} TUser
   * @property {string} username Usuario.
   * @property {string} password Password.
   * @property {string} name Nombre.
   * @property {number} age Edad.
   *
   * @typedef {TUser & {
   *    id: number,
   *  }} TUserDB
   *
   * @typedef {Object} TFilterQuery
   * @property {string|undefined} username Usuario.
   * @property {string|undefined} password Password.
   * @property {string|undefined} name Nombre.
   * @property {number|undefined} age Edad.
   */
  
  /**
   * Validar datos del usuario.
   *
   * @param {TUser} userData
   */
  function validateUser(userData) {
    if (!userData) {
      throw new Error(`No se ha definidio el usuario`);
    }
  
    if (!userData.name || !userData.name.trim()) {
      throw new Error(`La propiedad 'name' es requerida`);
    }
  
    if (userData.username && !userData.username.trim()) {
      throw new Error(`La propiedad 'username' no puede ser vacía`);
    }
  
    if (userData.password && !userData.password.trim()) {
      throw new Error(`La propiedad 'password' no puede ser vacía`);
    }
  
    if (
      !userData.age ||
      isNaN(userData.age) ||
      userData.age < 18 ||
      userData.age > 200
    ) {
      throw new Error(`La propiedad 'age' es inválida`);
    }
  };

  module.exports = {
    async initDB() {
      connection = await mysql.createConnection(DB_CONFIG)
    },
  
    /**
   * Buscar usuarios.
   *
   * @param {TFilterQuery} query Query de búsqueda.
   * @returns {TUserDB[]}
   */
  async search(query) {
    const paramsString = Object.keys(query) // ["name", "password"]
      .map((elem) => `${elem} = ?`) // ["name = ?", "password = ?"]
      .join(' AND '); // "name = ? AND password = ?"

    const [users] = await connection.execute(
      `SELECT * FROM users WHERE ${paramsString}`,
      Object.values(query)
    );

    return users;
  }

   /**
   * Listar.
   *
   * @param {string|undefined} filteTasks Filtrar por nombre.
   * @returns {TUserDB[]}
   */
    async list(filterTasks) {
      const [tasks] = await connection.execute('SELECT * FROM tasks');
  
      // if (filterName && filterName.trim()) {
      //   filterName = filterName.trim().toLowerCase();
  
      //   users = users.filter((user) =>
      //     user.name.toLowerCase().includes(filterName)
      //   );
      // }
  
      return tasks;
    },
};
