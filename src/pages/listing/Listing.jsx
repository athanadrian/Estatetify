import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  Navigation,
  Pagination,
  Autoplay,
  EffectFade,
} from 'swiper';
import 'swiper/css/bundle';

import defaultStyles from 'common/config';
import { AppIcon, Loader } from 'components';
import { useListingContext } from 'store/contexts';

const Listing = () => {
  const { listingId } = useParams();
  const { getListing, listing, isLoading } = useListingContext();
  const [linkCopied, setLinkCopied] = useState(false);

  SwiperCore.use([Autoplay, Navigation, Pagination]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setLinkCopied(true);
    setTimeout(() => {
      setLinkCopied(false);
    }, 2000);
  };

  useEffect(() => {
    getListing(listingId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listingId]);

  if (isLoading) return <Loader />;

  return (
    <main>
      <Swiper
        slidesPerView={1}
        navigation
        pagination={{ type: 'progressbar' }}
        effect='fade'
        modules={[EffectFade]}
        autoplay={{ delay: 3000 }}
      >
        {listing?.imgUrls.map((img, index) => (
          <SwiperSlide key={index}>
            <div
              className='relative w-full overflow-hidden h-80'
              style={{
                background: `url(${listing?.imgUrls[index]}) center no-repeat`,
                backgroundSize: 'cover',
              }}
            >
              {linkCopied ? (
                <p className='fixed top-[13%] opacity-60 right-[3%] font-semibold border-2 border-gray-400 rounded-md text-white bg-dark z-10 px-2 py-1'>
                  Link Copied
                </p>
              ) : (
                <div
                  title='Copy Link'
                  className='cursor-pointer flex justify-center fixed top-[13%] opacity-60 right-[3%] z-10 items-center border-2 border-gray-400 bg-dark w-14 h-14 rounded-full'
                  onClick={handleCopyLink}
                >
                  <AppIcon
                    className='text-white text-2xl'
                    Icon={defaultStyles.icons.social}
                  />
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </main>
  );
};

export default Listing;
