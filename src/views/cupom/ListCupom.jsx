import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Divider,
  Icon,
  Table,
  Modal,
  Header,
} from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";

export default function ListCupom() {
  const [lista, setLista] = useState([]);
  const [modalAberto, setModalAberto] = useState(false);
  const [cupomSelecionado, setCupomSelecionado] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [idRemover, setIdRemover] = useState();

  useEffect(() => {
    carregarLista();
  }, []);

  function confirmaRemover(id) {
    setOpenModal(true);
    setIdRemover(id);
  }

  function carregarLista() {
    axios.get("http://localhost:8080/api/cupom").then((response) => {
      setLista(response.data);
    });
  }

  function abrirModal(cupom) {
    setCupomSelecionado(cupom);
    setModalAberto(true);
  }

  async function remover() {
    await axios
      .delete("http://localhost:8080/api/cupom/" + idRemover)
      .then((response) => {
        console.log("Cupom removido com sucesso.");

        axios.get("http://localhost:8080/api/cupom").then((response) => {
          setLista(response.data);
        });
      })
      .catch((error) => {
        console.log("Erro ao remover o cupom.");
      });
    setOpenModal(false);
  }

  return (
    <div>
      <MenuSistema tela={"cupom"} />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2> Cupom </h2>
          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Button
              label="Novo"
              circular
              color="orange"
              icon="clipboard outline"
              floated="right"
              as={Link}
              to="/form-cupom"
            />

            <br />
            <br />
            <br />
            <Table textAlign="center" color="orange" sortable celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Código</Table.HeaderCell>
                  <Table.HeaderCell>Percentual Desconto</Table.HeaderCell>
                  <Table.HeaderCell>Valor do Desconto</Table.HeaderCell>
                  <Table.HeaderCell>Valor Mínimo Permitido</Table.HeaderCell>
                  <Table.HeaderCell>Quantidade Máxima</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Ações</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {lista.map((cupom) => (
                  <Table.Row key={cupom.id}>
                    <Table.Cell>{cupom.codigoDesconto}</Table.Cell>
                    <Table.Cell>{cupom.percentualDesconto}</Table.Cell>
                    <Table.Cell>{cupom.valorDesconto}</Table.Cell>
                    <Table.Cell>{cupom.valorMinimoPermitido}</Table.Cell>
                    <Table.Cell>{cupom.quantidadeMaximaUso}</Table.Cell>
                    <Table.Cell textAlign="center">
                      <Button
                        inverted
                        circular
                        color="green"
                        title="Clique aqui para editar os dados deste cupom"
                        icon
                      >
                        <Link
                          to="/form-cupom"
                          state={{ id: cupom.id }}
                          style={{ color: "green" }}
                        >
                          {" "}
                          <Icon name="edit" />{" "}
                        </Link>
                      </Button>
                      &nbsp;
                      <Button
                        inverted
                        circular
                        color="red"
                        title="Clique aqui para remover este cupom"
                        icon
                        onClick={(e) => confirmaRemover(cupom.id)}
                      >
                        <Icon name="trash" />
                      </Button>
                      &nbsp;
                      <Button
                        inverted
                        circular
                        color="blue"
                        title="Ver detalhes"
                        icon
                        onClick={() => abrirModal(cupom)}
                      >
                        <Icon name="eye" />
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>

          <Modal
            basic
            onClose={() => setOpenModal(false)}
            onOpen={() => setOpenModal(true)}
            open={openModal}
          >
            <Header icon>
              <Icon name="trash" />
              <div style={{ marginTop: "5%" }}>
                {" "}
                Tem certeza que deseja remover esse registro?{" "}
              </div>
            </Header>
            <Modal.Actions>
              <Button
                basic
                color="red"
                inverted
                onClick={() => setOpenModal(false)}
              >
                <Icon name="remove" /> Não
              </Button>
              <Button color="green" inverted onClick={() => remover()}>
                <Icon name="checkmark" /> Sim
              </Button>
            </Modal.Actions>
          </Modal>

          <Modal
            onClose={() => setModalAberto(false)}
            open={modalAberto}
            size="small"
          >
            <Modal.Header>Detalhes do Cupom</Modal.Header>
            <Modal.Content>
              {cupomSelecionado && (
                <div>
                  <p>
                    <strong>Código:</strong> {cupomSelecionado.codigoDesconto}
                  </p>
                  <p>
                    <strong>Percentual Desconto:</strong>{" "}
                    {cupomSelecionado.percentualDesconto}
                  </p>
                  <p>
                    <strong>Valor do Desconto:</strong>{" "}
                    {cupomSelecionado.valorDesconto}
                  </p>
                  <p>
                    <strong>Valor Mínimo Permitido para o Pedido:</strong>{" "}
                    {cupomSelecionado.valorMinimoPermitido}
                  </p>
                  <p>
                    <strong> Quantidade Máxima de Uso por Cliente :</strong>{" "}
                    {cupomSelecionado.quantidadeMaximaUso}
                  </p>
                  <p>
                    <strong>Início da Vigencia:</strong>{" "}
                    {cupomSelecionado.inicioVigencia}
                  </p>
                  <p>
                    <strong>Fim da Vigencia:</strong>{" "}
                    {cupomSelecionado.fimVigencia}
                  </p>
                </div>
              )}
            </Modal.Content>
            <Modal.Actions>
              <Button color="black" onClick={() => setModalAberto(false)}>
                Fechar
              </Button>
            </Modal.Actions>
          </Modal>
        </Container>
      </div>
    </div>
  );
}
