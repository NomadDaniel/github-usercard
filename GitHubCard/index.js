/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers, manually find some other users' github handles, or use the list found at the bottom of the page. Get at least 5 different Github usernames and add them as individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

function GithubCard(object){
  const card = document.createElement('div')
  card.classList.add('card')

  const img = document.createElement('img')
  img.src = object['avatar_url']

  const cardInfo = document.createElement('div')
  cardInfo.classList.add('card-info')

  const name = document.createElement('h3')
  name.classList.add('name')
  name.textContent = object.login

  const username = document.createElement('p')
  username.classList.add('username')
  username.textContent = object.name

  const location = document.createElement('p')
  location.textContent = `Location: ${object.location}`

  const profile = document.createElement('p')
  profile.textContent = `Profile: `

  const githubLink = document.createElement('a')
  githubLink.href = object['html_url']
  githubLink.textContent = object['html_url']

  const followers = document.createElement('p')
  followers.textContent = `Followers: ${object.followers}`

  const following = document.createElement('p')
  following.textContent = `Following: ${object.following}`

  const bio = document.createElement('p')
  bio.textContent = `Bio: ${object.bio}`

  card.appendChild(img)
  card.appendChild(cardInfo)
  cardInfo.appendChild(name)
  cardInfo.appendChild(username)
  cardInfo.appendChild(location)
  cardInfo.appendChild(profile)
  cardInfo.appendChild(followers)
  cardInfo.appendChild(following)
  cardInfo.appendChild(bio)
  profile.appendChild(githubLink)

  return card
}


const cards = document.querySelector('.cards')

axios.get('https://api.github.com/users/nomaddaniel')
  .then((response) => {
    console.log(response)
    cards.appendChild(GithubCard(response.data))
    })
/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
const instructors = ['tetondan', 'dustinmyers', 'justsml', 'luishrd', 'bigknell']

instructors.forEach(instructor => {
  axios.get(`https://api.github.com/users/${instructor}`)
  .then(response => {
    cards.appendChild(GithubCard(response.data))
  }) 
})

const followerurl = []

axios.get('https://api.github.com/users/nomaddaniel/followers')
  .then ((response) => {
    console.log(response.data)
    response.data.forEach(item => {
      followerurl.push(item.url)
    })
    followerurl.forEach(urlItem => {
      axios.get(urlItem)
        .then ((response) => {
          cards.appendChild(GithubCard(response.data))
        })
    })
  }) 

const followingurl = []

axios.get('https://api.github.com/users/nomaddaniel/following')
  .then ((response) => {
    console.log(response.data)
    response.data.forEach(item => {
      followingurl.push(item.url)
    })
    followingurl.forEach(urlItem => {
      axios.get(urlItem)
        .then ((response) => {
          cards.appendChild(GithubCard(response.data))
        })
    })
  }) 