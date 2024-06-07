import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js'
import { getFirestore, collection, getDocs } from 'https://www.gstatic.com/firebasejs/9.0.1/firebase-firestore.js'

  const firebaseConfig = {
    apiKey: 'AIzaSyCbCND3A5RFLNPa6tt05hp-j7oLJn-mA7E',
    authDomain: 'testing-firebase-d4355.firebaseapp.com',
    projectId: 'testing-firebase-d4355',
    storageBucket: 'testing-firebase-d4355.appspot.com',
    messagingSenderId: '121381485430',
    appId: '1:121381485430:web:b7999983c4546c1f645857',
    measurementId: 'G-F9H2J6JLSQ'
  };

  
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app)
  
  getDocs(collection(db, 'games'))
    .then(querySnapshot => {
        const gamesLis = querySnapshot.docs.reduce((acc, doc) => {
            const { title, developedBy, createdAt } = doc.data()

            acc += `<li class="my-4">
            <h5>${title}</h5>
            
            <ul>
              <li>Desenvolvido por ${developedBy}</li>
              <li>Adicionado no banco em ${createdAt.toDate()}</li>
            </ul>
          </li>`

          return acc
        }, '')

        const gamesList = document.querySelector('[data-js="games-list"]')
        gamesList.innerHTML += gamesLis
    }) 
    .cath(console.log('Error'))