import React, { Component } from "react";
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

const options = [
  { key: "", text: "", value: "" },
  { key: "P", text: "PE", value: "pe" },
  { key: "S", text: "SP", value: "sp" },
  { key: "C", text: "SC", value: "sc" },
];

class FormEntregador extends Component {
  state = {};

  handleChange = (e, { value }) => this.setState({ value });

  render() {
    const { value } = this.state;

    return (
      <div>
        <div style={{ marginTop: "3%" }}>
          <Container textAlign="justified">
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                Produto &nbsp;
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
                    width={10}
                    label="Nome"
                    maxLength="100"
                  />

                  <Form.Input required width={3} label="CPF">
                    <InputMask required mask="999.999.999-99" />
                  </Form.Input>

                  <Form.Input width={3} label="RG">
                    <InputMask required mask="99.999.999" />
                  </Form.Input>
                </Form.Group>

                {/* Informações Pessoais2 */}
                <Form.Group widths="equal">
                  <Form.Input
                    width={10}
                    label="DT Nascimento"
                    placeholder="EX: 20/03/1985"
                  >
                    <InputMask required mask="00/00/0000" />
                  </Form.Input>

                  <Form.Input required width={3} label="Fone Celular">
                    <InputMask required mask="(00) 00000-0000" />
                  </Form.Input>

                  <Form.Input width={3} label="Fone Fixo">
                    <InputMask required mask="(00) 00000-0000" />
                  </Form.Input>

                  <Form.Input width={3} label="QTD Entregas Realizadas" />

                  <Form.Input width={3} label="Valor Por Frete">
                    <InputMask required mask="R$ 999,99" />
                  </Form.Input>
                </Form.Group>

                {/* RUA*/}
                <Form.Group widths="equal">
                  <Form.Input width={10} label="Rua" />

                  <Form.Input required width={3} label="Número" />
                </Form.Group>

                {/* Bairro */}
                <Form.Group widths="equal">
                  <Form.Input width={10} label="Bairro" />

                  <Form.Input width={10} label="Cidade" />

                  <Form.Input required width={3} label="CEP">
                    <InputMask required mask="00000-000" />
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

                <Form.Group widths="equal">
                  <label><b>Ativo:</b></label>
                  <FormRadio
                    label="Sim"
                    value="sm"
                    checked={value === "sm"}
                    onChange={this.handleChange}
                  />
                  <FormRadio
                    label="Não"
                    value="nn"
                    checked={value === "nn"}
                    onChange={this.handleChange}
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
