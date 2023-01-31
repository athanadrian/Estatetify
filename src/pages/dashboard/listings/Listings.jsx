import {
  Layout,
  LayoutHeading,
  ListingsTable,
  Loader,
  Pagination,
  Search,
} from 'components';
import React, { useEffect, useState } from 'react';
import { useCommonContext, useListingContext } from 'store/contexts';

const Listings = () => {
  const { getMyListings, isLoading, listings } = useListingContext();
  const { getItemsBySearch, filteredItems } = useCommonContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState('');
  const [
    itemsPerPage,
    //TODO  i will use it if i want to change shown items
    //setItemsPerPage,
  ] = useState(5);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const totalItems = filteredItems.length;

  const paginationData = {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    //TODO  i will use it if i want to change shown items
    //setItemsPerPage,
    totalItems,
  };
  const handleChange = (e) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    getMyListings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getItemsBySearch({ items: listings, search });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listings, search]);

  if (isLoading) return <Loader />;

  return (
    <Layout>
      <LayoutHeading icon='listings' title='Listings' className='mb-2' />
      <p className='ml-10 sm:ml-0 my-1 text-lg text-dark tracking-wide'>
        <span className='font-bold'>{filteredItems.length}</span> listings found
      </p>
      <Search value={search} onChange={handleChange} />
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
