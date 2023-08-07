import {
  Grid,
  Box,
  Paper,
  Typography,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import EmptyProductsList from "./EmptyProductsList";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  // textAlign: "center",
  color: theme.palette.text.secondary,
  marginBottom: "10px",
  marginRight: "10px",
  // padding: "10px",
  listStyleType: "none",
  border: "1px solid black",
  textAlign: "left",
  width: "250px",
}));

const priceRange = ["10", "20", "30", "40", "50"];

const ResultsFound = ({ count, keyword }) => {
  return (
    <Grid container item xs={10} justifyContent="center">
      <Typography style={{ marginBottom: "20px" }}>
        {count} results found for <strong>"{keyword}"</strong>
      </Typography>
    </Grid>
  );
};

const ProductsListResult = ({ productsData, keywordData }) => {
  return (
    <Grid container item xs={9}>
      <ResultsFound count={productsData.length} keyword={keywordData} />

      {productsData.map(item => {
        return (
          <Item key={item._id}>
            <div style={{ margin: "auto" }}>{item.product_name}</div>
            <hr />
            <div>Product ID: {item.product_id}</div>
            <div>Price: {item.price}</div>
            <div>Category: {item.category}</div>
          </Item>
        );
      })}
    </Grid>
  );
};

const FilterSection = ({ handleOnChangePrice, priceRangeData, price }) => {
  return (
    <Grid
      item
      xs={2.5}
      justifyContent="flex-start"
      style={{ border: "1px solid black", marginLeft: "1rem" }}>
      <Grid
        container
        item
        justifyContent="center"
        style={{ marginBottom: "20px" }}>
        <Typography variant="h5">Filter</Typography>
      </Grid>
      <Grid container item>
        <Item style={{ width: "100%" }}>
          <InputLabel id="label-filter-price-select" style={{ width: "100%" }}>
            Price
          </InputLabel>
          <Select
            labelId="label-filter-price-select"
            value={price}
            label="Price"
            id="filter-price-select"
            onChange={handleOnChangePrice}
            style={{ width: "100%" }}>
            {priceRangeData.map((item, index) => (
              <MenuItem value={item} key={item}>
                {index === priceRangeData.length - 1
                  ? `${item - 10} ~ `
                  : `${item - 10} ~ ${item}`}
              </MenuItem>
            ))}
          </Select>
        </Item>
      </Grid>
    </Grid>
  );
};

const CurrentPage = ({
  productsData,
  handleOnChangePrice,
  priceData,
  keywordData,
}) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <FilterSection
          handleOnChangePrice={handleOnChangePrice}
          priceRangeData={priceRange}
          price={priceData}
        />
        {productsData.length > 0 ? (
          <ProductsListResult
            productsData={productsData}
            keywordData={keywordData}
          />
        ) : (
          <EmptyProductsList />
        )}
      </Grid>
    </Box>
  );
};

const ProductsList = ({ results, keyword }) => {
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [products, setProducts] = useState("");

  useEffect(() => {
    setPrice("");
    filteringData(results);
  }, [results]);

  const handleOnChangePrice = event => {
    const currentPriceRange = parseInt(event.target.value);
    let lowerBoundPrice = parseInt(event.target.value) - 10;
    let upperBoundPrice = 0;

    if (currentPriceRange < 50) {
      upperBoundPrice = currentPriceRange;
    }
    let productsFilterByPrice = _.cloneDeep(filteringData(results));
    productsFilterByPrice = productsFilterByPrice.filter(item => {
      if (!upperBoundPrice) {
        return item.price >= parseFloat(lowerBoundPrice);
      }
      return (
        item.price <= parseFloat(upperBoundPrice) &&
        item.price >= parseFloat(lowerBoundPrice)
      );
    });
    setProducts(productsFilterByPrice);
    setPrice(event.target.value);
  };

  const groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  const filteringData = productsData => {
    const allSubstring = keyword.trim().split(" ");

    let filteredData = [];

    productsData.forEach(item => {
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

    filteredData = _.uniqBy(filteredData, "_id");

    setProducts(filteredData);

    return filteredData;
  };

  // const groupedData = groupBy(filteredData, "category");

  return (
    <CurrentPage
      productsData={products}
      handleOnChangePrice={handleOnChangePrice}
      priceData={price}
      keywordData={keyword}
    />
  );
};

export default ProductsList;
