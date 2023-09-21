import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

type ProductType = {
  title: string,
  price: string,
  thumbnail: string,
  id: string,
};

function ShoppingCart() {
  const [productList, setMyProductList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cartList') || '[]');
    setMyProductList(cart);
  }, []);

  const handleAddToCartAddUnity = (
    { id, title, thumbnail, price, counter, operation }: any,
  ) => {
    const productsList = JSON.parse(localStorage.getItem('cartList') || '[]');

    const productItem = {
      id,
      title,
      thumbnail,
      price,
      counter,
    };

    const newList = productsList;
    const index = newList.indexOf(newList
      .find((item: ProductType) => item.id === productItem.id));

    newList[index].counter += Number(operation);

    localStorage.setItem('cartList', JSON.stringify(newList));
    setMyProductList(newList);
  };

  const handleRemoveUnity = (id : any) => {
    const productsList = JSON.parse(localStorage.getItem('cartList') || '[]');

    const newList = productsList;
    const index = newList.indexOf(newList
      .find((item: ProductType) => item.id === id));

    newList.splice(newList[index], 1);

    localStorage.setItem('cartList', JSON.stringify(newList));
    setMyProductList(newList);
  };

  return (
    <div>
      {productList.length === 0 ? (
        <h2 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h2>
      ) : (
        productList.map(({ id, title, thumbnail, price, counter }: any) => {
          return (
            <div
              key={ id }
            >
              <Link
                to={ `/product/${id}` }
                data-testid="product-detail-link"
              >
                <div
                  data-testid="product"
                >
                  <h2
                    data-testid="shopping-cart-product-name"
                  >
                    { title }

                  </h2>
                  <img src={ thumbnail } alt={ title } />
                  <p>{ price }</p>
                </div>
              </Link>
              <button
                data-testid="product-decrease-quantity"
                onClick={ () => {
                  if (counter < 2) {
                    counter = 1;
                  } else {
                    const operation = '-1';
                    handleAddToCartAddUnity(
                      { id, title, thumbnail, price, counter, operation },
                    );
                  }
                } }
              >
                remover uma Unidade

              </button>
              <p
                data-testid="shopping-cart-product-quantity"
              >
                {counter}
              </p>
              <button
                data-testid="product-increase-quantity"
                onClick={ () => {
                  const operation = '+1';
                  handleAddToCartAddUnity(
                    { id, title, thumbnail, price, counter, operation },
                  );
                } }
              >
                Adicionar uma Unidade
              </button>
              <button
                data-testid="remove-product"
                onClick={ () => handleRemoveUnity(id) }
              >
                Remover Item
              </button>
            </div>
          );
        })
      )}
      <div>
        <button
          data-testid="checkout-products"
          onClick={ () => navigate('/checkout') }
        >
          Finalizar Compra
        </button>
      </div>
    </div>
  );
}

export default ShoppingCart;
