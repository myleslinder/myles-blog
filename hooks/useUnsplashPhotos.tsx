import { useState, useEffect } from 'react'
import useFetch from './useFetch'

const UNSPLASH_BASE_URL = 'https://api.unsplash.com/'
const UNSPLASH_SEARCH_ENDPOINT = '/search/photos'

const fetchUnsplashImage = async (searchTerm: string, pageSize: number) => {
  const query = `?client_id=LFahHN5RytlyRtTrkUUJ2qcragqDR5UHxaJ7mc90VQs&query=${encodeURIComponent(
    searchTerm,
  )}&per_page=${pageSize}`

  return fetch(`${UNSPLASH_BASE_URL}${UNSPLASH_SEARCH_ENDPOINT}${query}`).then(
    res => res.json(),
  )
}

export default function useUnsplashPhotos(
  searchTerm = 'Vancouver',
  pageSize = 10,
) {
  const [imagesRes, setImagesRes] = useState(null)
  const query = `?client_id=LFahHN5RytlyRtTrkUUJ2qcragqDR5UHxaJ7mc90VQs&query=${encodeURIComponent(
    searchTerm,
  )}&per_page=${pageSize}`
  useEffect(() => {
    fetch(`${UNSPLASH_BASE_URL}${UNSPLASH_SEARCH_ENDPOINT}${query}`)
      .then(res => res.json())
      .then(json => setImagesRes(json))
  }, [])
  return imagesRes?.results || []
}
