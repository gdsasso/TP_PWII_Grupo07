//Menú responsive
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems, {});
    
  });

  const liUserName = document.getElementById('textUsername');
  const liUserNameMobile = document.getElementById('textUsernameMobile');
  

  // Referencia a la tabla de contenido
const contentTable = document.getElementById('contentTable');
// Referencia al template
/*const templateRow = document.getElementById('contentRow').content;*/

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
    
  }


  cardFormTasksAdd.style.display = 'none';
  cardFormTasksEdit.style.display = 'none';

