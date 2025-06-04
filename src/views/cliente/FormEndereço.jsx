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
  const [estado, setEstado] = useState("");
  const [cep, setCep] = useState("");

  useEffect(() => {
    // Se estiver editando endereço, carregar dados
    if (state && state.idEndereco) {
      axios
        .get(`http://localhost:8080/api/cliente/${idCliente}/endereco/${state.idEndereco}`)
        .then((response) => {
          const e = response.data;
          setIdEndereco(e.id);
          setEndereco(e.endereco);
          setNumero(e.numero);
          setComplemento(e.complemento || "");
          setBairro(e.bairro);
          setCidade(e.cidade);
          setEstado(e.estado);
          setCep(e.cep);
        })
        .catch(() => {
          console.log("Erro ao carregar endereço");
        });
    }
  }, [idCliente, state]);

  function salvar() {
  const enderecoRequest = {
    endereco,
    numero,
    complemento,
    bairro,
    cidade,
    estado,
    cep,
  };

  if (idEndereco) {
    // Atualizar endereço
    axios
      .put(`http://localhost:8080/api/cliente/${idCliente}/endereco/${idEndereco}`, enderecoRequest)
      .then(() => {
        console.log("Endereço alterado com sucesso.");
        navigate(`/cliente/${idCliente}`);
      })
      .catch((error) => {
        if (error.response) {
          // Erro com resposta do servidor (status, dados, headers)
          console.error('Erro na resposta do servidor:', error.response.status);
          console.error('Dados do erro:', error.response.data);
          console.error('Headers:', error.response.headers);
        } else if (error.request) {
          // Requisição enviada mas sem resposta
          console.error('Requisição enviada mas sem resposta:', error.request);
        } else {
          // Erro na configuração da requisição
          console.error('Erro ao configurar requisição:', error.message);
        }
        console.error('Config da requisição:', error.config);
      });
  } else {
    // Novo endereço
    axios
      .post(`http://localhost:8080/api/cliente/${idCliente}/endereco`, enderecoRequest)
      .then(() => {
        console.log("Endereço cadastrado com sucesso.");
        navigate(`/cliente/${idCliente}`);
      })
      .catch((error) => {
        if (error.response) {
          console.error('Erro na resposta do servidor:', error.response.status);
          console.error('Dados do erro:', error.response.data);
          console.error('Headers:', error.response.headers);
        } else if (error.request) {
          console.error('Requisição enviada mas sem resposta:', error.request);
        } else {
          console.error('Erro ao configurar requisição:', error.message);
        }
        console.error('Config da requisição:', error.config);
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
                label="Estado"
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
