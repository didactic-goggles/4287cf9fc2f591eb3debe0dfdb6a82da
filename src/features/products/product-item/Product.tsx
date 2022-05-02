import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductModel from '../../../models/Product.model';
import styles from './Product.module.scss';

type ProductProps = {
  product: ProductModel;
};

const Product: React.FC<ProductProps> = (props) => {
  const { product } = props;
  const navigate = useNavigate();
  const onProductClick = () => {
    navigate(`/product/${product.id}`);
  };
  return (
    <div className={styles.product} onClick={onProductClick}>
      <h3>{product.title}</h3>
      <span>{product.price}</span>
    </div>
  );
};

export default Product;
