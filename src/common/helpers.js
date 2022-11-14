// get substring between 2 specific characters
export const getFirebaseErrorMessage = (str) => {
  if (str !== '' || undefined) {
    return str.substring(str.indexOf('(') + 1, str.lastIndexOf(')'));
  }
};

export const getFirestoreImage = (str) => {
  if (str !== '' || undefined) {
    return str.substring(str.indexOf('/o/') + 3, str.lastIndexOf('?'));
  }
};

// return the properties of lookup-data object
export const mapEnumObject = (label, enumList) => {
  let obj = {};
  for (let enumItem of enumList) {
    if (label === enumItem.enum) {
      obj = enumItem;
    }
  }
  return obj;
};

// display money value
export const displayPrice = (value) => {
  if (value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); //+ '.00';
  }
  return 0;
};

// Get city and state from leaflet geoData
// 'locality' for city
// 'administrative' for state
// 'country' for country
export const getGeoData = (property, leafletData) => {
  const geoData = leafletData.find((item) => {
    if (item.types.find((str) => str.includes(property))) {
      return item;
    }
    return '';
  });
  return geoData.long_name;
};
