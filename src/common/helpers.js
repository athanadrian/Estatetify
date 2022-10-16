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
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); //+ '.00';
};
