import React from "react";
import { useDispatch } from "react-redux";
import { productTypesMap } from "../../../utils/filterData";
import { addToCart } from "../../../store/thunkFunctions";
import PropTypes from "prop-types";

const ProductInfo = ({ product }) => {
  const productTypeName = productTypesMap[product.producttypes];

  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(
      addToCart({ productId: product._id, productTitle: product.title })
    );
  };

  return (
    <div className="m-4">
      <p className="text-2xl font-bold">{product.title}</p>
      <p className="mb-4 text-md text-[#caa171] font-bold ">
        {productTypeName}
      </p>

      <ul>
        <li className=" text-md font-bold">
          {product.price}
          <span> 원</span>
        </li>
        <li className="mb-8 text-md text-[#41b979] font-bold">
          {product.sold}
          <span> 명이 구매했습니다!</span>
        </li>
        <div className="mb-8">
          <button
            className="w-full h-12 bg-[#111111] hover:bg-gray-700 rounded-3xl text-white"
            onClick={handleClick}
          >
            장바구니
          </button>
        </div>
        <li className="text-md">{product.description}</li>
      </ul>
    </div>
  );
};

ProductInfo.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductInfo;
