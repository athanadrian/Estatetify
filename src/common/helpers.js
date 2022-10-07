// get substring between 2 specific characters
export const getFirebaseErrorMessage = (str) => {
  if (str !== '' || undefined) {
    return str.substring(str.indexOf('(') + 1, str.lastIndexOf(')'));
  }
};
