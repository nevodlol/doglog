import { Modal, Row, Col } from "antd";
import moment from "moment";

const DogModal = ({ open, onCancel, dog }) => {
  if (!dog) return null;

  return (
    <Modal
      title={`Информация о собаке: ${dog.name}`}
      open={open}
      onCancel={onCancel}
      footer={null}
      width={700}
    >
      <Row gutter={24}>
        <Col span={10}>
          {dog.photo ? (
            <img
              src={`http://localhost:8000/${dog.photo}`}
              alt={dog.name}
              style={{ width: "100%", borderRadius: 8, objectFit: "cover" }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: 280,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#f0f0f0",
                borderRadius: 8,
              }}
            >
              Фото отсутствует
            </div>
          )}
        </Col>
        <Col span={14} style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", gap: 8 }}>
          <div>Кличка: {dog.name}</div>
          <div>Пол: {dog.gender === "male" ? "кобель" : "сука"}</div>
          <div>Дата рождения: {dog.birthdate ? moment(dog.birthdate).format("DD.MM.YYYY") : "не указано"}</div>
          <div>Порода: {dog.breed}</div>
          <div>Окрас: {dog.color}</div>
          {dog.chip && dog.chip.trim() !== "" && <div>Клеймо (чип): {dog.chip}</div>}
        </Col>
      </Row>
    </Modal>
  );
};

export default DogModal;