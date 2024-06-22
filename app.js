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

const getFormattedDate = createdAt => 
  new Intl.DateTimeFormat('pt-BR',{dateStyle:'short',timeStyle:'short'}).format(createdAt.toDate())

const renderGamesList = querySnapshot => {
  if(!querySnapshot.metadata.hasPendingWrites) {
    const gamesLis = querySnapshot.docs.reduce((acc, doc) => {
      const [id, { title, developedBy, createdAt }] = [doc.id, doc.data()]

      return `${acc}<li class="my-4" data-id ="${id}">
      <h5>${title}</h5>
          
      <ul> 
        <li>Desenvolvido por ${developedBy}</li>
        <li>Adicionado no banco em ${getFormattedDate(createdAt)}</li>
      </ul>
      <button class="btn btn-danger btn-sm" data-remove="${id}">Remover</button>
    </li>`
  }, '')

  gamesList.innerHTML = gamesLis
  }
}

const to = promise => promise
  .then(result => [null, result])
  .catch(error => [error])

const addGame = async e => {
  e.preventDefault()

  const [ error, doc ] = await to(addDoc(collectionGames, {
    title : e.target.title.value,
    developedBy : e.target.developer.value,
    createdAt : serverTimestamp()
  }))
  
  if(error){
    return console.log(error)
  }
  
  e.target.reset()
  e.target.title.focus()
  console.log("Documento criado com o Id", doc.id)
}

const deleteGame = async e => {
  const idRemoveButton = e.target.dataset.remove

  if(!idRemoveButton){
    return 
  }
  
  const [ error ] = await to(deleteDoc(doc(db, 'games', idRemoveButton)))

  if(error){
    return  console.log(error)
  }

  console.log('Game removido')
}


const unsubscribe = onSnapshot(collectionGames, renderGamesList)
gamesList.addEventListener('click',deleteGame)
formAddGame.addEventListener('submit', addGame)
buttonUnsub.addEventListener('click',unsubscribe)
