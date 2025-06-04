import React, { useState, useEffect, useRef } from 'react';
      import { motion, AnimatePresence } from 'framer-motion';
      import { toast } from 'react-toastify';
      import ApperIcon from '../ApperIcon';
      import Input from '../atoms/Input';
      import Image from '../atoms/Image';
      import Text from '../atoms/Text';
      import ProgressBar from '../atoms/ProgressBar';
      import PlayerControls from '../molecules/PlayerControls';
      import SongListItem from '../molecules/SongListItem';
      import songService from '../../services/api/songService';
      import recordingService from '../../services/api/recordingService';

      const KaraokePlayer = () => {
        const [songs, setSongs] = useState([]);
        const [selectedSong, setSelectedSong] = useState(null);
        const [isPlaying, setIsPlaying] = useState(false);
        const [isRecording, setIsRecording] = useState(false);
        const [currentTime, setCurrentTime] = useState(0);
        const [searchQuery, setSearchQuery] = useState("");
        const [currentLyricIndex, setCurrentLyricIndex] = useState(0);
        const [recordingDuration, setRecordingDuration] = useState(0);
        const [volume, setVolume] = useState(75);
        const [loading, setLoading] = useState(false);
        const [error, setError] = useState(null); // Not used in UI but kept for consistency

        const recordingTimer = useRef(null);
        const playbackTimer = useRef(null);

        useEffect(() => {
          const loadSongs = async () => {
            setLoading(true);
            try {
              const result = await songService.getAll();
              setSongs(result || []);
              if (result && result.length > 0) {
                setSelectedSong(result[0]);
              }
            } catch (err) {
              setError(err.message);
              toast.error("Failed to load songs");
            } finally {
              setLoading(false);
            }
          };
          loadSongs();
        }, []);

        useEffect(() => {
          if (isPlaying && selectedSong) {
            playbackTimer.current = setInterval(() => {
              setCurrentTime(prev => {
                const newTime = prev + 1;
                if (newTime >= selectedSong.duration) {
                  setIsPlaying(false);
                  setCurrentTime(0);
                  setCurrentLyricIndex(0);
                  return 0;
                }

                // Update current lyric index based on time
                if (selectedSong.lyrics) {
                  const lyricIndex = selectedSong.lyrics.findIndex(lyric =>
                    newTime >= lyric.startTime && newTime <= lyric.endTime
                  );
                  if (lyricIndex !== -1) {
                    setCurrentLyricIndex(lyricIndex);
                  }
                }

                return newTime;
              });
            }, 1000);
          } else {
            clearInterval(playbackTimer.current);
          }

          return () => clearInterval(playbackTimer.current);
        }, [isPlaying, selectedSong]);

        useEffect(() => {
          if (isRecording) {
            recordingTimer.current = setInterval(() => {
              setRecordingDuration(prev => prev + 1);
            }, 1000);
          } else {
            clearInterval(recordingTimer.current);
          }

          return () => clearInterval(recordingTimer.current);
        }, [isRecording]);

        const handlePlayPause = () => {
          if (!selectedSong) {
            toast.warning("Please select a song first");
            return;
          }
          setIsPlaying(!isPlaying);
        };

        const handleRecordToggle = async () => {
          if (!selectedSong) {
            toast.warning("Please select a song first");
            return;
          }

          if (isRecording) {
            // Stop recording
            setIsRecording(false);
            setRecordingDuration(0);

            try {
              const newRecording = {
                songId: selectedSong.id,
                timestamp: new Date().toISOString(),
                duration: recordingDuration,
                audioBlob: null, // In a real app, this would be the actual audio blob
                score: Math.floor(Math.random() * 40) + 60, // Random score between 60-100
                effects: []
              };

              await recordingService.create(newRecording);
              toast.success("Recording saved successfully!");
            } catch (err) {
              toast.error("Failed to save recording");
            }
          } else {
            // Start recording
            setIsRecording(true);
            setRecordingDuration(0);
            if (!isPlaying) {
              setIsPlaying(true);
            }
            toast.success("Recording started!");
          }
        };

        const handleSongSelect = (song) => {
          setSelectedSong(song);
          setIsPlaying(false);
          setCurrentTime(0);
          setCurrentLyricIndex(0);
          setSearchQuery("");
        };

        const handleSeek = (newTime) => {
          setCurrentTime(newTime);
          if (selectedSong?.lyrics) {
            const lyricIndex = selectedSong.lyrics.findIndex(lyric =>
              newTime >= lyric.startTime && newTime <= lyric.endTime
            );
            if (lyricIndex !== -1) {
              setCurrentLyricIndex(lyricIndex);
            }
          }
        };

        const filteredSongs = songs.filter(song =>
          song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          song.artist.toLowerCase().includes(searchQuery.toLowerCase())
        );

        const formatTime = (seconds) => {
          const mins = Math.floor(seconds / 60);
          const secs = seconds % 60;
          return `${mins}:${secs.toString().padStart(2, '0')}`;
        };

        const defaultAlbumArt = `https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop`;


        if (loading) {
          return (
            <div className="flex items-center justify-center py-20">
              <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
          );
        }

        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-900/50 backdrop-blur-md rounded-2xl border border-gray-700 overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-700 bg-gradient-to-r from-primary/10 to-secondary/10">
              <Text as="h2" className="text-2xl md:text-3xl font-heading font-bold text-center mb-6">
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Karaoke Studio
                </span>
              </Text>

              {/* Song Search */}
              <div className="max-w-md mx-auto">
                <Input
                  iconName="Search"
                  iconClassName="w-5 h-5 text-gray-400"
                  type="text"
                  placeholder="Search for songs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
              {/* Song Library */}
              <div className="lg:col-span-1">
                <Text as="h3" className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <ApperIcon name="Music" className="w-5 h-5 text-primary" />
                  Song Library
                </Text>
                <div className="space-y-2 max-h-96 overflow-y-auto scrollbar-hide">
                  {filteredSongs.map((song) => (
                    <SongListItem
                      key={song.id}
                      song={song}
                      isSelected={selectedSong?.id === song.id}
                      onClick={handleSongSelect}
                      formatTime={formatTime}
                    />
                  ))}
                </div>
              </div>

              {/* Main Player */}
              <div className="lg:col-span-2">
                {selectedSong ? (
                  <div className="space-y-6">
                    {/* Current Song Info */}
                    <div className="text-center">
                      <Image
                        src={selectedSong.albumArt || defaultAlbumArt}
                        alt={selectedSong.title}
                        className="w-32 h-32 md:w-40 md:h-40 mx-auto rounded-xl shadow-soft mb-4"
                      />
                      <Text as="h3" className="text-xl md:text-2xl font-bold text-white mb-2">{selectedSong.title}</Text>
                      <Text className="text-gray-400 mb-2">{selectedSong.artist}</Text>
                      <Text className="inline-block px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-300">
                        {selectedSong.genre}
                      </Text>
                    </div>

                    {/* Progress Bar */}
                    <ProgressBar
                      currentTime={currentTime}
                      duration={selectedSong.duration}
                      onSeek={handleSeek}
                      formatTime={formatTime}
                    />

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
                                <Text className="text-2xl md:text-3xl font-bold text-white glow-text">
                                  {selectedSong.lyrics[currentLyricIndex].text}
                                </Text>
                              )}
                              {selectedSong.lyrics[currentLyricIndex + 1] && (
                                <Text className="text-lg text-gray-400">
                                  {selectedSong.lyrics[currentLyricIndex + 1].text}
                                </Text>
                              )}
                            </motion.div>
                          </AnimatePresence>
                        </div>
                      ) : (
                        <div className="text-center text-gray-400">
                          <ApperIcon name="Music" className="w-16 h-16 mx-auto mb-4 opacity-50" />
                          <Text>Lyrics will appear here during playback</Text>
                        </div>
                      )}
                    </div>

                    {/* Controls */}
                    <PlayerControls
                      isPlaying={isPlaying}
                      onPlayPause={handlePlayPause}
                      isRecording={isRecording}
                      onRecordToggle={handleRecordToggle}
                      recordingDuration={recordingDuration}
                      volume={volume}
                      onVolumeChange={(e) => setVolume(e.target.value)}
                      formatTime={formatTime}
                    />
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <ApperIcon name="Music" className="w-20 h-20 mx-auto mb-6 text-gray-600" />
                    <Text as="h3" className="text-xl font-semibold text-gray-400 mb-2">No Song Selected</Text>
                    <Text className="text-gray-500">Choose a song from the library to start singing</Text>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        );
      };

      export default KaraokePlayer;