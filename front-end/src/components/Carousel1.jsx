import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export const Carousel1 = ({ games }) => {
  const [recentGames, setRecentGames] = useState([]);

  useEffect(() => {
    if (games.length) {
      const sortedGames = [...games].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setRecentGames(sortedGames.slice(0, 5));
    }
  }, [games]);

  return (
    <section className="page carousel-1-page">
      <Swiper
        id="swiperHome"
        grabCursor
        centeredSlides
        slidesPerView={2}
        effect="coverflow"
        loop
        pagination={{ clickable: true }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 3,
          slideShadows: true,
        }}
        modules={[Pagination, EffectCoverflow]}
      >
        {recentGames.map((game) => (
          <SwiperSlide
            id="swiperHomeSlide"
            key={game.id}
            style={{
              backgroundImage: `url(${game.game_img})`,
            }}
          >
            <div>
              <div>
                <h2 className="fw-bold">{game.title}</h2>
                <a className="explore" href={`/games/${game.id}`}>
                  explore
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Carousel1;
