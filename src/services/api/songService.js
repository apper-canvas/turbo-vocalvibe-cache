import songData from '../mockData/songs.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const songService = {
  async getAll() {
    await delay(300)
    return [...songData]
  },

  async getById(id) {
    await delay(200)
    const song = songData.find(item => item.id === id)
    return song ? {...song} : null
  },

  async create(songData) {
    await delay(400)
    const newSong = {
      ...songData,
      id: Date.now().toString()
    }
    return {...newSong}
  },

  async update(id, updateData) {
    await delay(350)
    const songIndex = songData.findIndex(item => item.id === id)
    if (songIndex === -1) throw new Error('Song not found')
    
    const updatedSong = { ...songData[songIndex], ...updateData }
    return {...updatedSong}
  },

  async delete(id) {
    await delay(300)
    const songIndex = songData.findIndex(item => item.id === id)
    if (songIndex === -1) throw new Error('Song not found')
    
    return { success: true, id }
  }
}

export default songService