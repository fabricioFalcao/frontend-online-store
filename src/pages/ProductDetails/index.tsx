import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { getProductById } from '../../services/api';

type ProductType = {
  title: string,
  price: number,
  thumbnail: string,
  id: string,
};

function ProductDetails() {
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductType>({
    title: '',
    thumbnail: '',
    price: 0,
    id: '',
  });
  const { id } = useParams();
  const productApi = async () => {
    const productResponse = await getProductById(`${id}`);
    const productData = setProduct(productResponse);
    return productData;
  };
  productApi();

  const counter = 1;
  const handleAddToCart = () => {
    const productsList = JSON.parse(localStorage.getItem('cartList') || '[]');

    const productItem = {
      id: product.id,
      title: product.title,
      thumbnail: product.thumbnail,
      price: product.price,
      counter,
    };

    if (productsList.some((item: ProductType) => item.id === product.id)) {
      const newList = productsList;
      const index = newList.indexOf(newList
        .find((item: ProductType) => item.id === product.id));
      newList[index].counter += 1;

      localStorage.setItem('cartList', JSON.stringify(newList));
    } else {
      localStorage.setItem('cartList', JSON.stringify([...productsList, productItem]));
    }
  };

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
      <button
        data-testid="product-detail-add-to-cart"
        onClick={ () => handleAddToCart() }
      >
        Adicionar ao carrinho
      </button>
    </>

  );
}
export default ProductDetails;
