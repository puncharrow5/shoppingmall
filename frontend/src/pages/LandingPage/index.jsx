import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axios";
import TypeSelect from "./Sections/TypeSelect";
import PriceSelect from "./Sections/PriceSelect";
import SearchInput from "./Sections/SearchInput";
import CardItem from "./Sections/CardItem";
import { producttypes } from "../../utils/filterData";

const LandingPage = () => {
  const limit = 4;
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [filters, setFilters] = useState({
    producttypes: [],
    price: [],
  });

  useEffect(() => {
    fetchProducts({ limit });
  }, []);

  const fetchProducts = async ({
    skip,
    limit,
    loadMore = false,
    filters = {},
    searchTerm = "",
  }) => {
    // 객체 생성
    const params = {
      skip,
      limit,
      filters,
      searchTerm,
    };

    try {
      const response = await axiosInstance.get("/products", { params });

      if (loadMore) {
        // 원래 있던 products들을 나열한 후 새로 받은 products들을 나열
        setProducts([...products, ...response.data.products]);
      } else {
        setProducts(response.data.products);
      }
      // 이후 hasMore의 state를 업데이트함
      setHasMore(response.data.hasMore);
    } catch (error) {
      console.error(error);
    }
  };

  // onClick 이벤트로 함수 실행 시 loadMore이 true가 됨
  const handleLoadMore = () => {
    const body = {
      skip: skip + limit,
      limit,
      loadMore: true,
    };
    // 데이터베이스에서 product의 데이터 호출
    fetchProducts(body);
    setSkip(skip + limit);
  };

  const handleFilters = (newFilteredData, category) => {
    const newFilters = { ...filters };
    newFilters[category] = newFilteredData;

    showFilteredResults(newFilters);
    // filters의 state를 newFilters로 업데이트
    setFilters(newFilters);
  };

  const showFilteredResults = (filters) => {
    const body = {
      skip: 0,
      limit,
      filters,
    };
    // 데이터베이스에서 product의 데이터 호출
    fetchProducts(body);
    setSkip(0);
  };

  return (
    <section>
      <div className="py-10">
        <h2 className="text-4xl">Strymon Products</h2>
      </div>

      {/* Filter */}
      <div className="flex flex-col gap-3">
        <div className="w-full">
          <TypeSelect
            producttypes={producttypes}
            checkedTypes={filters.producttypes}
            onFilters={(filters) => handleFilters(filters, "producttypes")}
          />
        </div>
        <div className="w-full">
          <PriceSelect />
        </div>
      </div>

      {/* Search */}
      <div className="flex justify-end">
        <SearchInput />
      </div>

      {/* Card */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-2">
        {products.map((product) => (
          <CardItem product={product} key={product._id} />
        ))}
      </div>

      {/* Load More(요청된 params에서 hasMore = true 일 때만) */}
      {hasMore && (
        <div className="flex justify-center mb-5">
          <button
            className="px-4 py-2 mt-5 text-white bg-black rounded-md hover:bg-gray-500"
            onClick={handleLoadMore}
          >
            더보기
          </button>
        </div>
      )}
    </section>
  );
};

export default LandingPage;
