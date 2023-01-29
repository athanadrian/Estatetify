import {
  Layout,
  LayoutHeading,
  ListingsTable,
  Loader,
  Pagination,
} from 'components';
import React, { useEffect, useState } from 'react';
import { useListingContext } from 'store/contexts';

const Listings = () => {
  const { getMyListings, isLoading, listings } = useListingContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [
    itemsPerPage,
    //TODO  i will use it if i want to change shown items
    //setItemsPerPage,
  ] = useState(5);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = listings.slice(indexOfFirstItem, indexOfLastItem);

  const totalItems = listings.length;

  const paginationData = {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    //TODO  i will use it if i want to change shown items
    //setItemsPerPage,
    totalItems,
  };
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
          <ListingsTable listings={currentItems} />
        </div>
      </div>
      <Pagination {...paginationData} />
    </Layout>
  );
};

export default Listings;
