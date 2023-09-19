import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1 data-testid="home-initial-message">
        Digite algum termo de pesquisa ou escolha uma categoria.
      </h1>
      <Link to="/cart" data-testid="shopping-cart-button">
        <h1>Para o Carrinho</h1>
      </Link>
    </div>
  );
}

export default Home;
