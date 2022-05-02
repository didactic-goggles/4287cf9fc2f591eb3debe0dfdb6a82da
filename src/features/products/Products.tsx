import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import {
  paginateProducts,
  getProducts,
  productsData,
  productsStatus,
  productsPagination
} from './productsSlice';
import Product from './product-item/Product';
import styles from './Products.module.scss';
import Search from './search/Search';

const Products: React.FC = () => {
  const products = useAppSelector(productsData);
  const status = useAppSelector(productsStatus);
  const pagination = useAppSelector(productsPagination);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getProducts());
    }
  }, [status, dispatch])

  const onPaginationButtonClick = (paginationTarget: number) => {
    dispatch(paginateProducts(paginationTarget))
  }

  if (status === 'loading')
    return <span>Loading</span>

  return (
    <div>
      <Search />
      <div className={styles.products}>
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

export default Products
