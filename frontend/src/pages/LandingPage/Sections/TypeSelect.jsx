import React from "react";
import PropTypes from "prop-types";

const TypeSelect = ({ producttypes, checkedTypes, onFilters }) => {
  const handleToggle = (producttypeId) => {
    // 클릭한 checkbox가 이미 체크된 checkbox인지 아닌지 확인
    const currentIndex = checkedTypes.indexOf(producttypeId);

    const newChecked = [...checkedTypes];

    // 아직 체크되지 않았을 경우 추가
    if (currentIndex === -1) {
      newChecked.push(producttypeId);
    }
    // 체크된 항목에서 제거
    else {
      newChecked.splice(currentIndex, 1);
    }
    // newChecked로 변수가 바뀐 onFilters 함수를 호출
    onFilters(newChecked);
  };

  return (
    <div className="p-2 mb-3 bg-gray-100 rounded-md">
      {producttypes?.map((producttype) => (
        <div key={producttype._id}>
          <input
            type="checkbox"
            onChange={() => handleToggle(producttype._id)}
            checked={
              checkedTypes.indexOf(producttype._id) === -1 ? false : true
            }
          />{" "}
        </div>
      ))}
    </div>
  );
};

TypeSelect.propTypes = {
  producttypes: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      // Add other prop types for producttype here if needed
    })
  ).isRequired,
  checkedTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  onFilters: PropTypes.func.isRequired,
};

export default TypeSelect;
