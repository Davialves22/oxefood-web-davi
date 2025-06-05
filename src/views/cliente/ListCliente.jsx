import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Divider,
  Dropdown,
  Icon,
  Modal,
  Popup,
  Table,
} from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";

export default function ListCliente() {
  const [lista, setLista] = useState([]);
  const [enderecos, setEnderecos] = useState({}); // endereços por cliente id
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
    axios.get("http://localhost:8080/api/cliente").then((response) => {
      setLista(response.data);
    });
  }

  function carregarEnderecos(idCliente) {
    // Se já carregou endereços para esse cliente, não recarrega
    if (enderecos[idCliente]) return;

    axios
      .get(`http://localhost:8080/api/cliente/${idCliente}/enderecos`)
      .then((response) => {
        setEnderecos((prev) => ({ ...prev, [idCliente]: response.data }));
      })
      .catch(() => {
        setEnderecos((prev) => ({ ...prev, [idCliente]: [] }));
      });
  }

  function formatarData(dataParam) {
    if (!dataParam) return "";

    const arrayData = dataParam.split("-");
    if (arrayData.length !== 3) return dataParam;

    return `${arrayData[2]}/${arrayData[1]}/${arrayData[0]}`;
  }

  async function remover() {
    await axios
      .delete("http://localhost:8080/api/cliente/" + idRemover)
      .then(() => {
        carregarLista();
      })
      .catch(() => {
        console.log("Erro ao remover um cliente.");
      });
    setOpenModal(false);
  }

  return (
    <div>
      <MenuSistema tela={"cliente"} />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2> Cliente </h2>
          <Divider />

          <div style={{ marginTop: "4%" }}>
            <Button
              label="Novo"
              circular
              color="orange"
              icon="clipboard outline"
              floated="right"
              as={Link}
              to="/form-cliente"
            />

            <br />
            <br />
            <br />
            <Table textAlign="center" color="orange" sortable celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Nome</Table.HeaderCell>
                  <Table.HeaderCell>CPF</Table.HeaderCell>
                  <Table.HeaderCell>Data de Nascimento</Table.HeaderCell>
                  <Table.HeaderCell>Fone Celular</Table.HeaderCell>
                  <Table.HeaderCell>Fone Fixo</Table.HeaderCell>
                  <Table.HeaderCell>Endereços</Table.HeaderCell>
                  <Table.HeaderCell textAlign="center">Ações</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {lista.map((cliente) => (
                  <Table.Row key={cliente.id}>
                    <Table.Cell>{cliente.nome}</Table.Cell>
                    <Table.Cell>{cliente.cpf}</Table.Cell>
                    <Table.Cell>
                      {formatarData(cliente.dataNascimento)}
                    </Table.Cell>
                    <Table.Cell>{cliente.foneCelular}</Table.Cell>
                    <Table.Cell>{cliente.foneFixo}</Table.Cell>
                    <Table.Cell>
                      <Dropdown
                        pointing="top left"
                        className="button icon"
                        floating
                        labeled
                        button
                        color="teal"
                        icon="map marker alternate"
                        onClick={() => carregarEnderecos(cliente.id)}
                        text="Endereços"
                        style={{ minWidth: "160px" }}
                      >
                        <Dropdown.Menu>
                          <Dropdown.Header content="Endereços cadastrados" />
                          {enderecos[cliente.id] ? (
                            enderecos[cliente.id].filter(
                              (end) =>
                                end.endereco && end.endereco.trim() !== ""
                            ).length > 0 ? (
                              enderecos[cliente.id]
                                .filter(
                                  (end) =>
                                    end.endereco && end.endereco.trim() !== ""
                                )
                                .map((end, idx) => (
                                  <Dropdown.Item
                                    key={idx}
                                    icon="home"
                                    text={`${end.endereco}, ${end.numero}`}
                                  >
                                    <Popup
                                      content={`${end.endereco}, ${end.numero} - ${end.bairro}, ${end.cidade} - ${end.uf}`}
                                      position="right center"
                                      trigger={
                                        <span
                                          style={{
                                            cursor: "pointer",
                                            width: "100%",
                                          }}
                                        />
                                      }
                                    />
                                  </Dropdown.Item>
                                ))
                            ) : (
                              <Dropdown.Item>
                                <Button
                                  fluid
                                  color="blue"
                                  icon
                                  labelPosition="right"
                                  size="small"
                                  as={Link}
                                  to={`/form-endereco/${cliente.id}`}
                                  style={{ fontWeight: "bold" }}
                                >
                                  <Icon name="plus circle" />
                                  Cadastrar endereço
                                </Button>
                              </Dropdown.Item>
                            )
                          ) : (
                            <Dropdown.Item>
                              <Button
                                fluid
                                color="blue"
                                icon
                                labelPosition="right"
                                size="small"
                                as={Link}
                                to={`/form-endereco/${cliente.id}`}
                                style={{ fontWeight: "bold" }}
                              >
                                <Icon name="plus circle" />
                                Cadastrar endereço
                              </Button>
                            </Dropdown.Item>
                          )}
                        </Dropdown.Menu>
                      </Dropdown>
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      <Button
                        inverted
                        circular
                        color="green"
                        title="Editar dados deste cliente"
                        icon
                        as={Link}
                        to="/form-cliente"
                        state={{ id: cliente.id }}
                      >
                        <Icon name="edit" />
                      </Button>
                      &nbsp;
                      <Button
                        inverted
                        circular
                        color="red"
                        title="Remover este cliente"
                        icon
                        onClick={() => confirmaRemover(cliente.id)}
                      >
                        <Icon name="trash" />
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </Container>
      </div>

      <Modal
        basic
        onClose={() => setOpenModal(false)}
        onOpen={() => setOpenModal(true)}
        open={openModal}
      >
        <Modal.Header>
          <Icon name="trash" />
          &nbsp;Tem certeza que deseja remover esse registro?
        </Modal.Header>
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
    </div>
  );
}
