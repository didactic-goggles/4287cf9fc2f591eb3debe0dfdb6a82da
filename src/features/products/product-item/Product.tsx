import React from 'react';
import { Link } from 'react-router-dom';
import ProductModel from '../../../models/Product.model';
import styles from './Product.module.scss';

type ProductProps = {
  product: ProductModel;
};

const Product: React.FC<ProductProps> = (props) => {
  const { product } = props;
  return (
    <div className={styles.product}>
      <h3>{product.title}</h3>
      <span>{product.price}</span>
      <Link to={`/product/${product.id}`} />
    </div>
  );
};

export default Product;
