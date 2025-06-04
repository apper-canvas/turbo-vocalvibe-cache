import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center">
            <ApperIcon name="MicOff" className="w-16 h-16 text-primary" />
          </div>
          <h1 className="text-6xl font-heading font-bold text-white mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-gray-300 mb-4">
            Song Not Found
          </h2>
          <p className="text-gray-400 mb-8">
            Looks like this track has gone off-stage. Let's get you back to the main performance!
          </p>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-xl shadow-neon hover:shadow-cyan-glow transition-all duration-300"
          >
            <ApperIcon name="Home" className="w-5 h-5" />
            Back to Stage
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFound