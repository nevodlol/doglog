import { useState } from "react";
import { Button, Modal, Input, Space, Typography } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

const { Text } = Typography;

function Documents() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const Row = ({ label }) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12,
        marginBottom: 12,
      }}
    >
      <div style={{ width: 120, textAlign: "left" }}>{label}:</div>

      <Input
        maxLength={6}
        style={{ width: 140 }}
        suffix="кг"
      />
    </div>
  );

  return (
    <div style={{ padding: 24, maxWidth: 800, textAlign: "left" }}>
      <Button
        type="primary"
        size="large"
        block
        onClick={() => setIsModalOpen(true)}
        style={{ height: 60, fontSize: 18 }}
      >
        Ежемесячное взвешивание
      </Button>

      <Modal
        title="Ежемесячное взвешивание"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <div style={{ marginTop: 10 }}>
          <Row label="Граф" />
          <Row label="Рекс" />
          <Row label="Мерлия" />
          <Row label="Арчибальд" />

          <Button type="primary" block style={{ marginTop: 12 }}>
            Сохранить
          </Button>
        </div>
      </Modal>

      <div style={{ marginTop: 40 }}>
        <Text strong style={{ fontSize: 16 }}>
          Сформировать документы:
        </Text>

        <div style={{ marginTop: 12 }}>
          <Space direction="vertical" style={{ width: "100%" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <span>Акт о комиссионном обслуживании</span>
              <Button type="primary" icon={<DownloadOutlined />} />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <span>Расчёт норм кормления</span>
              <Button type="primary" icon={<DownloadOutlined />} />
            </div>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default Documents;