import React from "react";
import { Link } from "react-router-dom";
import ImageSlider from "../../../components/ImageSlider";
import PropTypes from "prop-types";

const CardItem = ({ product }) => {
  return (
    <div className="border-[1px] border-gray=300 mb-4">
      <ImageSlider images={product.images} />
      <Link to={`/product/${product._id}`}>
        <p className="p-1">{product.title}</p>
        <p className="p-1">{product.producttype}</p>
        <p className="p-1 text-gray-500">{product.price}</p>
      </Link>
    </div>
  );
};

CardItem.propTypes = {
  product: PropTypes.shape({
    images: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    producttype: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default CardItem;
