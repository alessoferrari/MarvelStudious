 // ES6 Modules (ECMAScript 6, 2015...ES2022)
 // This code was made for professor Dmg as a proyect before graduation I'm testing it already created all files from 0 now stating on recode and redone it on my own style and Api //
import { renderGalleryView } from "./view.js"

const CORSProxy = "https://corsproxy.io/?"



console.log("LOG #1")

document.body.addEventListener("keydown", event => {
    console.log("LOG #2")
    console.log(event.key)
})

console.log("LOG #3")



function searchMarvelCharacters (searchTerm, limit=100, offset=1) {
    const apiBaseURL = "https://gateway.marvel.com/v1/public"
    const endpoint = "/characters?"

    const timestamp = Date.now()
    const publicKey = "6dd581e143d4eb3659beaa6938688fbe"
    const privateKey = "ae2d0ea904b0dab43c426401467307d66e4e3d03"
    const hash = md5(timestamp + privateKey + publicKey)

    // const queryParameters = `ts=${timestamp}&apikey=${publicKey}&hash=${hash}&nameStartsWith=${searchTerm}&limit=${limit}&offset=${offset}`
    const queryParameters = new URLSearchParams({
        nameStartsWith: searchTerm,
        limit: limit,
        offset: offset,
        ts: timestamp,
        apikey: publicKey,
        hash: hash,
    })

    const url = apiBaseURL + endpoint + queryParameters.toString()

    return fetch(url)
        .then(response => response.json())
        .then(body => {
            const matchedCharacters = body.data.results

            return matchedCharacters
        })
        // Any data you return from a Promise will be automatically wrapped in a new Promise()!
}

document
    .querySelector("#search-form")
    .addEventListener("submit", event => {
        event.preventDefault()

        const form = event.target
        const searchInputElement = form.elements.search
        
        handleSearchInput(searchInputElement.value)
    })


function handleSearchInput (searchTerm) {
    searchMarvelCharacters(searchTerm)
        .then(characters => {
            console.log(characters)

            const charactersWithValidImages = characters
                .filter(outInvalidImages)

            renderGalleryView(charactersWithValidImages)
        })
}


function outInvalidImages (character) {
    const path = character.thumbnail.path

    return path.includes("image_not_available") === false
        && path.includes("4c002e0305708") === false
}

handleSearchInput("spider")