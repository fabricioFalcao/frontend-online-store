import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getProductById } from '../../services/api';

type ProductType = {
  title: string;
  thumbnail: string;
  price: number;
};

function ProductDetails() {
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductType>({
    title: '',
    thumbnail: '',
    price: 0,
  });
  const { id } = useParams();
  const productApi = async () => {
    const productResponse = await getProductById(`${id}`);
    const productData = setProduct(productResponse);
    return productData;
  };
  productApi();
  console.log(product);
  return (
    <>
      <h1>
        Página de detalhes
      </h1>
      <h2 data-testid="product-detail-name">
        {' '}
        {`${product.title}`}
        {' '}
      </h2>
      <img
        src={ `${product.thumbnail}` }
        alt={ `${product.title}` }
        data-testid="product-detail-image"
      />
      <h3 data-testid="product-detail-price">
        {' '}
        {`${product.price}`}
        {' '}
      </h3>
      <label>
        <button
          data-testid="shopping-cart-button"
          onClick={ () => navigate('/cart') }
        >
          {' '}
          Carrinho
          {' '}

        </button>
      </label>
    </>

  );
}
export default ProductDetails;
