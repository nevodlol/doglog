import { Button, Popconfirm, Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";

const DeleteEventButton = ({ onDelete, loading }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <Popconfirm
        title="Удалить событие?"
        onConfirm={onDelete}
        okText="Да"
        cancelText="Нет"
        okButtonProps={{ danger: true }}
      >
        <Tooltip title="Удалить">
          <Button
            danger
            type={hovered ? "primary" : "text"}
            icon={<DeleteOutlined />}
            loading={loading}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          />
        </Tooltip>
      </Popconfirm>
    </div>
  );
};

export default DeleteEventButton;
