import React, { useEffect, useState } from "react";
import InputMask from "comigo-tech-react-input-mask";
import { Button, Container, Divider, Form, Icon } from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";

export default function FormCupom() {
  const { state } = useLocation();
  const [idCupom, setIdCupom] = useState();

  const [codigoDesconto, setCodigoDesconto] = useState();
  const [percentualDesconto, setPercentualDesconto] = useState();
  const [valorDesconto, setValorDesconto] = useState("");
  const [valorMinimoPermitido, setValorMinimoPermitido] = useState();
  const [quantidadeMaximaUso, setQuantidadeMaximaUso] = useState();
  const [inicioVigencia, setInicioVigencia] = useState();
  const [fimVigencia, setFimVigencia] = useState();

  useEffect(() => {
    console.log("state recebido:", state);
    if (state != null && state.id != null) {
      axios
        .get("http://localhost:8080/api/cupom/" + state.id)
        .then((response) => {
          setIdCupom(response.data.id);
          setCodigoDesconto(response.data.codigoDesconto);
          setPercentualDesconto(response.data.percentualDesconto);
          setValorDesconto(response.data.valorDesconto);
          setValorMinimoPermitido(response.data.valorMinimoPermitido);
          setQuantidadeMaximaUso(response.data.quantidadeMaximaUso);
          setInicioVigencia(formatarData(response.data.inicioVigencia));
          setFimVigencia(formatarData(response.data.fimVigencia));
        });
    }
  }, [state]);

  function salvar() {
    console.log("ID do cupom no salvar():", idCupom);

    let cupomRequest = {
      codigoDesconto: codigoDesconto,
      percentualDesconto: percentualDesconto,
      valorDesconto: valorDesconto,
      valorMinimoPermitido: valorMinimoPermitido,
      quantidadeMaximaUso: quantidadeMaximaUso,
      inicioVigencia: inicioVigencia,
      fimVigencia: fimVigencia,
    };

    if (idCupom != null) {
      //Alteração:
      axios
        .put("http://localhost:8080/api/cupom/" + idCupom, cupomRequest)
        .then((response) => {
          console.log("Cupom alterado com sucesso.");
        })
        .catch((error) => {
          console.log("Erro ao alterar o Cupom.");
        });
    } else {
      //Cadastro:
      axios
        .post("http://localhost:8080/api/cupom", cupomRequest)
        .then((response) => {
          console.log("Cupom cadastrado com sucesso.");
        })
        .catch((error) => {
          console.log("Erro ao incluir o cupom.");
        });
    }
  }

  function formatarData(dataParam) {
    if (dataParam === null || dataParam === "" || dataParam === undefined) {
      return "";
    }

    let arrayData = dataParam.split("-");
    return arrayData[2] + "/" + arrayData[1] + "/" + arrayData[0];
  }

  return (
    <div>
      <MenuSistema tela={"cupom"} />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          {idCupom === undefined && (
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                Cupom &nbsp;
                <Icon name="angle double right" size="small" />{" "}
              </span>{" "}
              Cadastro
            </h2>
          )}
          {idCupom != undefined && (
            <h2>
              {" "}
              <span style={{ color: "darkgray" }}>
                {" "}
                Cupom &nbsp;
                <Icon name="angle double right" size="small" />{" "}
              </span>{" "}
              Alteração
            </h2>
          )}

          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Form>
              <Form.Group widths="equal">
                <Form.Input
                  required
                  fluid
                  label="Código"
                  maxLength="100"
                  value={codigoDesconto}
                  onChange={(e) => setCodigoDesconto(e.target.value)}
                />

                <Form.Input required fluid label="Percentual Desconto">
                  <InputMask
                    required
                    mask="99%"
                    value={percentualDesconto}
                    onChange={(e) => setPercentualDesconto(e.target.value)}
                  />
                </Form.Input>
              </Form.Group>

              <Form.Group>
                <Form.Input fluid label="Valor do Desconto" width={6}>
                  <InputMask
                    mask="R$99,99"
                    value={valorDesconto}
                    onChange={(e) => setValorDesconto(e.target.value)}
                  />
                </Form.Input>

                <Form.Input
                  fluid
                  label="Valor Mínimo Permitido para o Pedido"
                  width={6}
                >
                  <InputMask
                    mask="R$99,99"
                    value={valorMinimoPermitido}
                    onChange={(e) => setValorMinimoPermitido(e.target.value)}
                  />
                </Form.Input>

                <Form.Input
                  fluid
                  label="Quantidade Máxima de Uso por Cliente"
                  maxLength="100"
                  width={6}
                  value={quantidadeMaximaUso}
                  onChange={(e) => setQuantidadeMaximaUso(e.target.value)}
                ></Form.Input>
              </Form.Group>

              <Form.Group widths="equal">
                <Form.Field width={6} label="Início da Vigencia">
                  <InputMask
                    mask="99/99/9999"
                    maskChar={null}
                    placeholder="Ex: 20/03/1985"
                    value={inicioVigencia}
                    onChange={(e) => setInicioVigencia(e.target.value)}
                  />
                </Form.Field>

                <Form.Field width={6} label="Fim da Vigencia">
                  <InputMask
                    mask="99/99/9999"
                    maskChar={null}
                    placeholder="Ex: 20/03/1985"
                    value={fimVigencia}
                    onChange={(e) => setFimVigencia(e.target.value)}
                  />
                </Form.Field>
              </Form.Group>
            </Form>

            <div style={{ marginTop: "4%" }}>
              <Link to={"/list-cupom"}>
                <Button
                  inverted
                  circular
                  icon
                  labelPosition="left"
                  color="orange"
                >
                  <Icon name="reply" /> Voltar
                </Button>
              </Link>

              <Button
                inverted
                circular
                icon
                labelPosition="left"
                color="blue"
                floated="right"
                onClick={() => salvar()}
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
