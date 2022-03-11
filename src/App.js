import React, { useEffect, useState } from 'react'

import './App.css'
import useFetching from './hooks/useFetching'
import API from './API'
import { getPageCount } from './utils/pages'
import { addRateField } from './utils/addRateField'
import Paginat from './component/paginat/paginat'
import MovieList from './component/movie-list/movie-list'
import TabBar from './component/tab-bar/tab-bar'
import Search from './component/search/search'
import Spinner from './component/spinner/spinner'
import { useLocalStorage } from './hooks/useLocalStorage'

function App() {
  const [movies, setMovies] = useState([])
  const [totalPages, setTotalPages] = useState(0)
  const [page, setPage] = useState(1)
  const [genres, setGeneres] = useState([])
  const [rateMovie, setRateMovie] = useLocalStorage('rated', {})
  const [tab, setTab] = useState(1)
  const [searchValue, setSearchValue] = useState('')
  window.onunload  = function() {
    localStorage.clear()
  }
  console.log(totalPages, page)
  const [fetchMovies, isMoviesLoading, moviesError] = useFetching(async () => {
    const response = await API.getAll(page)
    setMovies(response.data.results)
    addRateField(rateMovie, setMovies)
    // if(Object.keys(rateMovie).length !== 0){
    //   return setMovies( (prevState) =>
    //       prevState.map((item) => {
    //         if (item.id === rateMovie[item.id]?.id) {
    //           return { ...item, rated: rateMovie[item.id]?.rated, starsValue: rateMovie[item.id]?.starsValue}
    //         }
    //         return item
    //       })
    //   )
    // }
    const totalCount = response.data.total_pages
    setTotalPages(getPageCount(totalCount, 20))
  })
  const [fetchGenres] = useFetching(async () => {
    const data = await API.fetchGenres()
    setGeneres(data.genres)
  })
  const [fetchSessionId] = useFetching(async () => {
    await API.fetchSession()
  })
  const [fetchRateData] = useFetching(async () => {
    const data = await API.getRatedMovies()
    const reteData = await JSON.parse(data)
    return setMovies( (prevState) =>
      prevState.map((item) => {
        if (item.id === reteData[item.id]?.id) {
          return { ...item, rated: reteData[item.id]?.rated, starsValue: reteData[item.id]?.starsValue}
        }
        return item
      })
    )
  })
  const [fetchSearchQueryData, isLoadingQuery] = useFetching(async () => {

    if(searchValue.trim()){
      const data = await API.getSearchQuery(searchValue, page)
      setMovies(data.results)
      const totalCount = data.total_pages
      setTotalPages(getPageCount(totalCount, 20))
      addRateField(rateMovie, setMovies)
      // if(Object.keys(rateMovie).length !== 0){
      //   return setMovies( (prevState) =>
      //       prevState.map((item) => {
      //         if (item.id === rateMovie[item.id]?.id) {
      //           return { ...item, rated: rateMovie[item.id]?.rated, starsValue: rateMovie[item.id]?.starsValue}
      //         }
      //         return item
      //       })
      //   )
      // }

    }

  })

  const handlerStars = async (id, stars) => {
    await API.createPostRate(id, stars)
    for await (let movie of movies) {
      if (movie.id === id) {
        setRateMovie({ ...rateMovie, [movie.id]: { ...movie, rated: true, starsValue: stars } })
      }
    }
  }
// основные фильмы
  useEffect(() => {
    fetchMovies()
  }, [page])
  // жанры
  useEffect(() => {
    fetchGenres()
  }, [])
// сессия
  useEffect(() => {
    fetchSessionId()
  }, [])
  useEffect(() => {
    fetchRateData()
  }, [tab, rateMovie, page])
  useEffect(() => {
    fetchSearchQueryData()
    if(!searchValue.trim()){
      fetchMovies()
    }
  }, [searchValue, page])

  const handleChangeTabs = (e) => {
    setTab(e)
  }

  let transformRateMovie = []
  for (const item in rateMovie) {
    transformRateMovie.push(rateMovie[item])
  }
  console.log(searchValue)
  return (
    <div className='wrapper'>
      <TabBar onChangeTabs={handleChangeTabs} />
      {
         tab == 1 ?
             <Search
             placeholder="...search"
             searchValue={searchValue}
             setSearchValue={setSearchValue}
             loading={isLoadingQuery}
         /> : ''
      }
      <div className='main'>
        {
          moviesError && <>Ошибка</>
        }
        {isMoviesLoading ? <Spinner /> : (
          <MovieList movies={ tab == 2 ? transformRateMovie : movies } genres={genres} onStars={handlerStars} />
        )}
      </div>

      <div className='footer'>
        {
          tab == 1 ? <Paginat totalPages={totalPages} page={page} setPage={setPage} /> : ''
        }
      </div>
    </div>
  )
}

export default App
