import { ListingItemList, PageHeader } from 'components';
import React from 'react';
import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useListingContext } from 'store/contexts';

const SearchResults = () => {
  const { filteredListings, getFilteredListings } = useListingContext();
  const location = useLocation();

  useEffect(() => {
    getFilteredListings(location?.state?.filters, undefined);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className='mx-auto xl:mx-20 px-3'>
        {filteredListings.length > 0 ? (
          <>
            <div className='flex flex-col items-center justify-center mb-10'>
              <PageHeader title='Your Search Results' />
              <PageHeader
                className='mt-0'
                title={`Found ${
                  filteredListings.length > 1
                    ? `${filteredListings.length} listings`
                    : '1 listing'
                }`}
              />
              <GoBack />
            </div>
            <main>
              <ListingItemList listings={filteredListings} />
            </main>
          </>
        ) : (
          <div className='flex flex-col items-center justify-center mb-10'>
            <PageHeader title='There are no listings found' />
            <GoBack />
          </div>
        )}
      </div>
    </>
  );
};

export default SearchResults;

const GoBack = () => (
  <h2 className='text-gray-400 text-base font-medium'>
    Go back to
    <Link to='/home' className='text-lg text-primary hover:underline ml-2'>
      home page...
    </Link>
  </h2>
);
