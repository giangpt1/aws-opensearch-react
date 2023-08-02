import React from "react";

const ProductsList = ({ results, keyword }) => {
  const groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  const filteredData = [];

  results.forEach(item => {
    const productsTmp = item._source.products;
    for (const prod of productsTmp) {
      if (prod.product_name.toLowerCase().includes(keyword)) {
        filteredData.push(prod);
      }
    }
  });

  const groupedData = groupBy(filteredData, "category");

  return (
    <div>
      {Object.entries(groupedData).map(([key, values]) => {
        return (
          <div className="product" key={key}>
            <section className="product__info">
              <div className="product__title">{key}</div>

              {values.map(prod => {
                return (
                  <div className="product__desc">
                    Product Name: {prod.product_name} ---*--- ID: {prod._id}
                  </div>
                );
              })}
            </section>
          </div>
        );
      })}
    </div>
  );
};

export default ProductsList;
