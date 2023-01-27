import { Layout, LayoutHeading, ListingsTable, Loader } from 'components';
import React, { useEffect } from 'react';
import { useListingContext } from 'store/contexts';

const Listings = () => {
  const { getMyListings, isLoading, listings } = useListingContext();
  useEffect(() => {
    getMyListings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) return <Loader />;

  return (
    <Layout>
      <LayoutHeading
        icon='listings'
        quantity={listings.length}
        title='Listings'
        className='mb-2'
      />
      <div className='-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto'>
        <div className='inline-block min-w-full shadow-md rounded-lg overflow-hidden'>
          <ListingsTable listings={listings} />
        </div>
      </div>
    </Layout>
  );
};

export default Listings;
