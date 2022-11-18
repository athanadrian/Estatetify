import { ListingItemList, PageHeader } from 'components';
import React from 'react';
import { Link } from 'react-router-dom';
import { useListingContext } from 'store/contexts';

const Favorites = () => {
  const { userFavorites, removeAllFavorites } = useListingContext();

  return (
    <>
      <div className='mx-auto xl:mx-20 px-3'>
        {userFavorites.length > 0 ? (
          <>
            <div className='flex flex-col items-center justify-center mb-10'>
              <PageHeader title='Check out your Favorites' />
              <h2
                onClick={removeAllFavorites}
                className='text-lg text-primary hover:underline cursor-pointer'
              >
                Clear all favorites
              </h2>
            </div>
            <main>
              <ListingItemList listings={userFavorites} />
            </main>
          </>
        ) : (
          <div className='flex flex-col items-center justify-center mb-10'>
            <PageHeader title="You don't have any favorites" />
            <h2 className='text-gray-400 text-base font-medium'>
              Check out newest
              <Link
                to='/offers'
                className='text-lg text-primary hover:underline ml-2'
              >
                offers...
              </Link>
            </h2>
          </div>
        )}
      </div>
    </>
  );
};

export default Favorites;
