import React from 'react';
import ProductModel from './Product.model';
import styles from './Product.module.scss';

type ProductProps = {
  product: ProductModel;
};

const Product: React.FC<ProductProps> = (props) => {
  const { product } = props;
  return (
    <div className={styles.product}>
      <h3>{product.title}</h3>
      <span>{product.price.toString()}</span>
    </div>
  );
};

export default Product;
