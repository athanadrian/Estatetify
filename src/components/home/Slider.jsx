import React, { useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {
  EffectFade,
  Navigation,
  Pagination,
  Autoplay,
} from 'swiper';
import { Filter, Loader, PageHeader } from 'components';
import { useListingContext } from 'store/contexts';
import 'swiper/css/bundle';
import { useNavigate } from 'react-router';
import { displayPrice } from 'common/helpers';

const Slider = () => {
  const navigate = useNavigate();
  const { listings, getAllListings, isLoading } = useListingContext();
  SwiperCore.use([Autoplay, Pagination, Navigation]);
  const offerStyle =
    'text-light text-base  font-semibold line-through decoration-darker';
  const regularStyle = 'text-light text-base font-semibold';

  useEffect(() => {
    getAllListings(5);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <Loader />;

  if (listings.length === 0)
    return (
      <>
        <PageHeader title='Sorry no listings found!' />
      </>
    );
  return (
    listings.length > 0 && (
      <>
        <Swiper
          slidesPerView={1}
          navigation
          pagination={{ type: 'progressbar' }}
          effect='fade'
          modules={[EffectFade]}
          autoplay={{ delay: 3000 }}
        >
          {listings.map(({ id, data }) => (
            <SwiperSlide
              onClick={() => navigate(`/listings/${data?.type}/${id}`)}
              key={id}
            >
              <div
                style={{
                  background: `url(${data?.imgUrls[0]}) center no-repeat`,
                  backgroundSize: 'cover',
                }}
                className='relative w-full h-[300px] overflow-hidden'
              />
              <p className='absolute text-white bg-darker px-4 py-2 text-base rounded-br-2xl top-3 left-2'>
                {data?.title}
              </p>
              <div className='flex justify-center max-w-[90%] absolute text-white bg-red-500 px-4 py-2 text-base rounded-tr-3xl top-16 left-2'>
                <p className={`${data.offer ? offerStyle : regularStyle}`}>
                  €{displayPrice(data.regularPrice)}
                </p>
                {data.offer && (
                  <p className={`text-light text-base mx-2 font-semibold`}>
                    €{displayPrice(data.offerPrice)}
                  </p>
                )}
                <span className='text-light text-base font-semibold'>
                  {data.type === 'rent' && ' / month'}
                </span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <Filter />
      </>
    )
  );
};

export default Slider;
