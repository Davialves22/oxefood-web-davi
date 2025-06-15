import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Divider,
  Icon,
  List,
  Modal,
  Table
} from "semantic-ui-react";
import MenuSistema from "../../MenuSistema";

export default function ListCliente() {
  const [lista, setLista] = useState([]);
  const [enderecos, setEnderecos] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [openEnderecoModal, setOpenEnderecoModal] = useState(false);
  const [clienteSelecionado, setClienteSelecionado] = useState(null);
  const [idRemover, setIdRemover] = useState();

  useEffect(() => {
    carregarLista();
  }, []);

  function carregarLista() {
    axios.get("http://localhost:8080/api/cliente").then((response) => {
      setLista(response.data);
    });
  }

  function carregarEnderecos(idCliente) {
    axios
      .get(`http://localhost:8080/api/enderecocliente/por-cliente/${idCliente}`)
      .then((response) => {
        setEnderecos((prev) => ({ ...prev, [idCliente]: response.data }));
      })
      .catch(() => {
        setEnderecos((prev) => ({ ...prev, [idCliente]: [] }));
      });
  }

  function abrirModalEnderecos(cliente) {
    setClienteSelecionado(cliente);
    carregarEnderecos(cliente.id);
    setOpenEnderecoModal(true);
  }

  function confirmaRemover(id) {
    setOpenModal(true);
    setIdRemover(id);
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

  function formatarData(dataParam) {
    if (!dataParam) return "";
    const arrayData = dataParam.split("-");
    if (arrayData.length !== 3) return dataParam;
    return `${arrayData[2]}/${arrayData[1]}/${arrayData[0]}`;
  }

  return (
    <div>
      <MenuSistema tela={"cliente"} />
      <div style={{ marginTop: "3%" }}>
        <Container textAlign="justified">
          <h2>Cliente</h2>
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
                  <Table.HeaderCell>Ações</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {lista.map((cliente) => (
                  <Table.Row key={cliente.id}>
                    <Table.Cell>{cliente.nome}</Table.Cell>
                    <Table.Cell>{cliente.cpf}</Table.Cell>
                    <Table.Cell>{formatarData(cliente.dataNascimento)}</Table.Cell>
                    <Table.Cell>{cliente.foneCelular}</Table.Cell>
                    <Table.Cell>{cliente.foneFixo}</Table.Cell>
                    <Table.Cell>
                      <Button
                        icon
                        color="teal"
                        labelPosition="left"
                        onClick={() => abrirModalEnderecos(cliente)}
                      >
                        <Icon name="map marker alternate" />
                        Ver Endereços
                      </Button>
                    </Table.Cell>
                    <Table.Cell textAlign="center">
                      <Button
                        inverted
                        circular
                        color="green"
                        icon
                        title="Editar dados deste cliente"
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
                        icon
                        title="Remover este cliente"
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

      {/* Modal de confirmação de remoção */}
      <Modal
        basic
        onClose={() => setOpenModal(false)}
        open={openModal}
        size="small"
      >
        <Modal.Header>
          <Icon name="trash" />
          Tem certeza que deseja remover esse registro?
        </Modal.Header>
        <Modal.Actions>
          <Button basic color="red" inverted onClick={() => setOpenModal(false)}>
            <Icon name="remove" /> Não
          </Button>
          <Button color="green" inverted onClick={() => remover()}>
            <Icon name="checkmark" /> Sim
          </Button>
        </Modal.Actions>
      </Modal>

      {/* Modal com endereços do cliente */}
      <Modal
        onClose={() => setOpenEnderecoModal(false)}
        open={openEnderecoModal}
        size="tiny"
      >
        <Modal.Header>Endereços de {clienteSelecionado?.nome}</Modal.Header>
        <Modal.Content scrolling>
          <List divided relaxed>
            {enderecos[clienteSelecionado?.id]?.length > 0 ? (
              enderecos[clienteSelecionado.id].map((end, idx) => (
                <List.Item key={idx}>
                  <List.Icon name="home" size="large" verticalAlign="middle" />
                  <List.Content>
                    <List.Header>
                      {end.endereco}, {end.numero}
                    </List.Header>
                    <List.Description>
                      {end.bairro}, {end.cidade} - {end.uf}, {end.cep}
                    </List.Description>
                  </List.Content>
                </List.Item>
              ))
            ) : (
              <p>Nenhum endereço cadastrado.</p>
            )}
          </List>
        </Modal.Content>
        <Modal.Actions>
          <Button
            color="blue"
            as={Link}
            to={`/form-endereco/${clienteSelecionado?.id}`}
          >
            <Icon name="plus" /> Cadastrar novo endereço
          </Button>
          <Button onClick={() => setOpenEnderecoModal(false)}>
            Fechar
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
}
