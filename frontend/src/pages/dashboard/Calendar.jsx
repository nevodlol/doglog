import { Tabs, Badge, Modal, Input, Button, Select, Calendar as AntCalendar } from "antd";
import { useEffect, useState } from "react";
import axios from "axios";
import DeleteEventButton from "../../components/DeleteEventButton";
import { apiUrl } from "../../api";

function CalendarPage() {
  const [events, setEvents] = useState([]);
  const [dogs, setDogs] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedEvents, setSelectedEvents] = useState([]);

  const [employee, setEmployee] = useState("");
  const [selectedDog, setSelectedDog] = useState(null);
  const [activeType, setActiveType] = useState("training");

  useEffect(() => {
    axios.get(apiUrl("/calendar"))
      .then(res => setEvents(res.data));

    axios.get(apiUrl("/dogs/"))
      .then(res => setDogs(res.data));
  }, []);

  const eventsByDate = {};
  events.forEach(e => {
    if (!eventsByDate[e.date]) {
      eventsByDate[e.date] = [];
    }
    eventsByDate[e.date].push(e);
  });

  const dateCellRender = (value) => {
    const date = value.format("YYYY-MM-DD");

    const dayEvents = (eventsByDate[date] || []).filter(
      e => e.type === activeType
    );

    return (
      <ul style={{ padding: 0, margin: 0 }}>
        {dayEvents.map((event) => (
          <li key={event.id}>
            <Badge
              status="processing"
              text={`${event.dog.name} • ${event.employee}`}
            />
          </li>
        ))}
      </ul>
    );
  };

  const handleSelect = (value) => {
    const date = value.format("YYYY-MM-DD");

    const dayEvents = (eventsByDate[date] || []).filter(
      e => e.type === activeType
    );

    setSelectedDate(date);
    setSelectedEvents(dayEvents);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    if (!selectedDog || !employee || !selectedDate) return;

    axios.post(apiUrl("/calendar"), {
      dog_id: selectedDog,
      employee,
      date: selectedDate,
      type: activeType
    })
      .then(() => {
        setIsModalOpen(false);
        return axios.get(apiUrl("/calendar"));
      })
      .then(res => {
        setEvents(res.data);
        setEmployee("");
        setSelectedDog(null);
      })
      .catch(err => {
        console.log("FULL ERROR:", err);
        console.log("BACKEND DETAIL:", err.response?.data);
        console.log("VALIDATION:", JSON.stringify(err.response?.data, null, 2));
      });
  };

  const handleDelete = (id) => {
    return axios.delete(apiUrl(`/calendar/${id}`))
      .then(() => {
        setIsModalOpen(false);
        return axios.get(apiUrl("/calendar"));
      })
      .then(res => setEvents(res.data))
      .catch(err => {
        console.log("DELETE ERROR:", err.response?.data);
      });
  };

  const items = [
    {
      key: "work",
      label: "Служба",
      children: (
        <AntCalendar cellRender={dateCellRender} onSelect={handleSelect} />
      ),
    },
    {
      key: "training",
      label: "Тренировки",
      children: (
        <AntCalendar cellRender={dateCellRender} onSelect={handleSelect} />
      ),
    },
    {
      key: "vet",
      label: "Ветеринарные мероприятия",
      children: (
        <AntCalendar cellRender={dateCellRender} onSelect={handleSelect} />
      ),
    },
  ];

  return (
    <>
      <Tabs
        defaultActiveKey="training"
        items={items}
        onChange={(key) => setActiveType(key)}
      />

      <Modal
        title={selectedEvents.length === 0 ? "Новое событие" : "Событие"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={[
          <Button key="cancel" onClick={() => setIsModalOpen(false)}>
            Отмена
          </Button>,
          selectedEvents.length === 0 && (
            <Button key="submit" type="primary" onClick={handleCreate}>
              Добавить
            </Button>
          )
        ]}
      >
        {selectedEvents.length === 0 ? (
          <>
            <Input
              placeholder="Сотрудник"
              value={employee}
              onChange={(e) => setEmployee(e.target.value)}
              style={{ marginBottom: 10 }}
            />

            <Select
              placeholder="Собака"
              style={{ width: "100%" }}
              value={selectedDog}
              onChange={(value) => setSelectedDog(value)}
              options={dogs.map(d => ({
                value: d.id,
                label: `${d.name} (${d.breed})`
              }))}
            />
          </>
        ) : (
          selectedEvents.map(e => (
            <div
              key={e.id}
              style={{
                marginBottom: 10,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 12
              }}
            >
              <div style={{ lineHeight: "1.4" }}>
                <div>
                  <span style={{ fontWeight: 600, marginBottom: 10 }}>Сотрудник:</span>{" "}
                  <span>{e.employee}</span>
                </div>

                <div>
                  <span style={{ fontWeight: 600, marginTop: 10 }}>Собака:</span>{" "}
                  <span>{e.dog.name}</span>
                </div>
              </div>

              <DeleteEventButton
                loading={false}
                onDelete={() => handleDelete(e.id)}
              />
            </div>
          ))
        )}
      </Modal>
    </>
  );
}

export default CalendarPage;