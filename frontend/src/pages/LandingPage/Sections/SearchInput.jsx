import React from "react";
import PropTypes from "prop-types";

const SearchInput = ({ onSearch, searchTerm }) => {
  return (
    <input
      className="h-8 w-1/3 mb-6 px-3 border text-sm border-gray-300 rounded-md"
      type="text"
      placeholder="찾는 상품이 있나요?"
      onChange={onSearch}
      value={searchTerm}
    />
  );
};

SearchInput.propTypes = {
  onSearch: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
};

export default SearchInput;
