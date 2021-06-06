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
   * @typedef {Object} TTask
   * @property {string} title Título.
   * @property {string} description Descripcion.
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
    const { title, description, idUsers } = taskData;
    const [result] = await connection.execute(
      'INSERT INTO tasks(title, description, idusers) VALUES(?, ?, ?)',
      [title, description, idUsers]
    );

    return await [{Título: title, Descripción: description, Usuario: idUsers}];
  },


  /**
   * Buscar un task por ID.
   *
   * @param {number} taskId ID de Usuario.
   * @returns {TTaskDB | undefined}
   */
   async find(taskId) {
    const [tasks] = await connection.execute(
      'SELECT * FROM tasks WHERE idtasks = ?',
      [taskId]
    );

    if (tasks.length > 0) {
      return tasks[0];
    } else {
      return undefined;
    }
  },


  /**
   * Actualizar un task.
   *
   * @param {number} taskId
   * @param {TTask & {
   *    title?: string,
   *    description?: string,
   *    state?:string,
   *  }} newTaskData
   */
  async update(taskId, newTaskData) {
    const task = await this.find(taskId);

    //console.log(newTaskData);
    //console.log(task);

    if (!task) {
      throw new ResourceNotFoundError(
        `No existe una tarea con ID "${taskId}"`,
        'task',
        taskId
      );
    }

    validateTask(newTaskData);

    // Actualiza datos

    if (newTaskData.title) {
      task.title = newTaskData.title;
    }

    if (newTaskData.description) {
      task.description = newTaskData.description;
    }

    if (newTaskData.state) {
      task.state = newTaskData.state;
    }

    task.title = newTaskData.title;
    task.description = newTaskData.description;
    task.state = newTaskData.state;

    await connection.execute(
      'UPDATE tasks SET title = ?, description = ?, state = ?, idusers = ? WHERE idtasks = ?',
      [task.title, task.description, task.state,1, task.idtasks]
    );

    return task;
  },


};

