import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [localStorageState, setLocalStorageState] = useState([{
    title: '',
    thumbnail: '',
    id: '',
  }]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cpf: '',
    phone: '',
    cep: '',
    endereço: '',
  });
  const handleClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();
    if (validateInputValue() && isChecked) {
      navigate('/cart');
      localStorage.clear();
    }
    console.log('clicou');
  };
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  // use effect
  useEffect(() => {
    const arrayLocalStorage = localStorage.getItem('cartList');
    if (arrayLocalStorage) {
      const myItens = JSON.parse(arrayLocalStorage);
      setLocalStorageState(myItens);
    }
  }, []);

  const validateInputValue = () => {
    if (formData.name.length > 0
      && formData.email.length > 0
      && formData.cpf.length > 0
      && formData.phone.length > 0
      && formData.cep.length > 0
      && formData.endereço.length > 0
    ) return true;
  };
  return (
    <>
      <div>
        <h1>
          Revise os seus produtos:
        </h1>
        {localStorageState
          .map((product) => (
            <>
              <h3 key={ product.id }>{`${product.title}`}</h3>
              <img
                src={ product.thumbnail }
                alt={ product.title }
              />
            </>))}
      </div>
      <div>
        <h1>Informações do comprador</h1>
        <form>
          <input
            data-testid="checkout-fullname"
            type="text"
            placeholder="Nome completo
          "
            value={ formData.name }
            required
            onChange={ (event) => handleInputChange(event) }
            name="name"
          />
          <input
            data-testid="checkout-email"
            type="email"
            placeholder="E-mail"
            required
            value={ formData.email }
            onChange={ (event) => handleInputChange(event) }
            name="email"
          />
          <input
            data-testid="checkout-cpf"
            placeholder="CPF"
            required
            value={ formData.cpf }
            onChange={ (event) => handleInputChange(event) }
            name="cpf"
          />
          <input
            data-testid="checkout-phone"
            placeholder="phone"
            required
            value={ formData.phone }
            onChange={ (event) => handleInputChange(event) }
            name="phone"
          />
          <input
            data-testid="checkout-cep"
            placeholder="CEP"
            required
            value={ formData.cep }
            onChange={ (event) => handleInputChange(event) }
            name="cep"
          />
          <input
            data-testid="checkout-address"
            placeholder="Endereço"
            required
            value={ formData.endereço }
            onChange={ (event) => handleInputChange(event) }
            name="endereço"
          />
          <h3> Forma de pagamento </h3>

          <input
            required
            type="radio"
            value="Boleto"
            id="boleto"
            name="forma-de-pagamento"
            data-testid="ticket-payment"
            onChange={ () => setIsChecked(true) }
          />
          <label htmlFor="boleto">Boleto</label>
          <input
            type="radio"
            value="Visa"
            id="visa"
            name="forma-de-pagamento"
            data-testid="visa-payment"
            onChange={ () => setIsChecked(true) }
          />
          <label htmlFor="visa">Visa</label>
          <input
            type="radio"
            value="MasterCard"
            id="masterCard"
            name="forma-de-pagamento"
            data-testid="master-payment"
            onChange={ () => setIsChecked(true) }
          />
          <label htmlFor="masterCard">MasterCard</label>
          <input
            type="radio"
            value="Elo"
            id="elo"
            name="forma-de-pagamento"
            data-testid="elo-payment"
            onChange={ () => setIsChecked(true) }
          />
          <label htmlFor="elo">Elo</label>
          <button
            data-testid="checkout-btn"
            onClick={ (event) => handleClick(event) }
            // disabled={ !validateInputValue() && !isChecked }
            type="submit"
            onChange={ () => setIsChecked(true) }
          >
            Comprar
          </button>
        </form>
      </div>
      { !(validateInputValue() && isChecked)
        ? <h1 data-testid="error-msg">Campos inválidos</h1> : ''}
    </>
  );
}

export default Checkout;
