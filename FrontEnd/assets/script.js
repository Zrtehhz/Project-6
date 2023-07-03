let url = 'http://localhost:5678/api/categories';
let figure = document.createElement('figure');
let img = document.createElement('img');
let figcaption = document.createElement('figcaption');
let gallery = document.querySelector("gallery");


const filterBtns = document.querySelectorAll('button')

const fetchData = async () => {
  try {
    const response = await fetch(url)
    const data = await response.json()
    if (response.status === 200) {
      filterBtns.forEach((btn) => {
        btn.addEventListener('click', (e) => {
          let id = userId.id
          //   console.log(data)
          data.filter((league) => {
            let res = league.competition
            if (res.includes(id)) {
              return res
            }
          })
        })
      })
      let output = data.map((result) => {
        return ''
      })
      output = output.join(' ')
      content.innerHTML = output
    }
  } catch (error) {
    console.log(error)
  }
}

fetchData()



// Partie login

let login = document.getElementById('login');

let Token = sessionStorage.getItem('accessToken');

if (Token) {
    login.innerText = 'logout';

    login.addEventListener('click', logout);
} else {
    login.addEventListener('click', performLogin);
}

function performLogin() {
    let email = document.getElementById('email').value;
    let pass = document.getElementById('password').value;

    if (email === 'sophie.bluel@test.tld' && pass === 'test123') {
        // Remplacez le code suivant par la logique de connexion réelle, par exemple, une requête à votre API pour vérifier les informations d'identification
        let userId = 1;
        let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4';

        sessionStorage.setItem('accessToken', token);
        sessionStorage.setItem('userId', userId);
        window.location.href = 'FrontEnd/index.html';
    } else {
        alert('Email ou mot de passe incorrects !');
    }
}

function logout() {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('userId');
    window.location.reload();
}
