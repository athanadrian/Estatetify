import React from 'react';
import AppIcon from './elements/AppIcon';
import defaultStyles from 'common/config';
import { useListingContext } from 'store/contexts';

const FavoriteButton = ({ listing, id }) => {
  const { userFavorites, addRemoveFavorite } = useListingContext();
  const favoriteExists =
    userFavorites.filter((fav) => fav.id === id).length > 0;

  const handleAddToFavorite = () => {
    addRemoveFavorite({ listing: { id, data: listing }, favorite: true });
  };

  const handleRemoveFromFavorite = () => {
    addRemoveFavorite({ listing: { id, data: listing }, favorite: false });
  };

  return (
    <AppIcon
      Icon={defaultStyles.icons.favorite}
      className={`absolute bottom-4 right-7 h-4 cursor-pointer ${
        favoriteExists ? 'text-red-500' : 'text-dark'
      } `}
      onClick={favoriteExists ? handleRemoveFromFavorite : handleAddToFavorite}
    />
  );
};

export default FavoriteButton;
