import { Route, Routes } from "react-router-dom";

import FormCliente from "./views/cliente/FormCLiente";
import FormEndereco from "./views/cliente/FormEndereço";
import ListCliente from "./views/cliente/ListCliente";
import FormCupom from "./views/cupom/FormCupom";
import ListCupom from "./views/cupom/ListCupom";
import FormEntregador from "./views/entregador/FormEntregador";
import ListEntregador from "./views/entregador/ListEntregador";
import Home from "./views/home/Home";
import FormProduto from "./views/produto/FormProduto";
import ListProduto from "./views/produto/ListProduto";

function Rotas() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="form-cliente" element={<FormCliente />} />
        <Route path="list-cliente" element={<ListCliente />} />

        <Route path="form-produto" element={<FormProduto />} />
        <Route path="list-produto" element={<ListProduto />} />

        <Route path="form-entregador" element={<FormEntregador />} />
        <Route path="list-entregador" element={<ListEntregador />} />

        <Route path="form-cupom" element={<FormCupom />} />
        <Route path="list-cupom" element={<ListCupom />} />
        <Route
          path="form-endereco/:idCliente/:idEndereco?"
          element={<FormEndereco />}
        />
      </Routes>
    </>
  );
}

export default Rotas;
