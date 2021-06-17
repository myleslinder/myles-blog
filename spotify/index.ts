const SPOTIFY_AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize'
const SPOTIFY_TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'

export class SpotifyApi {
  clientId: string
  clientSecret: string

  isValid: boolean = true

  _scopes
  get scopes() {
    return this._scopes.split(' ')
  }
  set scopes(s) {
    if (this._scopes) {
      this.isValid = false
    }
    this._scopes = s.join(' ')
  }

  constructor(clientId, clientSecret, scopes) {
    this.clientId = clientId
    this.clientSecret = clientSecret
    this._scopes = scopes
  }
}
