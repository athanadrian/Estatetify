import { ListingsList, PageHeader } from 'components';
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
              <PageHeader
                title='Your Search Results'
                view
                total={filteredListings.length}
              />
              <GoBack />
            </div>
            <main>
              <ListingsList listings={filteredListings} />
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
  <button className='bg-gray-200 text-darker text-lg font-normal py-1.5 px-2 my-1 mr-1.5 ml-0 border-[1px] border-solid border-transparent rounded-[3px] cursor-pointer flex items-center justify-center transition-all duration-300 ease-in-out'>
    <Link to='/home'>&larr; Back To Home</Link>
  </button>
);
