import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import UploadFile from "../../components/UploadFile";

const producttypes = [
  { key: 1, value: "Effect Pedals" },
  { key: 2, value: "Plugins" },
  { key: 3, value: "Eurorack Modules" },
  { key: 4, value: "Cables" },
  { key: 5, value: "Power Supplies" },
  { key: 6, value: "Apparel & Merch" },
];

const UploadProductPage = () => {
  const userData = useSelector((state) => state.user?.userData);

  const navigate = useNavigate();

  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: 0,
    producttypes: 1,
    images: [],
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImages = (newImages) => {
    setProduct((prevState) => ({
      ...prevState,
      images: newImages,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const body = {
      writer: userData.id,
      ...product,
    };

    try {
      await axiosInstance.post("/products", body);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section className="px-10">
      <div className="text-center m-12">
        <h1 className="text-2xl font-bold">예상 상품 업로드</h1>
      </div>

      <form className="mt-6" onSubmit={handleSubmit}>
        <UploadFile images={product.images} onImageChange={handleImages} />

        <div className="mt-4">
          <label className="font-bold" htmlFor="title">
            이름
          </label>
          <input
            className="w-full px-4 py-2 mt-1 mb-3 bg-white border-2 border-slate-300 rounded-md"
            name="title"
            id="title"
            onChange={handleChange}
            value={product.title}
          />
        </div>

        <div className="mt-4">
          <label className="font-bold" htmlFor="description">
            설명
          </label>
          <input
            className="w-full px-4 py-2 mt-1 mb-3 bg-white border-2 border-slate-300 rounded-md"
            name="description"
            id="description"
            onChange={handleChange}
            value={product.description}
          />
        </div>

        <div className="mt-4">
          <label className="font-bold" htmlFor="price">
            가격
          </label>
          <input
            className="w-full px-4 py-2 mt-1 mb-3 bg-white border-2 border-slate-300 rounded-md"
            name="price"
            id="price"
            onChange={handleChange}
            value={product.price}
          />
        </div>

        <div className="mt-4">
          <label className="font-bold" htmlFor="producttypes">
            품목
          </label>
          <select
            className="w-full px-4 py-2 mt-1 mb-3 bg-white border-2 border-slate-300 rounded-md"
            name="producttypes"
            id="producttypes"
            onChange={handleChange}
            value={product.producttypes}
          >
            {producttypes.map((item) => (
              <option key={item.key} value={item.key}>
                {item.value}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-12 mb-5 ">
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-black rounded-md"
          >
            작성하기
          </button>
        </div>
      </form>
    </section>
  );
};

export default UploadProductPage;
