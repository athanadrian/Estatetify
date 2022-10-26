import { LandView, PageHeader, Slider } from 'components';
import React, { useEffect } from 'react';
import { useListingContext } from 'store/contexts';

const Home = () => {
  const { getAllListings, listings } = useListingContext();

  useEffect(() => {
    getAllListings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log('all listings', listings);
  return (
    <div className=''>
      <Slider />
      {/* <LandView /> */}
      <div className='flex flex-col my-24'>
        <div className='flex flex-col items-center justify-center mb-20'>
          <PageHeader title='Discover Our Featured Properties' />
          <PageHeader subtitle='Discover best deals for your future house' />
        </div>
        {/* <FeaturedProp properties={properties}/>
            <Carousel/> */}
      </div>
    </div>
  );
};

export default Home;
