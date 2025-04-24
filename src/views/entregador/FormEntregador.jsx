import React, { useState } from "react";
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

const FormEntregador = () => {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [rg, setRg] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [foneCelular, setFoneCelular] = useState("");
  const [foneFixo, setFoneFixo] = useState("");
  const [qtdEntregasRealizadas, setQtdEntregasRealizadas] = useState("");
  const [valorFrete, setValorFrete] = useState("");
  const [enderecoRua, setEnderecoRua] = useState("");
  const [enderecoNumero, setEnderecoNumero] = useState("");
  const [enderecoBairro, setEnderecoBairro] = useState("");
  const [enderecoCidade, setEnderecoCidade] = useState("");
  const [enderecoCep, setEnderecoCep] = useState("");
  const [enderecoUf, setEnderecoUf] = useState("");
  const [enderecoComplemento, setEnderecoComplemento] = useState("");
  const [ativo, setAtivo] = useState(true);

  const salvar = () => {
    const entregadorRequest = {
      nome: nome,
      cpf: cpf,
      rg: rg,
      dataNascimento: dataNascimento,
      foneCelular: foneCelular,
      foneFixo: foneFixo,
      qtdEntregasRealizadas: qtdEntregasRealizadas,
      valorFrete: valorFrete,
      enderecoRua: enderecoRua,
      enderecoNumero: enderecoNumero,
      enderecoBairro: enderecoBairro,
      enderecoCidade: enderecoCidade,
      enderecoCep: enderecoCep,
      enderecoUf: enderecoUf,
      enderecoComplemento: enderecoComplemento,
      ativo: ativo,
    };

    axios
      .post("http://localhost:8080/api/entregador", entregadorRequest)
      .then((response) => {
        console.log("Entregador cadastrado com sucesso.");
      })
      .catch((error) => {
        console.log("Erro ao incluir o Entregador.");
      });
  };

  return (
    <div>
      <MenuSistema tela={"entregador"} />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2>
            <span style={{ color: "darkgray" }}>
              Entregador &nbsp;
              <Icon name="angle double right" size="small" />{" "}
            </span>{" "}
            Cadastro
          </h2>

          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Form>
              {/* Informações Pessoais 1 */}
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

              {/* Informações Pessoais 2 */}
              <Form.Group widths="equal">
                <Form.Input fluid label="Data Nascimento" width={6}>
                  <InputMask
                    mask="99/99/9999"
                    maskChar={null}
                    placeholder="Ex: 20/03/1985"
                    value={dataNascimento}
                    onChange={(e) => setDataNascimento(e.target.value)}
                  />
                </Form.Input>

                <Form.Input required width={3} label="Fone Celular">
                  <InputMask
                    required
                    mask="(99) 99999-9999"
                    value={foneCelular}
                    onChange={(e) => setFoneCelular(e.target.value)}
                  />
                </Form.Input>

                <Form.Input width={3} label="Fone Fixo">
                  <InputMask
                    required
                    mask="(99) 99999-9999"
                    value={foneFixo}
                    onChange={(e) => setFoneFixo(e.target.value)}
                  />
                </Form.Input>

                <Form.Input
                  width={3}
                  label="QTD Entregas Realizadas"
                  value={qtdEntregasRealizadas}
                  onChange={(e) => setQtdEntregasRealizadas(e.target.value)}
                />

                <Form.Input width={3} label="Valor Por Frete">
                  <InputMask
                    required
                    mask="R$99,99"
                    value={valorFrete}
                    onChange={(e) => setValorFrete(e.target.value)}
                  />
                </Form.Input>
              </Form.Group>

              {/* RUA */}
              <Form.Group widths="equal">
                <Form.Input
                  width={12}
                  label="Rua"
                  value={enderecoRua}
                  onChange={(e) => setEnderecoRua(e.target.value)}
                />

                <Form.Input
                  required
                  width={3}
                  label="Número"
                  value={enderecoNumero}
                  onChange={(e) => setEnderecoNumero(e.target.value)}
                />
              </Form.Group>

              {/* Bairro */}
              <Form.Group widths="equal">
                <Form.Input
                  width={10}
                  label="Bairro"
                  value={enderecoBairro}
                  onChange={(e) => setEnderecoBairro(e.target.value)}
                />

                <Form.Input
                  width={10}
                  label="Cidade"
                  value={enderecoCidade}
                  onChange={(e) => setEnderecoCidade(e.target.value)}
                />

                <Form.Input required width={3} label="CEP">
                  <InputMask
                    required
                    mask="99999-999"
                    value={enderecoCep}
                    onChange={(e) => setEnderecoCep(e.target.value)}
                  />
                </Form.Input>
              </Form.Group>

              {/* UF */}
              <Form.Group>
                <FormSelect
                  width={16}
                  label="UF"
                  options={options}
                  placeholder="Selecione o estado"
                  value={enderecoUf}
                  onChange={(e, { value }) => setEnderecoUf(value)}
                />
              </Form.Group>

              <Form.Input
                required
                fluid
                label="Complemento"
                maxLength="50"
                value={enderecoComplemento}
                onChange={(e) => setEnderecoComplemento(e.target.value)}
              />

              <Form.Group widths="">
                <label>
                  <b>Ativo:</b>
                </label>
                <FormRadio
                  label="Sim"
                  checked={ativo}
                  onChange={() => setAtivo(true)}
                />

                <FormRadio
                  label="Não"
                  checked={!ativo}
                  onChange={() => setAtivo(false)}
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
                onClick={salvar}
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
};

export default FormEntregador;
