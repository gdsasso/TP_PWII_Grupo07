const formLogin = document.getElementById('form-login');
const loginUser = document.getElementById('username');
const loginPassword = document.getElementById('password');
//const contLogout = document.getElementById('cont-logout');
const messageErrorLogin = document.getElementById('messageErrorLogin');

/**
 * Llamado a la API.
 *
 * @param {'get'|'post'|'delete'|'put'} method
 * @param {'/users'|'/users/:id'} endpoint
 * @returns
 */
 async function api(method, endpoint, body = undefined) {
    if (body) {
      body = JSON.stringify(body);
    }
  
    const headers = {
      'Content-Type': 'application/json',
    };
  
    const token = localStorage.getItem('token');
  
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  
    const response = await fetch(`/api${endpoint}`, {
      method,
      body,
      headers,
    });
  
    const data = await response.json();
  
    return data;
  }



function isLoggedIn() {
  return Boolean(localStorage.getItem('token'));
}



function updateLoginStatus() {
  if (isLoggedIn()) {
    // Usuarrio autenticado
    //formLogin.classList.add('hidden');
    //contLogout.classList.remove('hidden');
    
  } else {
    // Usuario SIN autenticar
    //formLogin.classList.remove('hidden');
    //contLogout.classList.add('hidden');
  }
}

function logout() {
  localStorage.clear();
  updateLoginStatus();
  window.location.href = "/";
}

async function login() {
  const username = loginUser.value;
  const password = loginPassword.value;


  const response = await api('post', '/login', { username, password });
  
  
  if (response.status === 'error') {
    //alert(response.error);
    var toastHTML = `<span>${response.error}</span>`;
     M.toast({html: toastHTML, classes: 'rounded'});
     
    
     
    
    //messageErrorLogin.innerHTML = response.error;
  } else {
    // Guardo el Token en mi sesion actual
    localStorage.setItem('token', response.accessToken);
    // Guardo el Nombre de usuario en mi sesion actual
    localStorage.setItem('name', response.username);
    // Guardo el Id de usuario en mi sesion actual
    localStorage.setItem('idUser', response.idUser);
    

    window.location.href = "tasks.html";


    updateLoginStatus();

    // Cargo datos del sitio
    //loadTable();
  }
}

updateLoginStatus();