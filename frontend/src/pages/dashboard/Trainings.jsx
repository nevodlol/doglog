import { Calendar, Badge } from "antd";
import dayjs from "dayjs";

const events = {
  "2026-04-02": ["Иванов Кама"],
  "2026-04-03": ["Сидоров Шарик"],
  "2026-04-15": ["Петров Бобик"],

};

function dateCellRender(value) {
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
}

function Trainings() {
  return <Calendar cellRender={dateCellRender} />;
}

export default Trainings;