/* write js here  */

function searchMarvelCharacters (searchTerm, limit=100, offset=1) {
  const apiBaseURL = "http://gateway.marvel.com/v1/public"
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
}
