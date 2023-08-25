import React from "react";
import { Link } from "react-router-dom";
import ImageSlider from "../../../components/ImageSlider";
import { productTypesMap } from "../../../utils/filterData";
import PropTypes from "prop-types";

const CardItem = ({ product }) => {
  const productTypeName = productTypesMap[product.producttypes];

  return (
    <div className="border-[1px] border-gray=300 mb-4">
      <ImageSlider images={product.images} />
      <Link to={`/product/${product._id}`}>
        <p className="px-1 mt-1 mb-1 text-[#3e6595] font-bold leading-5">
          {product.title}
        </p>
        <p className="px-1 mb-3 text-xs text-[#caa171]">{productTypeName}</p>
        <p className="px-1 text-[#6088b0] font-bold justify-end">
          {product.price}
        </p>
      </Link>
    </div>
  );
};

CardItem.propTypes = {
  product: PropTypes.shape({
    images: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    producttypes: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default CardItem;
