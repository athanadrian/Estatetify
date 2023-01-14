import React, { useEffect } from 'react';
import { PageHeader, Slider } from 'components';
import { ListingsList } from 'components';
import { useListingContext } from 'store/contexts';

const Home = () => {
  const {
    getHomeData,
    offerListings,
    rentListings,
    saleListings,
    clearFilteredListings,
    totalListings,
  } = useListingContext();

  useEffect(() => {
    clearFilteredListings();
    getHomeData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Slider />
      <div className='px-5 w-full'>
        <div className='flex flex-col mx-5 my-10 space-y-6'>
          <div className='flex flex-col items-center justify-center mb-10'>
            <PageHeader title='Discover Our Featured Properties' />
            <PageHeader
              view
              total={totalListings}
              subtitle='Discover best deals for your future house'
            />
          </div>
        </div>
        <ListingsList
          link='/offers'
          title='Recent offers'
          subtitle='Show more offers'
          listings={offerListings}
        />
        <ListingsList
          link='/listings/rent'
          title='Places for rent'
          subtitle='Show more places for rent'
          listings={rentListings}
        />
        <ListingsList
          link='/listings/sale'
          title='Places for sale'
          subtitle='Show more places for sale'
          listings={saleListings}
        />
      </div>
    </>
  );
};

export default Home;
