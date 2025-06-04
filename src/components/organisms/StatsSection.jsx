import React from 'react';
      import StatCard from '../atoms/StatCard';

      const StatsSection = ({ songsCount, recordingsCount }) => {
        const statsData = [
          { icon: "Music", label: "Songs Available", value: songsCount?.toLocaleString() || "0" },
          { icon: "Users", label: "Active Singers", value: "50K+" },
          { icon: "Mic", label: "Recordings Made", value: recordingsCount?.toLocaleString() || "0" },
          { icon: "Share2", label: "Shares Today", value: "1.2K+" }
        ];

        return (
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {statsData.map((stat, index) => (
                  <StatCard
                    key={stat.label}
                    iconName={stat.icon}
                    label={stat.label}
                    value={stat.value}
                    delay={index * 0.1}
                  />
                ))}
              </div>
            </div>
          </section>
        );
      };

      export default StatsSection;