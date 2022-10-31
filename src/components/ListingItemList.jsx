import React from 'react';
import { useListingContext } from 'store/contexts';
import { useNavigate } from 'react-router';
import ListingItem from './ListingItem';

const ListingItemList = ({ listings }) => {
  const navigate = useNavigate();
  const { deleteListing } = useListingContext();

  const handleEditListing = (id) => {
    navigate(`/listings/edit/${id}`);
  };

  const handleDeleteListing = async (listing) => {
    if (
      window.confirm(
        `Are you sure you want to delete listing ${listing?.data?.title}`
      )
    ) {
      await deleteListing(listing);
    }
  };

  return (
    <>
      <div className='flex justify-center items-center mx-auto'>
        <ul className='sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 w-full mx-auto'>
          {listings.map((listing) => (
            <ListingItem
              key={listing?.id}
              id={listing?.id}
              listing={listing?.data}
              editListing={() => handleEditListing(listing?.id)}
              deleteListing={() => handleDeleteListing(listing)}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default ListingItemList;
