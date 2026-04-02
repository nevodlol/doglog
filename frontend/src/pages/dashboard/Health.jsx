import { Calendar, Badge } from "antd";
import dayjs from "dayjs";

const events = {
  "2026-04-02": ["Ветеринарные мероприятия"],
  "2026-04-05": ["Общеплановая прививка"],
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

function Health() {
  return <Calendar cellRender={dateCellRender} />;
}

export default Health;