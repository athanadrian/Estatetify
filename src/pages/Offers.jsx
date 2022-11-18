import { ListingItemList, Loader, PageHeader } from 'components';
import React from 'react';
import { useEffect } from 'react';
import { useListingContext } from 'store/contexts';

const Offers = () => {
  const {
    getOfferListings,
    lastVisibleOfferListing,
    getMoreOfferListings,
    offerListings,
    isLoading,
  } = useListingContext();

  useEffect(() => {
    getOfferListings(4);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className='mx-auto xl:mx-20 px-3'>
        <PageHeader title='Our recent offers' />
        {isLoading ? (
          <Loader />
        ) : offerListings && offerListings.length > 0 ? (
          <>
            <main>
              <ListingItemList listings={offerListings} />
            </main>
            {lastVisibleOfferListing ? (
              <div className='flex justify-center items-center'>
                <button
                  onClick={() => getMoreOfferListings(4)}
                  className='bg-white px-3 py-1.5 text-gray-700 border border-gray-300 mb-6 mt-6 hover:border-slate-600 rounded transition duration-150 ease-in-out'
                >
                  Load more
                </button>
              </div>
            ) : (
              <PageHeader title='There are no more offers' />
            )}
          </>
        ) : (
          <PageHeader title='There are no more offers' />
        )}
      </div>
    </>
  );
};

export default Offers;
