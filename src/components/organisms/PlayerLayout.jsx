import React from 'react';
      import KaraokePlayer from './KaraokePlayer';

      const PlayerLayout = () => {
        return (
          <section className="py-16 bg-black/40">
            <div className="container mx-auto px-4">
              <KaraokePlayer />
            </div>
          </section>
        );
      };

      export default PlayerLayout;