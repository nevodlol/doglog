import { useState } from "react";
import { Row, Col, Card } from "antd";

function Dashboard() {
  const [dogs, setDogs] = useState([]);

  const addDog = () => {
    const newDog = {
      id: Date.now(),
      name: "Собака " + (dogs.length + 1),
    };

    setDogs([...dogs, newDog]);
  };

  return (
    <Row gutter={[16, 16]}>
      {dogs.map((dog) => (
        <Col key={dog.id}>
          <Card title={dog.name} style={{ width: 300 }}>
            Карточка собаки
          </Card>
        </Col>
      ))}

      <Col>
        <Card
          hoverable
          onClick={addDog}
          style={{
            width: 300,
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
  );
}

export default Dashboard;