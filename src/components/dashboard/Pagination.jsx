import React, { useState } from 'react';

const Pagination = ({
  currentPage,
  setCurrentPage,
  itemsPerPage,
  //TODO  i will use it if i want to change shown items
  // setItemsPerPage,
  totalItems,
}) => {
  const pageNumbers = [];
  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  //Math.ceil(totalItems/)
  const movePrev = () => {
    setCurrentPage(currentPage - 1);
    // Show prev set of pageNumbers
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };
  const moveNext = () => {
    setCurrentPage(currentPage + 1);
    // Show next set of pageNumbers
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const moveToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className='list-none flex justify-center items-center pt-4 mt-4 border-t border-gray-300'>
      <li
        onClick={movePrev}
        className={`text-base border-1 border-dark min-w-[3rem] h-12 p-1 flex justify-center items-center cursor-pointer ${
          currentPage === pageNumbers[0] ? `invisible` : null
        }`}
      >
        Prev
      </li>

      {pageNumbers.map((number) => {
        if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
          return (
            <li
              key={number}
              onClick={() => moveToPage(number)}
              className={`text-base border-1 border-dark min-w-[3rem] h-12 p-1 flex justify-center items-center cursor-pointer ${
                currentPage === number ? `bg-primary text-white` : null
              }`}
            >
              {number}
            </li>
          );
        } else return null;
      })}

      <li
        onClick={moveNext}
        className={`text-base border-1 border-dark min-w-[3rem] h-12 p-1 flex justify-center items-center cursor-pointer ${
          currentPage === pageNumbers[pageNumbers.length - 1]
            ? `invisible`
            : null
        }`}
      >
        Next
      </li>

      <p className='ml-4'>
        <b className='text-primary'>{`page ${currentPage}`}</b>
        <span>{` of `}</span>
        <b>{`${Math.ceil(totalItems / itemsPerPage)}`}</b>
      </p>
    </ul>
  );
};

export default Pagination;
