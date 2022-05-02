import React, { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { getProducts, productsData, productsStatus } from './productsSlice';
import Product from './product-item/Product';
import styles from './Products.module.scss';
import Search from './search/Search';
import Pagination from './pagination/Pagination';

const Products: React.FC = () => {
  const products = useAppSelector(productsData);
  const status = useAppSelector(productsStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getProducts());
    }
  }, [status, dispatch]);

  if (status === 'loading') return <span>Loading</span>;

  return (
    <div>
      <Search />
      <div className={styles.products}>
        {products.map((product) => (
          <Product product={product} key={product.id} />
        ))}
      </div>
      <Pagination />
    </div>
  );
};

export default Products;
