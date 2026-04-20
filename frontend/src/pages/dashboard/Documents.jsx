import { useEffect, useState } from "react";
import { Button, Modal, Input, Space, Typography, message } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import axios from "axios";
import { apiUrl } from "../../api";

const { Text } = Typography;

function Documents() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dogs, setDogs] = useState([]);
  const [weights, setWeights] = useState({});
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    axios.get(apiUrl("/dogs/"))
      .then((res) => {
        setDogs(res.data);

        const initial = {};
        res.data.forEach((d) => {
          initial[d.id] = d.weight || "";
        });

        setWeights(initial);
      });
  }, []);

  const updateWeight = (id, value) => {
    setWeights((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const requests = dogs.map((dog) => {
        const rawValue = weights[dog.id];
        const parsed =
          rawValue === "" || rawValue === null || rawValue === undefined
            ? null
            : Number(rawValue);
        const normalized = parsed === null || Number.isFinite(parsed) ? parsed : null;

        return axios.put(apiUrl(`/dogs/${dog.id}`), {
          weight: normalized,
        });
      });

      await Promise.all(requests);

      message.success("Веса обновлены");
      setIsModalOpen(false);
    } catch (err) {
      console.log(err);
      message.error("Ошибка обновления");
    }
  };

  const handleDownloadWeightAct = async () => {
    try {
      setIsDownloading(true);
      const response = await axios.get(
        apiUrl("/dogs/weights-report/download"),
        { responseType: "blob" }
      );

      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "akt_vzveshivaniya.docx";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.log(err);
      message.error("Не удалось сформировать акт");
    } finally {
      setIsDownloading(false);
    }
  };

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
          {dogs.map((dog) => (
            <div
              key={dog.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 12,
              }}
            >
              <div style={{ width: 120 }}>{dog.name}:</div>

              <Input
                value={weights[dog.id]}
                onChange={(e) =>
                  updateWeight(dog.id, e.target.value)
                }
                type="number"
                style={{ width: 140 }}
                suffix="кг"
              />
            </div>
          ))}

          <Button
            type="primary"
            block
            onClick={handleSave}
            style={{ marginTop: 12 }}
          >
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
              <Button
                type="primary"
                icon={<DownloadOutlined />}
                loading={isDownloading}
                onClick={handleDownloadWeightAct}
              />
            </div>
          </Space>
        </div>
      </div>
    </div>
  );
}

export default Documents;