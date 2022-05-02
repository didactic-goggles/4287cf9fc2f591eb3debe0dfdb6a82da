import React, { useEffect, ChangeEvent, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import {
  searchProducts,
  paginateProducts,
  getProducts,
  productsData,
  productsStatus,
  productsPagination
} from './productsSlice';
import Product from './Product';
// import styles from './Products.module.css';

export function Products() {
  const products = useAppSelector(productsData);
  const status = useAppSelector(productsStatus);
  const pagination = useAppSelector(productsPagination);
  const [searchProduct, setSearchProduct] = useState<string>('')
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getProducts());
    }
  }, [status, dispatch])

  useEffect(() => {
    dispatch(searchProducts(searchProduct));
  }, [searchProduct, dispatch])

  const onChangeSearchTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchProduct(e.target.value);
  };

  const onPaginationButtonClick = (paginationTarget: number) => {
    dispatch(paginateProducts(paginationTarget))
  }

  if (status === 'loading')
    return <span>Loading</span>

  return (
    <div>
      <label htmlFor="product-search">Search:</label>
      <input type="text" id="product-search" value={searchProduct}
        onChange={onChangeSearchTitle} />
      <div>
        {products.map(product => <Product product={product} key={product.id} />)}
      </div>
      <div>
        {pagination.currentPage}/
        {pagination.totalPage}
        <button onClick={onPaginationButtonClick.bind(null, -1)} disabled={pagination.currentPage === 1}>Previous</button>
        <button onClick={onPaginationButtonClick.bind(null, 1)} disabled={pagination.currentPage === pagination.totalPage}>Next</button>
      </div>
    </div>
  );
}
