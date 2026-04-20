import { Modal, Row, Col, message } from "antd";
import moment from "moment";
import { useState } from "react";
import axios from "axios";
import DeleteDogButton from "./DeleteDogButton";
import { apiUrl, mediaUrl } from "../api";

const DogModal = ({ open, onCancel, dog, onDeleted }) => {
  const [loading, setLoading] = useState(false);

  if (!dog) return null;

  const handleDelete = async () => {
    try {
      setLoading(true);

      await axios.delete(apiUrl(`/dogs/${dog.id}`));

      message.success("Собака удалена");

      if (onDeleted) {
        onDeleted(dog.id);
      }

      onCancel();

    } catch (err) {
      console.error(err);
      message.error("Ошибка удаления");
    } finally {
      setLoading(false);
    }
  };

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
              src={mediaUrl(dog.photo)}
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

        <Col
          span={14}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            gap: 8,
          }}
        >
          <div><strong>Кличка:</strong> {dog.name}</div>
          <div><strong>Пол:</strong> {dog.gender === "male" ? "кобель" : "сука"}</div>
          <div>
            <strong>Дата рождения:</strong>{" "}
            {dog.birthdate ? moment(dog.birthdate).format("DD.MM.YYYY") : "не указано"}
          </div>
          <div><strong>Порода:</strong> {dog.breed}</div>
          <div><strong>Окрас:</strong> {dog.color}</div>

          {dog.chip && dog.chip.trim() !== "" && (
            <div><strong>Клеймо (чип):</strong> {dog.chip}</div>
          )}

          <div style={{ marginTop: "auto", paddingTop: 16 }}>
            <DeleteDogButton
              onDelete={handleDelete}
              loading={loading}
            />
          </div>
        </Col>
      </Row>
    </Modal>
  );
};

export default DogModal;