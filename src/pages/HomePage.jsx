import React, { useState, useEffect } from 'react';
      import HomePageTemplate from '../components/templates/HomePageTemplate';
      import songService from '../services/api/songService';
      import recordingService from '../services/api/recordingService';

      const HomePage = () => {
        const [songs, setSongs] = useState([]);
        const [recordings, setRecordings] = useState([]);
        const [loadingSongs, setLoadingSongs] = useState(false);
        const [loadingRecordings, setLoadingRecordings] = useState(false);
        const [error, setError] = useState(null); // Not used in UI but kept for consistency

        useEffect(() => {
          const loadData = async () => {
            setLoadingSongs(true);
            setLoadingRecordings(true);
            try {
              const [songsResult, recordingsResult] = await Promise.all([
                songService.getAll(),
                recordingService.getAll()
              ]);
              setSongs(songsResult || []);
              setRecordings(recordingsResult || []);
            } catch (err) {
              setError(err.message);
            } finally {
              setLoadingSongs(false);
              setLoadingRecordings(false);
            }
          };
          loadData();
        }, []);

        return (
          <HomePageTemplate
            songs={songs}
            recordings={recordings}
            loadingSongs={loadingSongs}
            loadingRecordings={loadingRecordings}
          />
        );
      };

      export default HomePage;