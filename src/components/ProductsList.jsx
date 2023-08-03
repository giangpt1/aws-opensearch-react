import React from "react";

const ProductsList = ({ results, keyword }) => {
  const groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  const allSubstring = keyword.trim().split(" ");

  const filteredData = [];

  results.forEach(item => {
    const productsTmp = item._source.products;
    for (const prod of productsTmp) {
      if (
        allSubstring.every(word =>
          prod.product_name.toLowerCase().includes(word)
        )
      ) {
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

              {/* <table> */}
              {values.map(prod => {
                return (
                  // <tr key={prod._id}>
                  //   <td>Product Name: {prod.product_name}</td>
                  //   <td>ID: {prod._id}</td>
                  <div className="product__desc" key={prod._id}>
                    <div style={{ textAlign: "left" }}>
                      <strong>Product Name: </strong>
                      {prod.product_name}
                    </div>
                    <div style={{ textAlign: "left" }}>
                      <strong>ID: </strong>
                      {prod._id}
                    </div>
                    <hr />
                  </div>
                  // </tr>
                );
              })}
              {/* </table> */}
            </section>
          </div>
        );
      })}
    </div>
  );
};

export default ProductsList;
