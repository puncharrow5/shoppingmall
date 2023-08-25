import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const CartTable = ({ products, onRemoveItem }) => {
  const renderProductImage = (images) => {
    if (images.length > 0) {
      let image = images[0];
      return `${import.meta.env.VITE_SERVER_URL}/uploads/${image}`;
    }
  };

  const renderItems =
    products.length > 0 &&
    products.map((product) => (
      <div key={product._id} className="flex py-6 border-b-2 border-slate-100">
        <div className="w-1/3 mr-10">
          <Link to={`/product/${product._id}`}>
            <img src={renderProductImage(product.images)} alt="productImg" />
          </Link>
        </div>
        <div className="flex flex-col w-2/3">
          <div className="font-bold mb-3">{product.title}</div>
          <div>가격 : {product.price} 원</div>
          <div>수량 : {product.quantity} 개</div>
          <div className="w-[50px] mt-auto mb-1 py-1 bg-[#111111] rounded-3xl text-white text-sm">
            <button
              className="m-auto block"
              onClick={() => onRemoveItem(product._id)}
            >
              삭제
            </button>
          </div>
        </div>
      </div>
    ));

  return (
    <div className="m-4">
      <h2 className="mb-4 text-2xl font-bold">장바구니</h2>
      {renderItems}
    </div>
  );
};

CartTable.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      quantity: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  onRemoveItem: PropTypes.func.isRequired,
};

export default CartTable;
