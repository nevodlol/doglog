import { useState, useEffect } from "react";
import { Row, Col, Card, message } from "antd";
import AddDogModal from "../../components/AddDogModal";

const { Meta } = Card;

function Dashboard() {
  const [dogs, setDogs] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchDogs();
  }, []);

  const fetchDogs = async () => {
    try {
      const res = await fetch("http://localhost:8000/dogs/");
      if (!res.ok) throw new Error("Ошибка при загрузке собак");
      const data = await res.json();
      setDogs(data);
    } catch (err) {
      console.error(err);
      message.error("Не удалось загрузить собак");
    }
  };

  const handleAddDog = async (dogData) => {
    try {
      const formData = new FormData();
      formData.append("name", dogData.name);
      formData.append("gender", dogData.gender);
      formData.append("birthdate", dogData.birthdate);
      formData.append("breed", dogData.breed);
      formData.append("color", dogData.color);
      if (dogData.chip) formData.append("chip", dogData.chip);
      if (dogData.photo) formData.append("file", dogData.photo);

      const res = await fetch("http://localhost:8000/dogs/", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Ошибка при добавлении собаки");

      const newDog = await res.json();
      setDogs([...dogs, newDog]);
      setOpen(false);
      message.success("Собака добавлена");
    } catch (err) {
      console.error(err);
      message.error("Ошибка при добавлении собаки");
    }
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        {dogs.map((dog) => (
          <Col key={dog.id}>
            <Card
              hoverable
              style={{ width: 290, height: 250 }}
              cover={
                dog.photo ? (
                  <img
                    alt={dog.name}
                    src={`http://localhost:8000/${dog.photo}`}
                    style={{ height: 150, objectFit: "cover" }}
                  />
                ) : null
              }
            >
              <Meta title={dog.name} />
            </Card>
          </Col>
        ))}

        <Col>
          <Card
            hoverable
            onClick={() => setOpen(true)}
            style={{
              width: 290,
              height: 250,
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