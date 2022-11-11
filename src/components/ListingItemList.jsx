import React from 'react';
import { useListingContext } from 'store/contexts';
import { useNavigate } from 'react-router';
import ListingItem from './ListingItem';
import { Link } from 'react-router-dom';

const ListingItemList = ({ link, title, subtitle, listings }) => {
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
      {listings && listings.length > 0 && (
        <div className='m-2 mb-6'>
          <h2 className='px-3 text-darker text-2xl mt-10 font-semibold tracking-wider'>
            {title}
          </h2>
          <Link to={link}>
            <p className='px-3 text-sm  text-gray-400 hover:text-gray-600 transition duration-150 ease-in-out'>
              {subtitle}...
            </p>
          </Link>
          <div>
            <ul className='sm:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 w-full'>
              {listings?.map((listing) => (
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
        </div>
      )}
    </>
  );
};

export default ListingItemList;
