import { useState } from "react";
import { Row, Col, Card, Modal, Input } from "antd";

function Dashboard() {
  const [dogs, setDogs] = useState([]);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [weight, setWeight] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const addDog = () => {
    const newDog = {
      id: Date.now(),
      name: name,
    };

    setDogs([...dogs, newDog]);
    setOpen(false);
    setName("");
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        {dogs.map((dog) => (
          <Col key={dog.id}>
            <Card title={dog.name} style={{ width: 290, height: 150 }} />
          </Col>
        ))}

        <Col>
          <Card
            hoverable
            onClick={() => setOpen(true)}
            style={{
              width: 290,
              height: 150,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: 40,
            }}
            bodyStyle={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            +
          </Card>
        </Col>
      </Row>

      <Modal
        title="Новая собака"
        open={open}
        onOk={addDog}
        onCancel={() => setOpen(false)}
      >
        <Input
          placeholder="Имя собаки"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ marginBottom: 10, marginTop: 21 }}
        />

        <Input
          placeholder="Порода"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
          style={{ marginBottom: 10 }}
        />

        <Input
          placeholder="Вес"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          style={{ marginBottom: 10 }}
        />

        <Input
          placeholder="Дата рождения"
          value={birthdate}
          onChange={(e) => setBirthdate(e.target.value)}
          style={{ marginBottom: 10 }}
        />
      </Modal>
    </>
  );
}

export default Dashboard;