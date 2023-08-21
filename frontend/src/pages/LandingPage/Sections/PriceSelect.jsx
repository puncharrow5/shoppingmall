import React from "react";
import PropTypes from "prop-types";

const PriceSelect = ({ prices, checkedPrice, onFilters }) => {
  return (
    <div className="flex justify-between mb-3 p-2 bg-gray-200 rounded-md">
      {prices?.map((price) => (
        <div className="mr-2" key={price._id}>
          <input
            checked={checkedPrice === price.array}
            onChange={(e) => onFilters(e.target.value)}
            type="radio"
            id={price._id}
            value={price._id}
          />{" "}
          <label className="text-sm font-bold" htmlFor={price._id}>
            {price.name}
          </label>
        </div>
      ))}
    </div>
  );
};

PriceSelect.propTypes = {
  prices: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.number.isRequired,
      array: PropTypes.arrayOf(PropTypes.number).isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  checkedPrice: PropTypes.arrayOf(PropTypes.number).isRequired,
  onFilters: PropTypes.func.isRequired,
};

export default PriceSelect;
