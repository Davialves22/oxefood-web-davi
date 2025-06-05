import axios from "axios";
import InputMask from "comigo-tech-react-input-mask";
import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";

export default function FormEndereco() {
  const { idCliente } = useParams(); // pegar id do cliente via rota
  const { state } = useLocation();
  const navigate = useNavigate();

  // Estados dos campos de endereço
  const [idEndereco, setIdEndereco] = useState();
  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState(""); // UF
  const [cep, setCep] = useState("");

  useEffect(() => {
    // Se estiver editando endereço, carregar dados
    if (state && state.idEndereco) {
      axios
        .get(`http://localhost:8080/api/enderecocliente/${state.idEndereco}`)
        .then((response) => {
          const e = response.data;
          setIdEndereco(e.id);
          setEndereco(e.endereco);
          setNumero(e.numero);
          setComplemento(e.complemento || "");
          setBairro(e.bairro);
          setCidade(e.cidade);
          setEstado(e.uf); // Backend usa "uf"
          setCep(e.cep);
        })
        .catch(() => {
          console.log("Erro ao carregar endereço");
        });
    }
  }, [state]);

 function salvar() {
  const enderecoRequest = {
    endereco,
    numero,
    complemento,
    bairro,
    cidade,
    uf: estado,
    cep,
    cliente: {
      id: parseInt(idCliente),
    },
  };

  if (idEndereco) {
    // Atualizar endereço
    axios
      .put(`http://localhost:8080/api/enderecocliente/${idEndereco}`, enderecoRequest)
      .then(() => {
        console.log("Endereço alterado com sucesso.");
        navigate("/list-cliente");  // volta pra lista cliente direto
      })
      .catch((error) => {
        // tratamento de erro
      });
  } else {
    // Cadastrar novo endereço
    axios
      .post("http://localhost:8080/api/enderecocliente", enderecoRequest)
      .then(() => {
        console.log("Endereço cadastrado com sucesso.");
        navigate("/list-cliente");  // volta pra lista cliente direto
      })
      .catch((error) => {
        // tratamento de erro
      });
  }
}


  return (
    <div>
      <MenuSistema tela={"endereco"} />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2>
            <span style={{ color: "darkgray" }}>
              Endereço <Icon name="angle double right" size="small" />
            </span>
            {idEndereco ? " Alteração" : " Cadastro"}
          </h2>

          <Divider />

          <Form>
            <Form.Input
              required
              fluid
              label="Endereço"
              maxLength="150"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
            />

            <Form.Group widths="equal">
              <Form.Input
                required
                fluid
                label="Número"
                maxLength="10"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
              />

              <Form.Input
                fluid
                label="Complemento"
                maxLength="50"
                value={complemento}
                onChange={(e) => setComplemento(e.target.value)}
              />
            </Form.Group>

            <Form.Input
              required
              fluid
              label="Bairro"
              maxLength="100"
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
            />

            <Form.Group widths="equal">
              <Form.Input
                required
                fluid
                label="Cidade"
                maxLength="100"
                value={cidade}
                onChange={(e) => setCidade(e.target.value)}
              />

              <Form.Input
                required
                fluid
                label="UF"
                maxLength="2"
                placeholder="Ex: SP"
                value={estado}
                onChange={(e) => setEstado(e.target.value.toUpperCase())}
              />
            </Form.Group>

            <Form.Input fluid label="CEP">
              <InputMask
                mask="99999-999"
                value={cep}
                onChange={(e) => setCep(e.target.value)}
              />
            </Form.Input>
          </Form>

          <div style={{ marginTop: "4%" }}>
            <Button
              inverted
              circular
              icon
              labelPosition="left"
              color="orange"
              onClick={() => navigate("/list-cliente")}
            >
              <Icon name="reply" /> Voltar
            </Button>

            <Button
              inverted
              circular
              icon
              labelPosition="left"
              color="blue"
              floated="right"
              onClick={salvar}
            >
              <Icon name="save" /> Salvar
            </Button>
          </div>
        </Container>
      </div>
    </div>
  );
}
