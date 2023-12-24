import React from 'react';

const Pagination = ({ currentPage, totalItems, onPageChange }) => {
  const itemsPerPage = 10;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const handlePageClick = (pageNumber) => {
    onPageChange(pageNumber);
  };

  return (
    <div style={{ marginTop: '10px' }}>
      {pageNumbers.map((number) => (
        <span
          key={number}
          style={{
            cursor: 'pointer',
            margin: '0 5px',
            fontWeight: currentPage === number ? 'bold' : 'normal',
          }}
          onClick={() => handlePageClick(number)}
        >
          {number}
        </span>
      ))}
    </div>
  );
};

export default Pagination;
