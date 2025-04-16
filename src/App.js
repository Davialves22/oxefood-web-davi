import './App.css';
import { Segment } from 'semantic-ui-react';
import FormCliente from './views/cliente/FormCLiente';
import FormProduto from './views/produto/FormProduto';
import FormEntregador from './views/entregador/FormEntregador';

function App() {
  return (
    <div className="App">

      <FormProduto/>

      <div style={{ marginTop: '6%' }}>
        <Segment vertical color='grey' size='tiny' textAlign='center'>
          &copy; 2023 - Projeto WEB III - IFPE Jaboatão dos Guararapes;
        </Segment>
      </div>

    </div>
  );
}

export default App;
