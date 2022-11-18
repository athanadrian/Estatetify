import { ListingItemList, Loader, PageHeader } from 'components';
import React from 'react';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useListingContext } from 'store/contexts';

const Listings = () => {
  const { type } = useParams();
  const {
    getTypeListings,
    typeListings,
    isLoading,
    lastVisibleTypeListing,
    getMoreTypeListings,
  } = useListingContext();

  useEffect(() => {
    getTypeListings(type, 8);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [type]);

  if (isLoading) return <Loader />;
  return (
    <>
      <div className='mx-auto xl:mx-20 px-3'>
        <PageHeader title={`Places for ${type}`} />
        {isLoading ? (
          <Loader />
        ) : typeListings && typeListings.length > 0 ? (
          <>
            <main>
              <ListingItemList listings={typeListings} />
            </main>
            {lastVisibleTypeListing ? (
              <div className='flex justify-center items-center'>
                <button
                  onClick={() => getMoreTypeListings(4)}
                  className='bg-white px-3 py-1.5 text-gray-700 border border-gray-300 mb-6 mt-6 hover:border-slate-600 rounded transition duration-150 ease-in-out'
                >
                  Load more
                </button>
              </div>
            ) : (
              <PageHeader title={`There are no more places for ${type}`} />
            )}
          </>
        ) : (
          <PageHeader title={`There are no current places for ${type}`} />
        )}
      </div>
    </>
  );
};

export default Listings;
