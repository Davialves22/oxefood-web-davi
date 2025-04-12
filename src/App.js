import './App.css';
import { Segment } from 'semantic-ui-react';
import FormCliente from './views/cliente/FormCLiente';

function App() {
  return (
    <div className="App">

      <FormCliente/>

      <div style={{ marginTop: '6%' }}>
        <Segment vertical color='grey' size='tiny' textAlign='center'>
          &copy; 2023 - Projeto WEB III - IFPE Jaboatão dos Guararapes;
        </Segment>
      </div>

    </div>
  );
}

export default App;
