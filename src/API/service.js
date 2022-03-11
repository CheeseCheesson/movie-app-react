import axios from 'axios'

const APIKEY = '44ead1c60d2a28ed7c4cb77e1a659793'
const BASE = 'https://api.themoviedb.org/3'

export const getAll = async (page = 1) => {
    const response = await axios.get(`${BASE}/discover/movie?api_key=${APIKEY}&language=ru-US&sort_by=popularity.desc`, {
        params: {
            page: page
        }
    })
    return response
}
export const fetchGenres = async () => {
    const {data} = await axios.get(`${BASE}/genre/movie/list?api_key=${APIKEY}&language=ru-US`)
    return data
}

export const fetchSession = async () => {
  if (!localStorage.guestSessionID){
    const {data} = await axios.get(`${BASE}/authentication/guest_session/new?api_key=${APIKEY}`)
    localStorage.setItem('guestSessionID', data.guest_session_id)
  }
}

export const createPostRate = async (id, stars) => {
if(localStorage.getItem('guestSessionID')){
  return await fetch(
    `${BASE}/movie/${id}/rating?api_key=${APIKEY}&language=ru-US&guest_session_id=${localStorage.getItem('guestSessionID')}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        'value': stars
      })
    }
  )
}

}
// export const deletePostRate = async (id) => {
//   return await fetch(
//         `${BASE}/movie/${id}/rating?api_key=${APIKEY}&guest_session_id=${localStorage.getItem('guestSessionID')}`,
//         {
//             method: 'DELETE',
//             headers: {
//                 'Content-Type': 'application/json;charset=utf-8',
//             }
//         }
//     )
// }

export const getRatedMovies =  () => {
  return localStorage.getItem('rated')
}

export const getSearchQuery = async (searchValue, page) => {
    if (!searchValue) {
        return
    }
    const {data} = await axios.get(`${BASE}/search/movie?api_key=${APIKEY}&language=ru-US&query=${searchValue}&page=${page}`)
    return data
}