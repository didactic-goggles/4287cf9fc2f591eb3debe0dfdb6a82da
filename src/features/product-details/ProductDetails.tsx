import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../../models/Product.model';
import { useAppSelector } from '../../store/hooks';
import ErrorMessage from '../ErrorMessage';
import { productsData, productsStatus } from '../products/productsSlice';
import BackButton from './back-button/BackButton';
import styles from './ProductDetails.module.scss';

const ProductDetails: React.FC = () => {
  const { productId } = useParams<'productId'>();
  const products = useAppSelector(productsData);
  const status = useAppSelector(productsStatus);
  const [product, setProduct] = useState<Product>();

  useEffect(() => {
    const productData = products.find(
      (p) => p.id === parseInt(productId as string)
    );
    if (productData) {
      setProduct(productData);
    }
  }, [productId, products]);

  if (status === 'loading') return <div>Getting product data...</div>;
  if (!product) return <ErrorMessage error={new Error('Invalid product id')} />;
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
