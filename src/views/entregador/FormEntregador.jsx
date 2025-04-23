import React, { Component, useState } from "react";
import InputMask from "comigo-tech-react-input-mask";
import {
  Button,
  Container,
  Divider,
  Form,
  Icon,
  FormSelect,
  FormRadio,
} from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";
import axios from "axios";

const options = [
  { key: "", text: "", value: "" },
  { key: "P", text: "Pernambuco", value: "PE" },
  { key: "S", text: "São Paulo", value: "SP" },
  { key: "C", text: "Santa Catarina", value: "SC" },
];

const [nome, setNome] = useState();
const [cpf, setCpf] = useState();
const [rg, setRg] = useState();
const [dataNascimento, setDataNascimento] = useState();
const [foneCelular, setFoneCelular] = useState();
const [foneFixo, setFoneFixo] = useState();
const [entregasRealizadas, setEntregasRealizadas] = useState();
const [valorPorFrete, setValorPorFrete] = useState();
const [rua, setRua] = useState();
const [numero, setNumero] = useState();
const [bairro, setBairro] = useState();
const [cidade, setCidade] = useState();
const [cep, setCep] = useState();
const [estado, setEstado] = useState();
const [complemento, setComplemento] = useState();
const [ativo, setAtivo] = useState(true);

function salvar() {
  let clienteRequest = {
    nome: nome,
    cpf: cpf,
    dataNascimento: dataNascimento,
    foneCelular: foneCelular,
    foneFixo: foneFixo,
  };

  axios
    .post("http://localhost:8080/api/entregador", clienteRequest)
    .then((response) => {
      console.log("Cliente cadastrado com sucesso.");
    })
    .catch((error) => {
      console.log("Erro ao incluir o um cliente.");
    });
}

class FormEntregador extends Component {
  state = {};

  handleChange = (e, { value }) => this.setState({ value });

  render() {
    const { value } = this.state;

    return (
      <div>
        <MenuSistema tela={"entregador"} />
        <div style={{ marginTop: "3%" }}>
          <Container textAlign="justified">
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                Entregador &nbsp;
                <Icon name="angle double right" size="small" />{" "}
              </span>{" "}
              Cadastro{" "}
            </h2>

            <Divider />

            <div style={{ marginTop: "4%" }}>
              <Form>
                {/* Informações Pessoais 1*/}
                <Form.Group widths="equal">
                  <Form.Input
                    required
                    width={8}
                    label="Nome"
                    maxLength="100"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />

                  <Form.Input required width={3} label="CPF">
                    <InputMask
                      required
                      mask="999.999.999-99"
                      value={cpf}
                      onChange={(e) => setCpf(e.target.value)}
                    />
                  </Form.Input>

                  <Form.Input width={3} label="RG">
                    <InputMask
                      required
                      mask="99.999.999"
                      value={rg}
                      onChange={(e) => setRg(e.target.value)}
                    />
                  </Form.Input>
                </Form.Group>

                {/* Informações Pessoais2 */}
                <Form.Group widths="equal">
                  <Form.Input
                    width={2}
                    label="DT Nascimento"
                    placeholder="EX: 20/03/1985"
                  >
                    <InputMask
                      required
                      mask="00/00/0000"
                      value={dataNascimento}
                      onChange={(e) => setDataNascimento(e.target.value)}
                    />
                  </Form.Input>

                  <Form.Input required width={3} label="Fone Celular">
                    <InputMask
                      required
                      mask="(00) 00000-0000"
                      value={foneCelular}
                      onChange={(e) => setFoneCelular(e.target.value)}
                    />
                  </Form.Input>

                  <Form.Input width={3} label="Fone Fixo">
                    <InputMask
                      required
                      mask="(00) 00000-0000"
                      value={foneFixo}
                      onChange={(e) => setFoneFixo(e.target.value)}
                    />
                  </Form.Input>

                  <Form.Input width={3} label="QTD Entregas Realizadas" />

                  <Form.Input width={3} label="Valor Por Frete">
                    <InputMask
                      required
                      mask="R$"
                      value={valorPorFrete}
                      onChange={(e) => setValorPorFrete(e.target.value)}
                    />
                  </Form.Input>
                </Form.Group>

                {/* RUA*/}
                <Form.Group widths="equal">
                  <Form.Input
                    width={12}
                    label="Rua"
                    value={rua}
                    onChange={(e) => setRua(e.target.value)}
                  />

                  <Form.Input
                    required
                    width={3}
                    label="Número"
                    value={numero}
                    onChange={(e) => setNumero(e.target.value)}
                  />
                </Form.Group>

                {/* Bairro */}
                <Form.Group widths="equal">
                  <Form.Input
                    width={10}
                    label="Bairro"
                    value={bairro}
                    onChange={(e) => setBairro(e.target.value)}
                  />

                  <Form.Input
                    width={10}
                    label="Cidade"
                    value={cidade}
                    onChange={(e) => setCidade(e.target.value)}
                  />

                  <Form.Input required width={3} label="CEP">
                    <InputMask
                      required
                      mask="00000-000"
                      value={cep}
                      onChange={(e) => setCep(e.target.value)}
                    />
                  </Form.Input>
                </Form.Group>

                {/* UF */}
                <Form.Group>
                  <FormSelect
                    width={16}
                    label="UF"
                    options={options}
                    placeholder=" "
                  />
                </Form.Group>

                <Form.Input required fluid label="Complemento" maxLengt="50" />

                <Form.Group widths="">
                  <label>
                    <b>Ativo:</b>
                  </label>
                  <Form.Radio
                    label="Sim"
                    checked={ativo}
                    onChange={(e) => setAtivo(true)}
                  />

                  <Form.Radio
                    label="Sim"
                    checked={ativo}
                    onChange={(e) => setAtivo(true)}
                  />
                </Form.Group>
              </Form>

              <div style={{ marginTop: "4%" }}>
                <Button
                  type="button"
                  inverted
                  circular
                  icon
                  labelPosition="left"
                  color="orange"
                >
                  <Icon name="reply" />
                  Voltar
                </Button>

                <Button
                  inverted
                  circular
                  icon
                  labelPosition="left"
                  color="blue"
                  floated="right"
                >
                  <Icon name="save" />
                  Salvar
                </Button>
              </div>
            </div>
          </Container>
        </div>
      </div>
    );
  }
}

export default FormEntregador;
