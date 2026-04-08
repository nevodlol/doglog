import { useEffect, useState } from "react";
import { Modal, Form, Input, DatePicker, Row, Col, Upload, Select, message } from "antd";
import { InboxOutlined, DeleteOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

const AddDogModal = ({ open, onCancel, onSave }) => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    if (open) {
      form.resetFields();
      setFileList([]);
    }
  }, [open, form]);

  const handleSave = async () => {
    try {
      const values = await form.validateFields();

      onSave({
        name: values.name,
        gender: values.gender,
        birthdate: values.birthdate ? values.birthdate.format('DD.MM.YYYY') : '',
        breed: values.breed,
        color: values.color,
        chip: values.chip,
        photo: fileList[0]?.originFileObj || null
      });

      form.resetFields();
      setFileList([]);
    } catch (error) {
      console.log('validation failed:', error);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    setFileList([]);
    onCancel();
  };

  const uploadProps = {
    fileList,
    multiple: false,
    beforeUpload: (file) => {
      const isImage = file.type.startsWith('image/');
      if (!isImage) {
        message.error('Можно загружать только картинки');
        return Upload.LIST_IGNORE;
      }
      const isLt5M = file.size / 1024 / 1024 < 10;
      if (!isLt5M) {
        message.error('Размер файла не должен превышать 10 Мб');
        return Upload.LIST_IGNORE;
      }
      return false;
    },
    onChange: ({ fileList: newFileList }) => {
      setFileList(newFileList.slice(-1));
    }
  };

  return (
    <Modal
      title="Новая собака"
      open={open}
      onOk={handleSave}
      onCancel={handleCancel}
      destroyOnClose={true}
      width={700}
    >
      <Row gutter={24} style={{ marginTop: 10 }}>
        <Col span={10}>
          <Dragger {...uploadProps} style={{ height: '100%', minHeight: 280 }}>
            {fileList.length === 0 ? (
              <>
                <p style={{ fontSize: 32, color: '#40a9ff', marginBottom: 8, marginTop: 40 }}>
                  <InboxOutlined />
                </p>
                <p style={{ fontSize: 14, color: 'rgba(0,0,0,0.85)', marginBottom: 4 }}>
                  Перетащите фото или выберите файл
                </p>
                <p style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>
                  изображения до 10 Мб
                </p>
              </>
            ) : (
              <div style={{ position: 'relative', padding: 20, textAlign: 'center' }}>
                <img
                  src={URL.createObjectURL(fileList[0].originFileObj)}
                  alt="preview"
                  style={{ maxWidth: '100%', maxHeight: 200, borderRadius: 8 }}
                />
              </div>
            )}
          </Dragger>
          {fileList.length > 0 && (
            <div
              onClick={() => setFileList([])}
              style={{
                textAlign: 'center',
                marginTop: 8,
                color: '#ff4d4f',
                cursor: 'pointer',
                fontSize: 12
              }}
            >
              <DeleteOutlined /> Удалить фото
            </div>
          )}
        </Col>

        <Col span={14}>
          <Form form={form} layout="vertical">
            <Form.Item
              label="Кличка"
              name="name"
              rules={[{ required: true, message: 'Введите кличку' }]}
            >
              <Input showCount maxLength={20} />
            </Form.Item>

            <Form.Item
              label="Пол"
              name="gender"
              rules={[{ required: true, message: 'Выберите пол' }]}
            >
              <Select
                options={[
                  { value: 'male', label: 'кобель' },
                  { value: 'female', label: 'сука' },
                ]}
              />
            </Form.Item>

            <Form.Item
              label="Дата рождения"
              name="birthdate"
              rules={[{ required: true, message: "Укажите дату рождения" }]}
            >
              <DatePicker
                style={{ width: 150 }}
                format="DD.MM.YYYY"
                placeholder=''
              />
            </Form.Item>

            <Form.Item
              label="Порода"
              name="breed"
              rules={[{ required: true, message: 'Введите породу' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Окрас"
              name="color"
              rules={[{ required: true, message: 'Введите окрас' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Клеймо (чип)"
              name="chip"
            >
              <Input
                placeholder="Если не чипирована, оставьте это поле пустым"
              />
            </Form.Item>

          </Form>
        </Col>
      </Row>
    </Modal>
  );
};

export default AddDogModal;
