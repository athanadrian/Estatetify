import React, { useEffect } from 'react';
import { PageHeader, Slider } from 'components';
import { ListingItemList } from 'components';
import { useListingContext } from 'store/contexts';

const Home = () => {
  const {
    getRentListings,
    getSaleListings,
    getOfferListings,
    offerListings,
    rentListings,
    saleListings,
  } = useListingContext();

  useEffect(() => {
    getOfferListings(4);
    getRentListings(4);
    getSaleListings(4);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Slider />
      <div className='px-5 w-full'>
        <div className='flex flex-col mx-20 my-10 space-y-6'>
          <div className='flex flex-col items-center justify-center mb-10'>
            <PageHeader title='Discover Our Featured Properties' />
            <PageHeader subtitle='Discover best deals for your future house' />
          </div>
        </div>
        <ListingItemList
          link='/offers'
          title='Recent offers'
          subtitle='Show more offers'
          listings={offerListings}
        />
        <ListingItemList
          link='/listings/rent'
          title='Places for rent'
          subtitle='Show more places for rent'
          listings={rentListings}
        />
        <ListingItemList
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
