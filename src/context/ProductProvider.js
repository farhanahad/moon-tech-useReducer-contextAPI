/* eslint-disable no-undef */
import React, { createContext, useContext, useEffect, useReducer } from "react";
import {
  initialState,
  productReducer,
} from "../state/ProductState/productReducer";
import { actionTypes } from "../state/ProductState/actionTypes";
const PRODUCT_CONTEXT = createContext();
const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, initialState);
  console.log(state);
  useEffect(() => {
    dispatch({ type: actionTypes.FETCHING_START });
    fetch("https://moone-tech-backend.vercel.app/products")
      .then((res) => res.json())
      .then((data) =>
        dispatch({ type: actionTypes.FETCHING_SUCCESS, payload: data.data })
      )
      .catch(() => {
        dispatch({ type: actionTypes.FETCHING_ERROR });
      });
  }, []);
  const value = {
    state,
    dispatch,
  };
  return (
    <PRODUCT_CONTEXT.Provider value={value}>
      {children}
    </PRODUCT_CONTEXT.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(PRODUCT_CONTEXT);
  return context;
};
export default ProductProvider;
