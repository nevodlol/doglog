import { Card } from "antd";

function AddDogCard({ onClick }) {
  return (
    <Card
      hoverable
      onClick={() => alert("click")}
      style={{
        width: 250,
        height: 150,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 40,
      }}
      bodyStyle={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      +
    </Card>
  );
}

export default AddDogCard;