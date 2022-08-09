/////////////////////////////Home-Page///////////////////


const destinationsContainer = document.querySelector('#destinations-container')

const destinationForm = document.querySelector('#destinations-form')

const date = document.querySelector('#date');

const baseURL = `/api/destinations`

const destinationsCallback = ({ data: destinations }) => displayDestinations(destinations);

const errCallback = err => console.log(err);

const getAllDestinations = () => axios.get(baseURL).then(destinationsCallback).catch(errCallback);

const createDestination = body => axios.post(baseURL, body).then(destinationsCallback).catch(errCallback);


const deleteDestination = id => axios.delete(`${baseURL}/${id}`).then(destinationsCallback).catch(errCallback);

const updateDestination = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(destinationsCallback).catch(errCallback);


function submitDestination(event) {
    event.preventDefault()

    let title = document.querySelector('#title')
   
    let freshDate = date.value
    // console.log(date.value.split('-'))
    freshDate= freshDate.split('-')
    
        let year = freshDate.shift()
        freshDate.push(year)
       freshDate = freshDate.join('-')
        console.log(freshDate)

    let bodyObj = {
        title: title.value,
        detail: detail.value,
        date: freshDate,
        imageURL: imageURL.value
    }

    createDestination(bodyObj)
    
    title.value = ''
    detail.value = ''
    date.value = ''
    imageURL.value = ''
}
    function createDestinationCard(destination){
            const destinationCard = document.createElement('div')
            destinationCard.classList.add('destination-card')

            destinationCard.innerHTML = `<br>
            <p class="destination-title">${destination.title}</p>
            <br>
            <p class="destination-date"> ${destination.date}</p>
            <br>
            <img src="${destination.imageURL}" alt="${destination.title}" class="card-image">
            <br>
            <p class="destination-detail"> ${destination.detail} </p>
            <br>
           
            <div class="btns-container"></div>
            <button onclick="deleteDestination(${destination.id})">delete</button>`
           
            destinationsContainer.appendChild(destinationCard);
     }

    function displayDestinations(arr) {
        destinationsContainer.innerHTML = ``
        for (let i = 0; i < arr.length; i++) {
            createDestinationCard(arr[i])
        }
    }
    
    destinationForm?.addEventListener("submit", submitDestination)
    
    destinationsContainer && getAllDestinations();


/////////////////////////////////Future-Destinations-Page//////////////////////////

const countriesBaseURL = `/api/countries`

const countriesCallback = ({ data: countries}) => displayCountries(countries);

const getAllCountries = () => axios.get(countriesBaseURL).then(countriesCallback).catch(errCallback)

const deleteCountry = id => axios.delete(`${countriesBaseURL}/${id}`).then(countriesCallback).catch(errCallback)

const wishlistContainer = document.querySelector('#wishlist-container')

const wishlistForm = document.querySelector('#wishlist-form')

let countrySelect = document.querySelector('#countries-select')


function submitCountry(event) {
    event.preventDefault()
    
    addToWishlist(countrySelect.value)
}

function displayCountries(countries){
    wishlistContainer.innerHTML = ''
    countries.forEach((country) => {
    let countryCard = document.createElement('div')
    countryCard.classList.add('country-card')

    countryCard.innerHTML = `<p class="country-title">${country.title}</p> 
     <div id="deleteWishlistBtn"></div>
    <button onclick="deleteCountry(${country.id})" id="delete-country">delete</button>`
   
    wishlistContainer.appendChild(countryCard);
    
    })

}


wishlistForm?.addEventListener("submit", submitCountry);


function addToWishlist(country){
    axios.post('/api/countries', {country}).then(res => {
    displayCountries(res.data)

    })
}


wishlistContainer && getAllCountries();

////////////////////////logOut-Button(Redirect to log in page)///////////////////////////////

const logOutBtn = document.querySelector('#log-out');

function userLogOut(e){
    e.preventDefault()
    localStorage.clear()
    window.location = "/login"
}

logOutBtn.addEventListener('click', userLogOut);


////////////////////////////////////////////////////////////////////////////

if(!localStorage.getItem('user')){
    window.location = '/login'
}

