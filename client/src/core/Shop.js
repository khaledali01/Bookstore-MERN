import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import Card from "./Card";
import { getCategories, getFilteredProducts } from "./apiCore";
import Checkbox from "./CheckBox";
import RadioBox from "./RadioBox";
import { prices } from "./fixedPrices";
import { getProducts } from "./apiCore";
import Search from "./SearchWithCategory";

const Shop = () => {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] },
  });
  const [productsBySell, setProductsBySell] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [productsBySellCheck, setProductsBySellCheck] = useState(false);
  const [productsByArrivalCheck, setProductsByArrivalCheck] = useState(false);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);

  const loadProductsBySell = () => {
    getProducts("sold").then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProductsBySell(data);
      }
    });
  };

  const loadProductsByArrival = (e) => {
    getProducts("createdAt").then((data) => {
      console.log(data);
      if (data.error) {
        setError(data.error);
      } else {
        setProductsByArrival(data);
      }
    });
  };

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, []);

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setCategories(data);
      }
    });
  };

  const loadFilteredResults = (newFilters) => {
    getFilteredProducts(skip, limit, newFilters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults(data.data);
        setSize(data.size);
        setSkip(0);
      }
    });
  };

  const loadMore = () => {
    let toSkip = skip + limit;
    getFilteredProducts(toSkip, limit, myFilters.filters).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setFilteredResults([...filteredResults, ...data.data]);
        setSize(data.size);
        setSkip(toSkip);
      }
    });
  };

  const loadMoreButton = () => {
    return (
      size > 0 &&
      size >= limit && (
        <button onClick={loadMore} className="btn btn-warning mb-5">
          Load more
        </button>
      )
    );
  };

  useEffect(() => {
    init();
    loadFilteredResults(skip, limit, myFilters.filters);
  }, []);

  const handleFilters = (filters, filterBy) => {
    const newFilters = { ...myFilters };
    newFilters.filters[filterBy] = filters;

    if (filterBy === "price") {
      let priceValues = handlePrice(filters);
      newFilters.filters[filterBy] = priceValues;
    }
    loadFilteredResults(myFilters.filters);
    setMyFilters(newFilters);
  };

  const handlePrice = (value) => {
    const data = prices;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array;
      }
    }
    return array;
  };

  const handleNewArrivals = (e) => {
    setProductsByArrivalCheck(e.target.checked);
  };

  const handleBySell = (e) => {
    setProductsBySellCheck(e.target.checked);
  };

  const showNewArrivals = () => {
    if (productsByArrivalCheck) {
      return productsByArrival.map((product, i) => (
        <div key={i} className="col-4 mb-3">
          <Card product={product} />
        </div>
      ));
    }
  };

  const showBySell = () => {
    if (productsBySellCheck) {
      return productsBySell.map((product, i) => (
        <div key={i} className="col-4 mb-3">
          <Card product={product} />
        </div>
      ));
    }
  };

  const showByFilters = () => {
    if (!productsByArrivalCheck && !productsBySellCheck) {
      return filteredResults.map((product, i) => (
        <div key={i} className="col-4 mb-3">
          <Card product={product} />
        </div>
      ));
    }
  };

  return (
    <Layout
      title="Shop"
      description="Search and find books of your choice"
      className="container-fluid"
    >
      <Search />
      <div className="row">
        <div className="col-4">
          <h4>Filter by</h4>
          <ul>
            <li>
              <input
                onChange={handleNewArrivals}
                name="NewArrivalsCheckbox"
                type="checkbox"
                className="form-check-input"
              />
              <label className="form-check-label">New Arrivals</label>
            </li>
            <li>
              <input
                onChange={handleBySell}
                name="BySellCheckbox"
                type="checkbox"
                className="form-check-input"
              />
              <label className="form-check-label">Sells</label>
            </li>
          </ul>
          <h4>Filter by categories</h4>
          <ul>
            <Checkbox
              categories={categories}
              handleFilters={(filters) => handleFilters(filters, "category")}
            />
          </ul>

          <h4>Filter by price range</h4>
          <div>
            <RadioBox
              prices={prices}
              handleFilters={(filters) => handleFilters(filters, "price")}
            />
          </div>
        </div>

        <div className="col-8">
          <div className="row">
            {showByFilters()}
            {showNewArrivals()}
            {showBySell()}
          </div>
          <hr />
          {loadMoreButton()}
        </div>
      </div>
    </Layout>
  );
};

export default Shop;
