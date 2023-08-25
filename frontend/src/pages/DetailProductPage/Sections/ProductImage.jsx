import React, { useState, useEffect } from "react";
import ImageGallery from "react-image-gallery";
import PropTypes from "prop-types";

const ProductImage = ({ product }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (product?.images?.length > 0) {
      let images = [];

      product.images.map((imageName) => {
        return images.push({
          original: `${import.meta.env.VITE_SERVER_URL}/uploads/${imageName}`,
          thumbnail: `${import.meta.env.VITE_SERVER_URL}/uploads/${imageName}`,
        });
      });

      // 받아온 이미지를 넣어줘 state 업데이트 해줌
      setImages(images);
    }
    //product 바뀔 때마다 호출
  }, [product]);

  return (
    <div className="m-4">
      <ImageGallery items={images} />
    </div>
  );
};

ProductImage.propTypes = {
  product: PropTypes.object.isRequired, // Add product prop validation
};

export default ProductImage;
