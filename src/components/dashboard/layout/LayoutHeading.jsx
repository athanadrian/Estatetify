import React from 'react';
import { AppIcon } from 'components';
import defaultStyles from 'common/config';
import { useProfileContext } from 'store/contexts';

const LayoutHeading = ({ icon, title, quantity, className }) => {
  const { myProfile } = useProfileContext();
  return (
    <h2
      className={`flex items-center text-darker text-3xl font-light ${className}`}
    >
      {icon && (
        <AppIcon
          nav
          Icon={defaultStyles.icons[icon]}
          className={`mr-2 text-${myProfile?.role}-500`}
        />
      )}
      <span className={`text-${myProfile?.role}-500`}>{title}</span>{' '}
      {quantity !== undefined && quantity > 0 ? `: ${quantity}` : null}
    </h2>
  );
};

export default LayoutHeading;
