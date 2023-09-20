import { Link } from 'react-router-dom';

function ShoppingCart() {
  const cart = JSON.parse(localStorage.getItem('cartList') || '[]');

  return (
    <div>
      {cart.length === 0 ? (
        <h2 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h2>
      ) : (
        cart.map(({ id, title, thumbnail, price, counter }: any) => {
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
              <p
                data-testid="shopping-cart-product-quantity"
              >

                {counter}

              </p>
            </div>
          );
        })
      )}

    </div>
  );
}

export default ShoppingCart;
