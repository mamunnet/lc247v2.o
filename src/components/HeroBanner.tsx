import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

const slides = [
  {
    image: 'https://img.freepik.com/free-vector/gambling-ace-card-poker-banner-with-text-space_1017-54108.jpg'
  },
  {
    image: 'https://www.lc247.live/assets/images/mobile/promo/lc247/kv-all-live-games.webp'
  },
  {
    image: 'https://www.lc247.live/assets/images/mobile/promo/lc247/kv-all-andarbahar.webp'
  }
];

const HeroBanner = () => {
  return (
    <div className="container mx-auto px-4">
      <div className="relative h-[200px] md:h-[250px] lg:h-[300px] max-w-5xl mx-auto overflow-hidden rounded-xl shadow-[0_0_15px_rgba(101,237,191,0.3)] border border-emerald-500/20">
        <Swiper
          modules={[Autoplay, EffectFade, Navigation]}
          effect="fade"
          navigation
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="h-full w-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>
              <div className="relative h-full w-full">
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${slide.image})` }}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Styles for Swiper Navigation */}
        <style>{`
          .swiper-button-next,
          .swiper-button-prev {
            color: #fff;
            background: rgba(0, 0, 0, 0.3);
            width: 40px;
            height: 40px;
            border-radius: 50%;
            backdrop-filter: blur(4px);
          }

          .swiper-button-next:after,
          .swiper-button-prev:after {
            font-size: 16px;
          }
        `}</style>
      </div>
    </div>
  );
};

export default HeroBanner;
