import React from 'react'
import ProductModel from './Product.model'

type ProductProps = {
    product: ProductModel
}

const Product: React.FC<ProductProps> = (props) => {
    const { product } = props;
    return (
        <div>{product.title}</div>
    )
}

export default Product