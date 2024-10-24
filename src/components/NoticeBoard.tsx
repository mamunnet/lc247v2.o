import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { format } from 'date-fns';
import { Notice } from '../types';
import 'swiper/css';

interface NoticeBoardProps {
  notices: Notice[];
}

const NoticeBoard: React.FC<NoticeBoardProps> = ({ notices }) => {
  const formatDisplayDate = (timestamp: number) => {
    try {
      return format(new Date(timestamp), 'MMM dd, yyyy');
    } catch {
      return format(new Date(), 'MMM dd, yyyy');
    }
  };

  if (notices.length === 0) return null;

  return (
    <div className="bg-gradient-to-r from-red-500/10 via-red-500/5 to-red-500/10 backdrop-blur-sm border-y border-red-500/20 py-2">
      <div className="container mx-auto px-4">
        <div className="flex items-center">
          <div className="flex-shrink-0 bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-lg mr-4 shadow-lg shadow-red-500/20">
            <span className="text-sm font-medium">নোটিশ</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <Swiper
              modules={[Autoplay]}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              loop={true}
              slidesPerView={1}
              direction="horizontal"
              className="w-full"
            >
              {notices.map((notice) => (
                <SwiperSlide key={notice.id}>
                  <div className="flex items-center text-white">
                    <span className={`inline-block w-1.5 h-1.5 rounded-full mr-2 ${
                      notice.priority === 'high' ? 'bg-red-500' :
                      notice.priority === 'medium' ? 'bg-yellow-500' :
                      'bg-blue-500'
                    }`}></span>
                    <span className="text-sm font-medium">{notice.title}:</span>
                    <span className="text-sm text-gray-300 ml-2">{notice.content}</span>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoticeBoard;