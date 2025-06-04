import React from 'react';
      import HeroSection from '../organisms/HeroSection';
      import PlayerLayout from '../organisms/PlayerLayout';
      import FeaturedSongsSection from '../organisms/FeaturedSongsSection';
      import RecentRecordingsSection from '../organisms/RecentRecordingsSection';
      import StatsSection from '../organisms/StatsSection';

      const HomePageTemplate = ({
        songs,
        recordings,
        loadingSongs,
        loadingRecordings,
      }) => {
        const featuredSongs = songs?.slice(0, 6) || [];
        const recentRecordings = recordings?.slice(0, 3) || [];

        return (
          <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
            <HeroSection />
            <PlayerLayout />
            <FeaturedSongsSection songs={featuredSongs} loading={loadingSongs} />
            <RecentRecordingsSection recordings={recentRecordings} songs={songs} />
            <StatsSection songsCount={songs.length} recordingsCount={recordings.length} />
          </div>
        );
      };

      export default HomePageTemplate;