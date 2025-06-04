import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'
import songService from '../services/api/songService'
import recordingService from '../services/api/recordingService'

const Home = () => {
  const [songs, setSongs] = useState([])
  const [recordings, setRecordings] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      try {
        const [songsResult, recordingsResult] = await Promise.all([
          songService.getAll(),
          recordingService.getAll()
        ])
        setSongs(songsResult || [])
        setRecordings(recordingsResult || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  const featuredSongs = songs?.slice(0, 6) || []
  const recentRecordings = recordings?.slice(0, 3) || []

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-6">
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent glow-text">
                Sing Your Heart Out
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
              Experience the ultimate karaoke platform with real-time lyrics, professional recording, and seamless sharing
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-primary to-primary/80 text-white font-semibold rounded-xl shadow-neon hover:shadow-cyan-glow transition-all duration-300 flex items-center gap-3"
              >
                <ApperIcon name="Play" className="w-5 h-5" />
                Start Singing Now
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent border-2 border-secondary text-secondary font-semibold rounded-xl hover:bg-secondary hover:text-black transition-all duration-300 flex items-center gap-3"
              >
                <ApperIcon name="Music" className="w-5 h-5" />
                Browse Songs
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Karaoke Player */}
      <section className="py-16 bg-black/40">
        <div className="container mx-auto px-4">
          <MainFeature />
        </div>
      </section>

      {/* Featured Songs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Trending Songs
              </span>
            </h2>
            <p className="text-gray-400 text-center max-w-2xl mx-auto">
              Discover the most popular karaoke tracks and sing along with the latest hits
            </p>
          </motion.div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-gray-800 rounded-xl p-6 animate-pulse">
                  <div className="w-full h-32 bg-gray-700 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-700 rounded mb-2"></div>
                  <div className="h-3 bg-gray-700 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredSongs.map((song, index) => (
                <motion.div
                  key={song.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group bg-gray-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700 hover:border-primary/50 transition-all duration-300"
                >
                  <div className="relative mb-4 overflow-hidden rounded-lg">
                    <img
                      src={song.albumArt || `https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop`}
                      alt={song.title}
                      className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <button className="p-3 bg-primary rounded-full shadow-neon">
                        <ApperIcon name="Play" className="w-6 h-6 text-white" />
                      </button>
                    </div>
                  </div>
                  <h3 className="font-semibold text-white mb-1 truncate">{song.title}</h3>
                  <p className="text-gray-400 text-sm truncate">{song.artist}</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs text-gray-500 bg-gray-700 px-2 py-1 rounded-full">
                      {song.genre}
                    </span>
                    <span className="text-xs text-gray-400">
                      {Math.floor(song.duration / 60)}:{(song.duration % 60).toString().padStart(2, '0')}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Recent Recordings */}
      <section className="py-16 bg-black/40">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-center mb-4">
              <span className="bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                Recent Performances
              </span>
            </h2>
            <p className="text-gray-400 text-center max-w-2xl mx-auto">
              Check out the latest recordings from our community of singers
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentRecordings.map((recording, index) => {
              const song = songs.find(s => s.id === recording.songId)
              return (
                <motion.div
                  key={recording.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-md rounded-xl p-6 border border-gray-700"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
                      <ApperIcon name="Mic" className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{song?.title || "Unknown Song"}</h3>
                      <p className="text-gray-400 text-sm">{song?.artist || "Unknown Artist"}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ApperIcon name="Clock" className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-400">
                        {Math.floor(recording.duration / 60)}:{(recording.duration % 60).toString().padStart(2, '0')}
                      </span>
                    </div>
                    {recording.score && (
                      <div className="flex items-center gap-2">
                        <ApperIcon name="Star" className="w-4 h-4 text-accent" />
                        <span className="text-sm text-accent font-semibold">{recording.score}%</span>
                      </div>
                    )}
                  </div>
                  <button className="w-full mt-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors duration-300 flex items-center justify-center gap-2">
                    <ApperIcon name="Play" className="w-4 h-4" />
                    Play Recording
                  </button>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: "Music", label: "Songs Available", value: songs.length?.toLocaleString() || "0" },
              { icon: "Users", label: "Active Singers", value: "50K+" },
              { icon: "Mic", label: "Recordings Made", value: recordings.length?.toLocaleString() || "0" },
              { icon: "Share2", label: "Shares Today", value: "1.2K+" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
                  <ApperIcon name={stat.icon} className="w-8 h-8 text-primary" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home