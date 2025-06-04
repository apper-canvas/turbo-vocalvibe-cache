import recordingData from '../mockData/recordings.json'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let recordings = [...recordingData]

const recordingService = {
  async getAll() {
    await delay(250)
    return [...recordings]
  },

  async getById(id) {
    await delay(200)
    const recording = recordings.find(item => item.id === id)
    return recording ? {...recording} : null
  },

  async create(recordingData) {
    await delay(500)
    const newRecording = {
      ...recordingData,
      id: Date.now().toString()
    }
    recordings.unshift(newRecording)
    return {...newRecording}
  },

  async update(id, updateData) {
    await delay(350)
    const recordingIndex = recordings.findIndex(item => item.id === id)
    if (recordingIndex === -1) throw new Error('Recording not found')
    
    recordings[recordingIndex] = { ...recordings[recordingIndex], ...updateData }
    return {...recordings[recordingIndex]}
  },

  async delete(id) {
    await delay(300)
    const recordingIndex = recordings.findIndex(item => item.id === id)
    if (recordingIndex === -1) throw new Error('Recording not found')
    
    recordings.splice(recordingIndex, 1)
    return { success: true, id }
  }
}

export default recordingService