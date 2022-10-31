import { LandView, Loader, PageHeader, Slider } from 'components';
import { ListingItemList } from 'components';
import { useAuth } from 'hooks/useAuth';
import React, { useEffect } from 'react';
import { useListingContext } from 'store/contexts';

const Home = () => {
  const { getAllListings, listings, isLoading } = useListingContext();
  const { user } = useAuth();

  // useEffect(() => {
  //   const query = ['offer', '==', true];
  //   const limit = 4;
  //   getAllListings(query, limit);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  console.log('all listings', listings);
  console.log('user home', user);
  //

  return (
    <div className=''>
      <Slider />
      {/* <LandView /> */}
      <div className='flex flex-col my-24'>
        <div className='flex flex-col items-center justify-center mb-20'>
          <PageHeader title='Discover Our Featured Properties' />
          <PageHeader subtitle='Discover best deals for your future house' />
        </div>
        <ListingItemList listings={listings} />
      </div>
    </div>
  );
};

export default Home;
