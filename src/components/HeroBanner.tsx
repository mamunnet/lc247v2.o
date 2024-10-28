import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';

const slides = [
  {
    image: 'https://lc247.club/exchange/assets/images/home/netent.webp'
  },
  {
    image: 'https://lc247.club/exchange/assets/images/home/sportbook.webp'
  },
  {
    image: 'https://lc247.club/exchange/assets/images/home/banner_sports.webp'
  }
];

const HeroBanner = () => {
  return (
    <div className="w-full bg-gray-900">
      <div className="relative h-[150px] md:h-[200px] lg:h-[250px] w-full overflow-hidden">
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
                  className="absolute inset-0"
                  style={{ 
                    backgroundImage: `url(${slide.image})`,
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '100% 100%', // Forces image to fit exactly
                    imageRendering: 'auto',
                    width: '100%',
                    height: '100%'
                  }}
                >
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/50 to-gray-900/80"></div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom Navigation Styles */}
        <style>{`
          .swiper-button-next,
          .swiper-button-prev {
            color: #fff;
            background: rgba(0, 0, 0, 0.3);
            width: 30px;
            height: 30px;
            border-radius: 50%;
            backdrop-filter: blur(4px);
            transition: all 0.3s ease;
          }

          .swiper-button-next:hover,
          .swiper-button-prev:hover {
            background: rgba(0, 0, 0, 0.5);
          }

          .swiper-button-next:after,
          .swiper-button-prev:after {
            font-size: 14px;
          }

          .swiper-button-next {
            right: 10px;
          }

          .swiper-button-prev {
            left: 10px;
          }
        `}</style>
      </div>
    </div>
  );
};

export default HeroBanner;
