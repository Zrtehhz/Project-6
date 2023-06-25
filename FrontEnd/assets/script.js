let bouton = document.querySelectorAll('.project button');
let images = document.querySelectorAll('.gallery figure');


let filtrerParCategorie = (category) => {

  images.forEach((image) => {
    let imageId = image.querySelector('img').id;
    image.style.display = imageId === category || category === '' ? 'block' : 'none';
  });
};


bouton.forEach((button) => {
  button.addEventListener('click', () => {
    let category = button.id; 
    filtrerParCategorie(category);
  });
});


// Partie login

const login = {
  email: 'sophie.bluel@test.tld',
  password: 's0phie',
  }


const body = JSON.stringify(login);


fetch('http://localhost:5678/api/users/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: body
})



.then(() => console.log("ok"))


const postLogin = (req, res) => {
  User.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non Autorisé !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: 1,
            token: jwt.sign(
              { userId: 1 },
              'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4',
            )
          });
        })
        .catch(error => res.status(404).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};
