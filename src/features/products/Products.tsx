import React from 'react';
import { useAppSelector } from '../../store/hooks';
import { productsData, productsStatus, productsError } from './productsSlice';
import Product from './product-item/Product';
import styles from './Products.module.scss';
import Search from './search/Search';
import Pagination from './pagination/Pagination';
import ErrorMessage from '../ErrorMessage';

const Products: React.FC = () => {
  const products = useAppSelector(productsData);
  const status = useAppSelector(productsStatus);
  const error = useAppSelector(productsError);

  if (status === 'loading') return <span>Loading</span>;
  if (error) return <ErrorMessage error={error} />;
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
