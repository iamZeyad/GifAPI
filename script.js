const XHRbtn = document.getElementById('XHR')
const fetchBtn = document.getElementById('fetch')
const asyncFetchbtn = document.getElementById('asyncFetch')

let queryElem = document.getElementById('query')
let result = document.getElementById('result')

const API = 'https://api.giphy.com/v1/gifs/search'
const APIkey = 'FuhNlY725v33YJnC3b6r1UtnNKAcI5iz'

XHRbtn.addEventListener('click', function(){
    result.innerHTML = ''
    searchUsingXHR(queryElem.value)
})

fetchBtn.addEventListener('click', function(){
    result.innerHTML = ''
    searchUsingFetch(queryElem.value)
})

asyncFetchbtn.addEventListener('click', function(){
    result.innerHTML = ''
    searchUsingAsyncFetch(queryElem.value)
})


function searchUsingXHR(query) {
    if(!query ||query.trim().length ===0){
        return true
    }

    let xhr = new XMLHttpRequest()
    xhr.addEventListener('readystatechange', function(){
        if(xhr.readyState === 4 && xhr.status === 200){
            console.log(JSON.parse(xhr.responseText))
            displayResults(JSON.parse(xhr.responseText))
        }
    })
    let parms = 'api_key=' + APIkey + '&q=' + query + '&limit=5&rating=g';
    xhr.open('GET', API + '?' + parms)
    xhr.send()
}

function searchUsingFetch(query){
    if(!query ||query.trim().length ===0){
        return true
    }
    let parms = 'api_key=' + APIkey + '&q=' + query + '&limit=5&rating=g';
    fetch(API + '?' + parms)
    .then((response)=> {
        return response.text()
    }).then((text)=> {
        displayResults(JSON.parse(text))
    }).catch((error)=> {
        console.log(error)
    })
}

async function searchUsingAsyncFetch(query){
    if(!query ||query.trim().length ===0){
        return true
    }
    let parms = 'api_key=' + APIkey + '&q=' + query + '&limit=5&rating=g';

    let response = await fetch(API + '?' + parms)
    let data = await response.json()
    displayResults(data)
}

function displayResults(responseObj) {
    for(item of responseObj.data){
        let imgElem = document.createElement('img')
        imgElem.src = item.images.downsized_medium.url
        imgElem.alt = item.title
        result.appendChild(imgElem);
    }
}