import React from "react";

const SearchProducts = ({ handleOnChange }) => {
  return (
    <>
      <input
        type="text"
        onChange={handleOnChange}
        placeholder="Search your product here"
      />
    </>
  );
};

export default SearchProducts;
