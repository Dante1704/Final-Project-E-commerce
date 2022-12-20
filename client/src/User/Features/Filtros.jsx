import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sortByPrice, getByFilters } from "../../Redux/Reducer/allProductSlice";
import { MDBContainer } from "mdb-react-ui-kit";

export const Filtros = ({ setOrden, setCurrentPage }) => {
  const dispatch = useDispatch();
  const products = [...useSelector((state) => state.allProducts.allProducts)];
  const [filters, setFilters] = useState({
    gender: "",
    category: "",
    color: "",
  });

  function filterHandler(e) {
    const filterName = e.target.name;
    const filterValue = e.target.value;
    setFilters({ ...filters, [filterName]: filterValue });
    setCurrentPage(1);
    dispatch(getByFilters(filters));
    setOrden(`Ordenado ${e.target.value}`);
  }

  function sortingHandler(e) {
    setCurrentPage(1);
    const sorting = e.target.value;
    let sortedProducts = [];
    console.log(sorting);
    console.log("se van a ordenar: ", sorting);
    console.log("productos a ordenar: ", products);
    if (sorting === "asc") {
      console.log("se van a ordenar ascendente: ", sorting);
      sortedProducts = products.sort((a, b) => a.price - b.price);
    } else if (sorting === "desc") {
      console.log("se van a ordenar descendente: ", sorting);
      sortedProducts = products.sort((a, b) => b.price - a.price);
    } else {
      console.log("se van a ordenar por id: ", sorting);
      sortedProducts = products.sort((a, b) => a.id - b.id);
    }
    console.log(sortedProducts);
    dispatch(sortByPrice(sortedProducts));
    setOrden(`Ordenado ${sorting}`);
  }

  useEffect(() => {
    dispatch(getByFilters(filters));
  }, [dispatch, filters]);

  return (
    <MDBContainer fluid className="d-flex justify-content-around mt-5 mb-5">
      <select onChange={filterHandler} name="color">
        <option value="">Color</option>
        <option value="white">White</option>
        <option value="black">Black</option>
        <option value="red">Red</option>
        <option value="blue">Blue</option>
        <option value="yellow">Yellow</option>
        <option value="green">Green</option>
      </select>
      <select onChange={filterHandler} name="gender">
        <option value="">Gender</option>
        <option value="female">Female</option>
        <option value="male">Male</option>
        <option value="other">Both Genders</option>
      </select>

      <select onChange={filterHandler} name="category">
        <option value="">Category</option>
        <option value="shirts">Shirt</option>
        <option value="t-shirts">T-shirt</option>
        <option value="shoes">Shoes</option>
        <option value="jeans">jeans</option>
        <option value="jackets">Jackets</option>
      </select>

      <select onChange={sortingHandler}>
        <option value="">Prices</option>
        <option value="asc">Lowest price</option>
        <option value="desc">Highest price</option>
      </select>
    </MDBContainer>
  );
};
