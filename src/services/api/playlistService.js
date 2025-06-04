import playlistData from '../mockData/playlists.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let playlists = [...playlistData]

const playlistService = {
  async getAll() {
    await delay(250)
    return [...playlists]
  },

  async getById(id) {
    await delay(200)
    const playlist = playlists.find(item => item.id === id)
    return playlist ? {...playlist} : null
  },

  async create(playlistData) {
    await delay(400)
    const newPlaylist = {
      ...playlistData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    }
    playlists.unshift(newPlaylist)
    return {...newPlaylist}
  },

  async update(id, updateData) {
    await delay(350)
    const playlistIndex = playlists.findIndex(item => item.id === id)
    if (playlistIndex === -1) throw new Error('Playlist not found')
    
    playlists[playlistIndex] = { ...playlists[playlistIndex], ...updateData }
    return {...playlists[playlistIndex]}
  },

  async delete(id) {
    await delay(300)
    const playlistIndex = playlists.findIndex(item => item.id === id)
    if (playlistIndex === -1) throw new Error('Playlist not found')
    
    playlists.splice(playlistIndex, 1)
    return { success: true, id }
  }
}

export default playlistService