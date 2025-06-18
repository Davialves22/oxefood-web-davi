import axios from "axios";
import InputMask from "comigo-tech-react-input-mask";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";

export default function FormEndereco() {
  const { idCliente, idEndereco } = useParams();
  const navigate = useNavigate();

  const [endereco, setEndereco] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [estado, setEstado] = useState("");
  const [cep, setCep] = useState("");

  useEffect(() => {
    if (idEndereco) {
      axios
        .get(`http://localhost:8080/api/enderecocliente/${idEndereco}`)
        .then((response) => {
          const e = response.data;
          setEndereco(e.endereco);
          setNumero(e.numero);
          setComplemento(e.complemento || "");
          setBairro(e.bairro);
          setCidade(e.cidade);
          setEstado(e.uf);
          setCep(e.cep);
        })
        .catch(() => {
          toast.error("Erro ao carregar endereço.");
        });
    }
  }, [idEndereco]);

  function atualizarEndereco() {
    const enderecoRequest = {
      endereco,
      numero,
      complemento,
      bairro,
      cidade,
      uf: estado,
      cep,
      clienteId: parseInt(idCliente),
    };

    return axios.put(
      `http://localhost:8080/api/enderecocliente/${idEndereco}`,
      enderecoRequest
    );
  }

  function criarEndereco() {
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

    return axios.post(
      "http://localhost:8080/api/enderecocliente",
      enderecoRequest
    );
  }

  function salvar() {
    const request = idEndereco ? atualizarEndereco() : criarEndereco();

    const sucessoMsg = idEndereco
      ? "Endereço alterado com sucesso."
      : "Endereço cadastrado com sucesso.";

    const erroMsg = idEndereco
      ? "Erro ao atualizar o endereço."
      : "Erro ao cadastrar o endereço.";

    request
      .then(() => {
        toast.success(sucessoMsg);
        navigate("/list-cliente");
      })
      .catch(() => {
        toast.error(erroMsg);
      });
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
