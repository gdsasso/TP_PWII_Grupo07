//Menú responsive
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {});
    
  });

  const liUserName = document.getElementById('textUsername');
  const liUserNameMobile = document.getElementById('textUsernameMobile');
  
  const userLoged =localStorage.getItem('idUser')  

  // Referencia a la tabla de contenido
const contentTable = document.getElementById('contentTable');
// Referencia al template
const templateRow = document.getElementById('contentRow').content;

  //Agregar tasks
  const cardFormTasksAdd = document.getElementById('cardFormTasksAdd');
  const buttonAddTasks = document.getElementById('buttonAddTasks');

  //Editar tasks
  const cardFormTasksEdit = document.getElementById('cardFormTasksEdit');
  const buttoneditTasks = document.getElementsByClassName('buttonEditTasks');

  

  buttonAddTasks.addEventListener('click', () => showFormAdd());
  //buttoneditTasks.addEventListener('click', () => showFormEdit());


 function showFormAdd(){
    cardFormTasksEdit.style.display = 'none';
    cardFormTasksAdd.style.display = '';
    
  }

  function showFormEdit(){
    cardFormTasksAdd.style.display = 'none'; 
    cardFormTasksEdit.style.display = '';
    window.scrollTo(0, 0);
  }

  
  
  //Agrego el nombre al menu si existe el username en localStorage

  function paintUsername(){
    const userName = localStorage.getItem('name');
    //alert (userName)
    if (userName) {
      liUserName.innerHTML =`Bienvenido ${userName}` ;
      liUserNameMobile.innerHTML =`Bienvenido ${userName}` ;
    }else{
      liUserName.innerHTML = '';
      liUserNameMobile.innerHTML ='';
    }

    initApp();
    
  }


/**
 * Agregar Row.
 *
 * @param {*} title
 * @param {*} description
 * @param {*} state
 * @param {*} idtasks
 */
 function addRow(title, description, state, idtasks) {
  // Clono el template en una nueva variable
  const row = templateRow.cloneNode(true);

  // Modifico el valor del nodo de texto por el ingesado por el usuario
  row.querySelector('.txtTitle').innerText = title;
  row.querySelector('.txtDescription').innerText = description;
  row.querySelector('.txtState').innerText = state;

  row.querySelector('.buttonDeleteTasks').onclick = () => deleteTask(idtasks);
  row.querySelector('.buttonEditTasks').addEventListener('click', () => updateTask(idtasks));

  row.querySelector('.td-row').dataset.id = idtasks;

  // Inserto en el contenido de la tabla
  contentTable.appendChild(row);
}




  /**
 * Cargar datos de la tabla.
 */
async function loadTable() {
  if (localStorage.getItem('token')) {
    contentTable.innerHTML = '';
    const data = await api('get', '/task');
    console.log(userLoged);
    data.forEach(({ title, description, state, idtasks }) => addRow(title, description, state, idtasks));
  }
}

/**
 * Inicio de la APP.
 */
 async function initApp() {
  await loadTable();
}


  cardFormTasksAdd.style.display = 'none';
  cardFormTasksEdit.style.display = 'none';


async function deleteTask(id) {
  await api('delete', `/task/${id}`);
  
  const taskRow = document.querySelector(`[data-id='${id}']`);
  taskRow.remove();
  }
  