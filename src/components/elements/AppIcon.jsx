import React from 'react';

import defaultStyles from 'common/config';

const AppIcon = ({
  Icon = defaultStyles.icons.default,
  color,
  iconColor,
  size,
  link,
  tooltip,
  onClick,
  nav,
  badge,
  className,
  label,
  text,
  textColor,
  ...otherProps
}) => {
  return (
    <>
      {nav ? (
        <span
          title={tooltip}
          onClick={onClick}
          className={`${link ? 'cursor-pointer' : ''} ${className}`}
        >
          <Icon style={{ color: iconColor }} {...otherProps} />
        </span>
      ) : (
        <div
          title={tooltip}
          onClick={onClick}
          className={`text-center ${link ? 'cursor-pointer' : ''} ${className}`}
        >
          <Icon
            stroke={iconColor}
            {...otherProps}
            style={{ color: iconColor, fontSize: size }}
          />
          {text && (
            <span style={{ color: textColor }} className='ml-1'>
              {text}
            </span>
          )}
        </div>
      )}
    </>
  );
};

export default AppIcon;
