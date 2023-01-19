import moment from 'moment';

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

// remove (+) or (00) sign from mobile to use it in social contact apps
export const normalizeMobile = (mobile) => {
  if (
    !mobile ||
    typeof mobile !== 'string' ||
    mobile === undefined ||
    mobile === ' '
  ) {
    return '';
  }

  if (mobile.charAt(0) === '+') return mobile.substring(1);
  if (mobile.slice(0, 2) === '00') return mobile.substring(2);
};

// format date
export const formatDate = (date, dateFormat = 'DD-MM-YYYY') => {
  if (!date || typeof date !== 'string') {
    return '';
  }
  return moment(date).format(dateFormat);
};

export const getDatesLeft = (toDate, fromDate) => {
  let start = moment(fromDate);
  let end = moment(toDate);
  let current = moment().startOf('day');

  //Difference in number of days
  const elapsedDays = moment.duration(current.diff(start)).asDays();
  const remainingDays = moment.duration(end.diff(current)).asDays();
  return {
    elapsedDays,
    remainingDays,
  };
};
