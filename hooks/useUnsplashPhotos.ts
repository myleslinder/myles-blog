import useFetch from './useFetch'

const UNSPLASH_BASE_URL = 'https://api.unsplash.com/'
const UNSPLASH_SEARCH_ENDPOINT = '/search/photos'

const fetchUnsplashImage =
  (searchTerm: string, pageSize: number) =>
  async (): Promise<UnsplashPhotSearchResponse> => {
    const query = `?client_id=LFahHN5RytlyRtTrkUUJ2qcragqDR5UHxaJ7mc90VQs&query=${encodeURIComponent(
      searchTerm,
    )}&per_page=${pageSize}`

    let res = await fetch(
      `${UNSPLASH_BASE_URL}${UNSPLASH_SEARCH_ENDPOINT}${query}`,
    )
    return res.json()
  }

export default function useUnsplashPhotos(
  searchTerm = 'Vancouver',
  pageSize = 10,
) {
  const [state, buildCellComponent] = useFetch(
    fetchUnsplashImage(searchTerm, pageSize),
  )
  return buildCellComponent(state)
}

/**
 * MARK - Type Declarations
 */

export type UnsplashPhotSearchResponse = {
  total: number
  total_pages: number
  results: {
    id: string
    created_at: string
    width: number
    height: number
    color: string
    blur_hash: string
    likes: number
    liked_by_user: false
    description: string
    user: {
      id: string
      username: string
      name: string
      first_name: string
      last_name: string
      instagram_username: string
      twitter_username: string
      portfolio_url: string
      profile_image: {
        small: string
        medium: string
        large: string
      }
      links: {
        self: string
        html: string
        photos: string
        likes: string
      }
    }
    current_user_collections: [any]
    urls: {
      raw: string
      full: string
      regular: string
      small: string
      thumb: string
    }
    links: {
      self: string
      html: string
      download: string
    }
  }[]
}
