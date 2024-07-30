import { createSelector } from 'reselect';

const selectProductState = (state) => state.product;

export const getProductDetailsSelector = createSelector(
    selectProductState,
    (productState) => productState.productDetails
);
