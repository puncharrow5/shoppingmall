import React from "react";
import PropTypes from "prop-types";

const TypeSelect = ({ producttypes, checkedTypes, onFilters }) => {
  const handleToggle = (producttypeId) => {
    const currentIndex = checkedTypes.indexOf(producttypeId);

    const newChecked = [...checkedTypes];

    if (currentIndex === -1) {
      newChecked.push(producttypeId);
    }
    else {
      newChecked.splice(currentIndex, 1);
    }
    onFilters(newChecked);
  };

  return (
    <div className="flex flex-wrap p-2 bg-gray-200 rounded-md">
      {producttypes?.map((producttype) => (
        <div className="w-1/3" key={producttype._id}>
          <input
            type="checkbox"
            onChange={() => handleToggle(producttype._id)}
            checked={
              checkedTypes.indexOf(producttype._id) === -1 ? false : true
            }
          />{" "}
          <label className="font-bold">{producttype.name}</label>
        </div>
      ))}
    </div>
  );
};

TypeSelect.propTypes = {
  producttypes: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
    })
  ).isRequired,
  checkedTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  onFilters: PropTypes.func.isRequired,
};

export default TypeSelect;
