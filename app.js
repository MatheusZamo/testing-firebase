import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.1/firebase-app.js'
import { getFirestore, collection, getDocs, addDoc, serverTimestamp, doc, deleteDoc, onSnapshot } from 'https://www.gstatic.com/firebasejs/9.0.1/firebase-firestore.js'

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
const collectionGames = collection(db, 'games')

const formAddGame = document.querySelector('[data-js="add-game-form"]')
const gamesList = document.querySelector('[data-js="games-list"]')
const buttonUnsub = document.querySelector('[data-js="unsub"]')

const unsubscribe = onSnapshot(collectionGames, querySnapshot => {
  if(!querySnapshot.metadata.hasPendingWrites) {
    const gamesLis = querySnapshot.docs.reduce((acc, doc) => {
      const { title, developedBy, createdAt } = doc.data()

      acc += `<li class="my-4" data-id ="${doc.id}">
      <h5>${title}</h5>
          
      <ul>
        <li>Desenvolvido por ${developedBy}</li>
        <li>Adicionado no banco em ${createdAt.toDate()}</li>
      </ul>
      <button class="btn btn-danger btn-sm" data-remove="${doc.id}">Remover</button>
    </li>`

    return acc
  }, '')

  gamesList.innerHTML = gamesLis
  }
})


formAddGame.addEventListener('submit', e =>{
  e.preventDefault()
  
  addDoc(collectionGames, {
    title : e.target.title.value,
    developedBy : e.target.developer.value,
    createdAt : serverTimestamp()
  })
  .then(doc => console.log("Documento criado com o Id", doc.id))
  //.cath(console.log)
})

gamesList.addEventListener('click',e => {
  const idRemoveButton = e.target.dataset.remove
  
  if(idRemoveButton){
    deleteDoc(doc(db, 'games', idRemoveButton))
      .then(() => console.log('Game removido'))
      .catch(console.log)
    
  }
})

buttonUnsub.addEventListener('click',unsubscribe)
