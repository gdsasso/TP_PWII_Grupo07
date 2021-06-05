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
   * @param {TTask} taskData
   */
  function validateTask(taskData) {
    if (!taskData) {
      throw new Error(`No se ha definidio una tarea`);
    }
  
    if (!taskData.title || !taskData.title.trim()) {
      throw new Error(`Debe ingresar un título`);
    }    
  };

  module.exports = {
    async initDB() {
      connection = await mysql.createConnection(DB_CONFIG)
    },
  
  
   /**
   * Listar.
   *
   * @param {string|undefined} filteTasks Filtrar por tarea.
   * @returns {TTasksDB[]}
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
  },


    
  /**
   * Agregar una tarea.
   *
   * @param {TTask} taskData
   */
   async add(taskData) {
    validateTask(taskData);
    const { title, description } = taskData;
    const [result] = await connection.execute(
      'INSERT INTO tasks(title, description) VALUES(?, ?)',
      [title, description]
    );

    return await [{Título: title, Descripción: description}];
  },
};

