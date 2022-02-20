import React, { useEffect, useState } from "react";
import axios from 'axios'

function App() {

  const [photos, setPhotos] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [fetching, setFetching] = useState(true)
  const [totalCount, setTotalCount] = useState(1)

  let ss = totalCount

  useEffect(() => {
    if(fetching) {
      console.log('fetching');
      axios.get(`https://jsonplaceholder.typicode.com/photos?_limit=10&_page=${currentPage}`)
      .then(responce => {
        setPhotos([...photos, ...responce.data])
        setCurrentPage(currentPage => currentPage + 1)
        setTotalCount(responce.headers['x-total-count'])
        console.log(totalCount, photos.length)
      })
      .finally(() => setFetching(false))
    }
  }, [fetching])

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);

    return function() {
      document.removeEventListener('scroll', scrollHandler)
    }
  }, [])

  const scrollHandler = (e) => {
    if(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 
&& photos.length < totalCount) {
      console.log('scroll');
      
      setFetching(true)
    }
    
  }

  return (
    <div className="App">
      {photos.map((photo) => {
        return (
          <div className="photo" key={photo.id}>
            <div className="photo-title">{photo.title}</div>
            <img src={photo.thumbnailUrl} alt=""/>
          </div>
        )
      })}
    </div>
  );
}

export default App;
