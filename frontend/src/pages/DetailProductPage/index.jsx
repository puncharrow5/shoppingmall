import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import ProductImage from "./Sections/ProductImage";
import ProductInfo from "./Sections/ProductInfo";

const DetailProductPage = () => {
  // prductId를 개별 변수로 사용
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(
    () => {
      async function fetchProduct() {
        try {
          const response = await axiosInstance.get(
            `/products/${productId}?type=single`
          );
          // 백엔드에서 response로 보내준 데이터를 product에 넣어줌
          setProduct(response.data[0]);
        } catch (error) {
          console.error(error);
        }
      }
      fetchProduct();
    },
    // productId가 바뀔 때마다 fetchProduct 함수 호출됨
    [productId]
  );

  if (!product) return null;

  return (
    <section className="min-h-[640px] px-10">
      <div className="flex mt-8">
        <div className="w-3/5 pr-2">
          <ProductImage product={product} />
        </div>

        <div className="w-2/5">
          <ProductInfo product={product} />
        </div>
      </div>
    </section>
  );
};

export default DetailProductPage;
