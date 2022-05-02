import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../../models/Product.model';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  getProducts,
  productsData,
  productsStatus,
} from '../products/productsSlice';
import BackButton from './back-button/BackButton';
import styles from './ProductDetails.module.scss';

const ProductDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const { productId } = useParams<'productId'>();
  const status = useAppSelector(productsStatus);
  const products = useAppSelector(productsData);
  const [product, setProduct] = useState<Product>();
  console.log(productId);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(getProducts());
    }
  }, [status, dispatch]);

  useEffect(() => {
    setProduct(products.find((p) => p.id === parseInt(productId as string)));
  }, [productId, products]);

  if (!product) return <div>Getting product data...</div>;
  return (
    <>
      <BackButton />
      <div className={`${styles.ProductDetails_container} mt-3`}>
        <div className={styles.ProductDetails_image}>
          <img src={product.image.src} alt={product.image.alt} />
        </div>
        <div className={styles.ProductDetails_body}>
          <h2>{product.title}</h2>
          <small className="product-details-price">{product.price}</small>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
