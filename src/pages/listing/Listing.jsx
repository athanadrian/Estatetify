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
import { AppButton, AppIcon, ContactModal, Loader } from 'components';
import { useCommonContext, useListingContext } from 'store/contexts';
import { displayPrice, mapEnumObject } from 'common/helpers';
import { floors } from 'common/lookup-data';
import { useAuth } from 'hooks/useAuth';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';

const Listing = () => {
  const { listingId } = useParams();
  const { user } = useAuth();
  const { openModal } = useCommonContext();
  const { getListing, listing, isLoading } = useListingContext();
  const [linkCopied, setLinkCopied] = useState(false);

  const showFloor =
    listing?.category === 'condo' ||
    listing?.category === 'office' ||
    listing?.category === 'apartment';

  const floorObj = mapEnumObject(listing?.floor, floors);

  SwiperCore.use([Autoplay, Navigation, Pagination]);
  const offerStyle =
    'text-[#457b9d] text-2xl  font-semibold line-through decoration-red-500';
  const regularStyle = 'text-[#457b9d] text-2xl font-semibold';

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setLinkCopied(true);
    setTimeout(() => {
      setLinkCopied(false);
    }, 2000);
  };

  useEffect(() => {
    getListing(listingId);
    //eslint-disable-next-line react-hooks/exhaustive-deps
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
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <>
        {linkCopied ? (
          <p className='fixed top-[10%] opacity-60 right-[3%] font-semibold border-2 border-gray-400 rounded-xl text-white bg-dark z-10 px-2 py-1'>
            Link Copied
          </p>
        ) : (
          <div
            title='Copy Link'
            className='cursor-pointer flex justify-center fixed top-[10%] opacity-60 right-[3%] z-10 items-center border-2 border-gray-400 bg-dark w-12 h-12 rounded-full'
            onClick={handleCopyLink}
          >
            <AppIcon
              className='text-white text-xl'
              Icon={defaultStyles.icons.social}
            />
          </div>
        )}
      </>
      <div className='flex flex-col md:flex-row max-w-6xl lg:mx-auto rounded p-4 bg-white lg:space-x-5'>
        <div className='w-full '>
          <p className='text-[#457b9d] mx-2 text-2xl mt-2 font-semibold'>
            {listing?.title}
          </p>
          <div className='flex flex-row mx-2 justify-start py-1 items-center  mt-1'>
            <p className={`${listing?.offer ? offerStyle : regularStyle}`}>
              €{displayPrice(listing?.regularPrice)}
            </p>

            {listing?.offer && (
              <p className={`text-[#457b9d] text-2xl mx-2 font-semibold`}>
                €{displayPrice(listing?.offerPrice)}
              </p>
            )}
            <span className='text-[#457b9d] text-2xl font-semibold'>
              {listing?.type === 'rent' && ' / month'}
            </span>
          </div>
          <div className='px-3 py-5'>
            <div className='flex items-center space-x-1 text-lg'>
              <AppIcon
                Icon={defaultStyles.icons.location}
                className=' text-primary'
              />
              <p className='text-gray-400 font-medium'>
                {listing?.geolocation?.address || listing?.address}
              </p>
            </div>
            <div className='flex justify-start items-center space-x-4 w-[75%] mt-3'>
              <p className='capitalize w-full max-w-[200px] text-white bg-darker px-4 py-1 rounded-md text-center shadow-lg font-semibold'>
                {listing?.type === 'rent' ? 'rent' : 'sale'}
              </p>
              {listing?.offer && (
                <p className='mx-2 font-semibold bg-teal-600 w-full max-w-[200px] px-4 py-1 rounded-md text-center shadow-lg text-white'>
                  €{displayPrice(listing?.regularPrice - listing?.offerPrice)}{' '}
                  discount
                </p>
              )}
            </div>
            <p className='my-3'>
              <span className='font-semibold'>Description </span>
              <span>{listing?.description}</span>
            </p>
            <ul className='flex flex-row px-3 py-5 justify-start text-darker space-x-4 border-gray-400 border-t'>
              <li className='flex items-center justify-center font-medium whitespace-nowrap'>
                <AppIcon
                  className='text-xl'
                  Icon={defaultStyles.icons[listing?.category]}
                />
                <p className='capitalize ml-1'>{listing?.category}</p>
              </li>
              <li className='flex items-center justify-center font-medium whitespace-nowrap'>
                <AppIcon Icon={defaultStyles.icons.squareFeet} />
                <p className='ml-1 '>
                  <span className='capitalize'> {listing?.squareFeet} </span>m
                  <sup>2</sup>
                </p>
              </li>
              {showFloor && (
                <li className='flex items-center justify-center font-medium whitespace-nowrap'>
                  <AppIcon Icon={defaultStyles.icons.floors} />
                  <p className='ml-1 capitalize'>{floorObj.code} floor</p>
                </li>
              )}
            </ul>
            <ul className='flex flex-row mt-3 px-3 pb-5 border-gray-400 border-b justify-start space-x-6 text-darker'>
              <li className='flex items-center justify-center font-medium whitespace-nowrap'>
                <AppIcon Icon={defaultStyles.icons.rooms} />
                <p className='ml-1 capitalize'>
                  {listing?.rooms > 1 ? `${listing?.rooms} rooms` : '1 room'}
                </p>
              </li>
              <li className='flex items-center justify-center font-medium'>
                <AppIcon className='text-xl' Icon={defaultStyles.icons.beds} />
                <p className='ml-1 capitalize'>
                  {listing?.beds > 1 ? `${listing?.beds} beds` : '1 bed'}
                </p>
              </li>
              <li className='flex items-center justify-center font-medium whitespace-nowrap'>
                <AppIcon Icon={defaultStyles.icons.bathrooms} />
                <p className='ml-1 capitalize'>
                  {listing?.bathrooms > 1
                    ? `${listing?.bathrooms} baths`
                    : '1 bath'}
                </p>
              </li>
            </ul>
            <ul className='flex flex-row px-3 py-5 border-gray-400 border-b justify-start space-x-4 text-darker'>
              <li className='flex items-center justify-center font-medium whitespace-nowrap'>
                <AppIcon
                  Icon={defaultStyles.icons.furnished}
                  className={`${
                    !listing?.furnished ? 'text-red-500' : 'text-teal-500'
                  }`}
                />
                <p className='ml-1 capitalize'>
                  {!listing?.furnished && <span className='mr-1'>Not</span>}
                  Furnished
                </p>
              </li>
              <li className='flex items-center justify-center font-medium whitespace-nowrap'>
                <AppIcon
                  Icon={defaultStyles.icons.warehouse}
                  className={`${
                    !listing?.parking ? 'text-red-500' : 'text-teal-500'
                  }`}
                />
                <p className='ml-1 capitalize'>
                  {!listing?.parking && <span className='mr-1'>No</span>}
                  Parkin
                </p>
              </li>
            </ul>
          </div>
          {user?.uid !== listing?.userRef && (
            <AppButton
              type='button'
              onClick={openModal}
              label='Contact Owner'
            />
          )}
        </div>
        {listing && (
          <div className='w-full z-10 overflow-x-hidden mobile:h-[400px]'>
            <MapContainer
              center={[listing?.geolocation?.lat, listing?.geolocation?.lng]}
              zoom={13}
              scrollWheelZoom={false}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
              />
              <Marker
                position={[
                  listing?.geolocation?.lat,
                  listing?.geolocation?.lng,
                ]}
              >
                <Popup>
                  <div className='flex items-center justify-center font-medium whitespace-nowrap'>
                    <AppIcon
                      className='text-primary text-2xl mr-2'
                      Icon={defaultStyles.icons[listing?.category]}
                    />
                    <p className='capitalize text-primary font-semibold text-lg'>
                      {listing?.category}
                    </p>
                  </div>
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        )}
      </div>
      <ContactModal listing={listing} />
    </main>
  );
};

export default Listing;
