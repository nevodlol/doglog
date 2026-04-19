import { Calendar, Badge, Modal, Input, Tabs, Button } from "antd";
import { useState } from "react";

const events = {
  "2026-04-02": ["Иванов — Кама"],
  "2026-04-03": ["Сидоров — Граф"],
  "2026-04-15": ["Петров — Арчибальд"],
};

function Trainings() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const dateCellRender = (value) => {
    const date = value.format("YYYY-MM-DD");
    const dayEvents = events[date] || [];

    return (
      <ul>
        {dayEvents.map((event, index) => (
          <li key={index}>
            <Badge status="processing" text={event} />
          </li>
        ))}
      </ul>
    );
  };

  const handleSelect = (value) => {
    setSelectedDate(value.format("YYYY-MM-DD"));
    setIsModalOpen(true);
  };

  const items = [
    {
      key: "service",
      label: "Служба",
      children: <div style={{ padding: 16 }}>Пока пусто 🧩</div>,
    },
    {
      key: "trainings",
      label: "Тренировки",
      children: (
        <Calendar
          cellRender={dateCellRender}
          onSelect={handleSelect}
        />
      ),
    },
    {
      key: "vet",
      label: "Ветеринарные мероприятия",
      children: <div style={{ padding: 16 }}>Пока пусто 🐾</div>,
    },
  ];

  return (
    <>
      <Tabs defaultActiveKey="trainings" items={items} />

      <Modal
        title={'Новая тренировка:'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalOpen(false)}>
            Отмена
          </Button>,
          <Button key="submit" type="primary">
            Добавить тренировку
          </Button>,
        ]}
      >
        <Input
          placeholder="Сотрудник"
          style={{ marginBottom: 10, marginTop: 20 }}
        />
        <Input placeholder="Собака" />
      </Modal>
    </>
  );
}

export default Trainings;