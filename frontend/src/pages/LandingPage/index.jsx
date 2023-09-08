import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axios";
import TypeSelect from "./Sections/TypeSelect";
import PriceSelect from "./Sections/PriceSelect";
import SearchInput from "./Sections/SearchInput";
import CardItem from "./Sections/CardItem";
import { producttypes, prices } from "../../utils/filterData";

const LandingPage = () => {
  const limit = 8;
  const [products, setProducts] = useState([]);
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
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
        setProducts([...products, ...response.data.products]);
      } else {
        setProducts(response.data.products);
      }
      setHasMore(response.data.hasMore);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLoadMore = () => {
    const body = {
      skip: skip + limit,
      limit,
      loadMore: true,
      searchTerm: searchTerm,
    };
    fetchProducts(body);
    setSkip(skip + limit);
  };

  const handleFilters = (newFilteredData, category) => {
    const newFilters = { ...filters };
    newFilters[category] = newFilteredData;
    if (category === "price") {
      const priceValue = handlePrice(newFilteredData);
      newFilters[category] = priceValue;
    }
    showFilteredResults(newFilters);
    setFilters(newFilters);
  };

  const handlePrice = (value) => {
    let array = [];
    for (let key in prices) {
      if (prices[key]._id === parseInt(value, 10)) {
        array = prices[key].array;
      }
    }
    return array;
  };

  const showFilteredResults = (filters) => {
    const body = {
      skip: 0,
      limit,
      filters,
      searchTerm,
    };
    fetchProducts(body);
    setSkip(0);
  };

  const handleSearchTerm = (event) => {
    const body = {
      skip: 0,
      limit,
      filters,
      searchTerm: event.target.value,
    };
    setSkip(0);
    setSearchTerm(event.target.value);
    fetchProducts(body);
  };

  return (
    <section>
      <div className="px-10">
        {/* Filter */}
        <div className="flex flex-col gap-3 pt-6">
          <div className="w-full">
            <TypeSelect
              producttypes={producttypes}
              checkedTypes={filters.producttypes}
              onFilters={(filters) => handleFilters(filters, "producttypes")}
            />
          </div>
          <div className="w-full">
            <PriceSelect
              prices={prices}
              checkedPrice={filters.price}
              onFilters={(filters) => handleFilters(filters, "price")}
            />
          </div>
        </div>

        {/* Search */}
        <div className="flex justify-end">
          <SearchInput searchTerm={searchTerm} onSearch={handleSearchTerm} />
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
              className="px-4 py-2 mt-5 text-white bg-black rounded-md hover:bg-gray-700"
              onClick={handleLoadMore}
            >
              더보기
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default LandingPage;
