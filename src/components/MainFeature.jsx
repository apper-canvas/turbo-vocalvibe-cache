import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'
import songService from '../services/api/songService'
import recordingService from '../services/api/recordingService'

const MainFeature = () => {
  const [songs, setSongs] = useState([])
  const [selectedSong, setSelectedSong] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isRecording, setIsRecording] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentLyricIndex, setCurrentLyricIndex] = useState(0)
  const [recordingDuration, setRecordingDuration] = useState(0)
  const [volume, setVolume] = useState(75)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  const recordingTimer = useRef(null)
  const playbackTimer = useRef(null)

  useEffect(() => {
    const loadSongs = async () => {
      setLoading(true)
      try {
        const result = await songService.getAll()
        setSongs(result || [])
        if (result && result.length > 0) {
          setSelectedSong(result[0])
        }
      } catch (err) {
        setError(err.message)
        toast.error("Failed to load songs")
      } finally {
        setLoading(false)
      }
    }
    loadSongs()
  }, [])

  useEffect(() => {
    if (isPlaying && selectedSong) {
      playbackTimer.current = setInterval(() => {
        setCurrentTime(prev => {
          const newTime = prev + 1
          if (newTime >= selectedSong.duration) {
            setIsPlaying(false)
            setCurrentTime(0)
            setCurrentLyricIndex(0)
            return 0
          }
          
          // Update current lyric index based on time
          if (selectedSong.lyrics) {
            const lyricIndex = selectedSong.lyrics.findIndex(lyric => 
              newTime >= lyric.startTime && newTime <= lyric.endTime
            )
            if (lyricIndex !== -1) {
              setCurrentLyricIndex(lyricIndex)
            }
          }
          
          return newTime
        })
      }, 1000)
    } else {
      clearInterval(playbackTimer.current)
    }

    return () => clearInterval(playbackTimer.current)
  }, [isPlaying, selectedSong])

  useEffect(() => {
    if (isRecording) {
      recordingTimer.current = setInterval(() => {
        setRecordingDuration(prev => prev + 1)
      }, 1000)
    } else {
      clearInterval(recordingTimer.current)
    }

    return () => clearInterval(recordingTimer.current)
  }, [isRecording])

  const handlePlayPause = () => {
    if (!selectedSong) {
      toast.warning("Please select a song first")
      return
    }
    setIsPlaying(!isPlaying)
  }

  const handleRecordToggle = async () => {
    if (!selectedSong) {
      toast.warning("Please select a song first")
      return
    }

    if (isRecording) {
      // Stop recording
      setIsRecording(false)
      setRecordingDuration(0)
      
      try {
        const newRecording = {
          songId: selectedSong.id,
          timestamp: new Date().toISOString(),
          duration: recordingDuration,
          audioBlob: null, // In a real app, this would be the actual audio blob
          score: Math.floor(Math.random() * 40) + 60, // Random score between 60-100
          effects: []
        }
        
        await recordingService.create(newRecording)
        toast.success("Recording saved successfully!")
      } catch (err) {
        toast.error("Failed to save recording")
      }
    } else {
      // Start recording
      setIsRecording(true)
      setRecordingDuration(0)
      if (!isPlaying) {
        setIsPlaying(true)
      }
      toast.success("Recording started!")
    }
  }

  const handleSongSelect = (song) => {
    setSelectedSong(song)
    setIsPlaying(false)
    setCurrentTime(0)
    setCurrentLyricIndex(0)
    setSearchQuery("")
  }

  const handleSeek = (newTime) => {
    setCurrentTime(newTime)
    if (selectedSong?.lyrics) {
      const lyricIndex = selectedSong.lyrics.findIndex(lyric => 
        newTime >= lyric.startTime && newTime <= lyric.endTime
      )
      if (lyricIndex !== -1) {
        setCurrentLyricIndex(lyricIndex)
      }
    }
  }

  const filteredSongs = songs.filter(song =>
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const progressPercentage = selectedSong ? (currentTime / selectedSong.duration) * 100 : 0

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gray-900/50 backdrop-blur-md rounded-2xl border border-gray-700 overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-700 bg-gradient-to-r from-primary/10 to-secondary/10">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-center mb-6">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Karaoke Studio
            </span>
          </h2>
          
          {/* Song Search */}
          <div className="relative max-w-md mx-auto">
            <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search for songs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
          {/* Song Library */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <ApperIcon name="Music" className="w-5 h-5 text-primary" />
              Song Library
            </h3>
            <div className="space-y-2 max-h-96 overflow-y-auto scrollbar-hide">
              {filteredSongs.map((song) => (
                <motion.button
                  key={song.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSongSelect(song)}
                  className={`w-full p-4 rounded-lg text-left transition-all duration-300 ${
                    selectedSong?.id === song.id
                      ? 'bg-primary/20 border border-primary/50 text-white'
                      : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={song.albumArt || `https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=60&h=60&fit=crop`}
                      alt={song.title}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{song.title}</h4>
                      <p className="text-sm text-gray-400 truncate">{song.artist}</p>
                      <p className="text-xs text-gray-500">{formatTime(song.duration)}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Main Player */}
          <div className="lg:col-span-2">
            {selectedSong ? (
              <div className="space-y-6">
                {/* Current Song Info */}
                <div className="text-center">
                  <img
                    src={selectedSong.albumArt || `https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop`}
                    alt={selectedSong.title}
                    className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-xl object-cover shadow-soft mb-4"
                  />
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">{selectedSong.title}</h3>
                  <p className="text-gray-400 mb-2">{selectedSong.artist}</p>
                  <span className="inline-block px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-300">
                    {selectedSong.genre}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-400">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(selectedSong.duration)}</span>
                  </div>
                  <div 
                    className="w-full h-2 bg-gray-700 rounded-full cursor-pointer"
                    onClick={(e) => {
                      const rect = e.target.getBoundingClientRect()
                      const x = e.clientX - rect.left
                      const percentage = x / rect.width
                      const newTime = Math.floor(percentage * selectedSong.duration)
                      handleSeek(newTime)
                    }}
                  >
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-300"
                      style={{ width: `${progressPercentage}%` }}
                    />
                  </div>
                </div>

                {/* Lyrics Display */}
                <div className="bg-gray-800/50 rounded-xl p-6 min-h-[200px] flex items-center justify-center">
                  {selectedSong.lyrics && selectedSong.lyrics.length > 0 ? (
                    <div className="text-center space-y-4">
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentLyricIndex}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.5 }}
                          className="space-y-2"
                        >
                          {selectedSong.lyrics[currentLyricIndex] && (
                            <p className="text-2xl md:text-3xl font-bold text-white glow-text">
                              {selectedSong.lyrics[currentLyricIndex].text}
                            </p>
                          )}
                          {selectedSong.lyrics[currentLyricIndex + 1] && (
                            <p className="text-lg text-gray-400">
                              {selectedSong.lyrics[currentLyricIndex + 1].text}
                            </p>
                          )}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  ) : (
                    <div className="text-center text-gray-400">
                      <ApperIcon name="Music" className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p>Lyrics will appear here during playback</p>
                    </div>
                  )}
                </div>

                {/* Controls */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  {/* Volume Control */}
                  <div className="flex items-center gap-3">
                    <ApperIcon name="Volume2" className="w-5 h-5 text-gray-400" />
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={(e) => setVolume(e.target.value)}
                      className="w-20 accent-primary"
                    />
                    <span className="text-sm text-gray-400 w-8">{volume}%</span>
                  </div>

                  {/* Play/Pause Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handlePlayPause}
                    className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center shadow-neon hover:shadow-cyan-glow transition-all duration-300"
                  >
                    <ApperIcon 
                      name={isPlaying ? "Pause" : "Play"} 
                      className="w-8 h-8 text-white" 
                    />
                  </motion.button>

                  {/* Record Button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleRecordToggle}
                    className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isRecording 
                        ? 'bg-red-500 shadow-red-500/50 shadow-lg pulse-neon' 
                        : 'bg-gray-700 hover:bg-gray-600'
                    }`}
                  >
                    <ApperIcon 
                      name={isRecording ? "Square" : "Mic"} 
                      className="w-6 h-6 text-white" 
                    />
                  </motion.button>

                  {/* Recording Duration */}
                  {isRecording && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-2 px-4 py-2 bg-red-500/20 rounded-full border border-red-500/50"
                    >
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      <span className="text-red-400 font-mono text-sm">
                        {formatTime(recordingDuration)}
                      </span>
                    </motion.div>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-20">
                <ApperIcon name="Music" className="w-20 h-20 mx-auto mb-6 text-gray-600" />
                <h3 className="text-xl font-semibold text-gray-400 mb-2">No Song Selected</h3>
                <p className="text-gray-500">Choose a song from the library to start singing</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default MainFeature