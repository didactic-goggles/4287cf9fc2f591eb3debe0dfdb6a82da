import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Product from '../../models/Product.model';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  getProducts,
  productsData,
  productsStatus,
} from '../products/productsSlice';

// import ProductModel from '../../models/Product.model';
// import styles from './Product.module.scss';

// type ProductProps = {
//   product: ProductModel;
// };

const ProductDetails: React.FC = (props) => {
  //   const { product } = props;
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
  return <div>{product.title}</div>;
};

export default ProductDetails;
