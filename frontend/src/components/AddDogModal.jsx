import { useState } from "react";
import { Modal, Input, DatePicker } from "antd";
import dayjs from 'dayjs';

const AddDogModal = ({ open, onCancel, onSave }) => {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [birthdate, setBirthdate] = useState("");

  const handleSave = () => {
    onSave({
      name,
      breed,
      birthdate
    });
    setName("");
    setBreed("");
    setBirthdate("");
  };

  const handleCancel = () => {
    onCancel();
    setName("");
    setBreed("");
    setBirthdate("");
  };

  return (
    <Modal
      title="Новая собака"
      open={open}
      onOk={handleSave}
      onCancel={handleCancel}
    >
      <Input
        placeholder="Кличка"
        value={name}
        onChange={(e) => setName(e.target.value)}
        showCount
        maxLength={20}
        style={{ marginBottom: 10, marginTop: 21 }}
      />

      <Input
        placeholder="Порода"
        value={breed}
        onChange={(e) => setBreed(e.target.value)}
        style={{ marginBottom: 10 }}
      />

      <DatePicker
        style={{ width: 200 }}
        placeholder="Дата рождения"
        format="DD.MM.YYYY"
        value={birthdate ? dayjs(birthdate, 'DD.MM.YYYY') : null}
        onChange={(date) => {
          setBirthdate(date ? date.format('DD.MM.YYYY') : '');
        }}
      />
    </Modal>
  );
};

export default AddDogModal;
