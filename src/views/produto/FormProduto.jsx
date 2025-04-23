import React from "react";
import InputMask from "comigo-tech-react-input-mask";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";

export default function FormProduto() {
  return (
    <div>
      <MenuSistema tela={"produto"} />
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
              <Form.Group widths="equal">
                <Form.Input
                  required
                  width={10}
                  label="Título"
                  maxLength="100"
                />

                <Form.Input required width={3} label="Código do Produto">
                  <InputMask required mask="999.999.999-99" />
                </Form.Input>
              </Form.Group>

              <Form.Group widths="equal">
                <Form.TextArea
                  required
                  fluid
                  label="Descrição"
                  placeholder=""
                  maxLength="500"
                />
              </Form.Group>

              <Form.Group>
                <Form.Input
                  required
                  width={6}
                  label="Valor Unitário"
                  maxLengt="50"
                ></Form.Input>

                <Form.Input
                  required
                  width={6}
                  label="Tempo de Entrega em Minutos"
                  maxLengt="50"
                />

                <Form.Input
                  required
                  width={6}
                  label="Tempo de Entrega Máximo em Minutos"
                  maxLengt="50"
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
