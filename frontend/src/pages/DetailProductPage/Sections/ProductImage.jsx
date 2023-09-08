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

      setImages(images);
    }
  }, [product]);

  return (
    <div className="m-4">
      <ImageGallery items={images} />
    </div>
  );
};

ProductImage.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductImage;
