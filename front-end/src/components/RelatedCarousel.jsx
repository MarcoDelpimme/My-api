import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "../styles/GamePage.css";
import { Mousewheel, Pagination } from "swiper/modules";

export const RelatedCarousel = ({ items, currentGameId }) => {
  const filteredItems = items.filter((item) => item.id !== currentGameId);

  return (
    <Swiper
      direction={"vertical"}
      slidesPerView={1}
      spaceBetween={30}
      mousewheel={true}
      pagination={{ clickable: true }}
      modules={[Mousewheel, Pagination]}
      className="mySwiper"
    >
      {filteredItems.map((item) => (
        <SwiperSlide key={item.id}>
          <div className="swiper-slide-content">
            <img
              src={item.game_img_large}
              alt={item.title}
              style={{ objectFit: "cover", width: "100%", height: "100%" }}
            />
            <div className="content">
              <h2>
                {item.title}{" "}
                <button className="button-carousel" onClick={() => (window.location.href = `/games/${item.id}`)}>
                  <i className="bi bi-arrow-right"></i>
                </button>
              </h2>
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
