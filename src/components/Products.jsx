import React, { useDeferredValue, useState, useEffect } from "react";

import ProductsList from "./ProductsList";
import SearchProducts from "./SearchProducts";

export const Products = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [productsData, setProductsData] = useState([]);

  const deferredInput = useDeferredValue(searchTerm);

  useEffect(() => {
    if (deferredInput !== "") {
      fetchProducts(deferredInput).then(products => {
        setProductsData(products);
      });
    } else {
      setProductsData([]);
    }
  }, [deferredInput]);

  const fetchProducts = async input => {
    return fetch(
      `https://8ky35k70oc.execute-api.ap-northeast-1.amazonaws.com/products?keyword=${input}`,
      {
        headers: {
          "x-api-key": "YHTdXURDcXamPN8x5vBTT2gljyI6umrR2rjISE5m",
        },
      }
    )
      .then(res => res.json())
      .then(productData => {
        return productData.hits.hits;
      });
  };

  const handleOnChange = e => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="products" style={{ width: "100%" }}>
      <h1>Products</h1>
      <SearchProducts handleOnChange={handleOnChange} />
      <ProductsList results={productsData} keyword={searchTerm} />
    </div>
  );
};
