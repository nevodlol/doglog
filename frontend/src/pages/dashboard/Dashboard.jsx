import { useState } from "react";
import { Row, Col, Card } from "antd";
import AddDogModal from "../../components/AddDogModal";

function Dashboard() {
  const [dogs, setDogs] = useState([]);
  const [open, setOpen] = useState(false);

  const handleAddDog = (dogData) => {
    const newDog = {
      id: Date.now(),
      ...dogData
    };
    setDogs([...dogs, newDog]);
    setOpen(false);
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        {dogs.map((dog) => (
          <Col key={dog.id}>
            <Card title={dog.name} style={{ width: 290, height: 150 }}>
              {dog.breed && <div>{dog.breed}</div>}
              {dog.birthdate && <div>{dog.birthdate}</div>}
            </Card>
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

      <AddDogModal
        open={open}
        onCancel={() => setOpen(false)}
        onSave={handleAddDog}
      />
    </>
  );
}

export default Dashboard;
