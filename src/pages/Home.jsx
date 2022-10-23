import React, { useEffect } from 'react';
import { useListingContext } from 'store/contexts';

const Home = () => {
  const { getAllListings, listings } = useListingContext();

  useEffect(() => {
    getAllListings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log('all listings', listings);
  return <div>Home</div>;
};

export default Home;
