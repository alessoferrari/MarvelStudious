/* write js here  */
console.log("LOG #1")

document.body.addEventListener("keydown", event => {
    console.log("LOG #2")
    console.log(event.key)
})

console.log("LOG #3")

function searchMarvelCharacter (searchTerm, limit=100, offset=1) {
    const apiBaseURL = "http://gateway.marvel.com/v1/public"
    const endpoint = "/characters?"

    const timestamp = Date.now()
    const publicKey = "b9fc22f1180ad898d71fd0aefbf2d6c7"
    const privateKey = "7601e2197395f07918ed83b4fcb768bd5451c9b7"
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