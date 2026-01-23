import { useParams } from "react-router-dom";

const CamperPage = () => {
  const { id } = useParams();

  return (
    <div style={{ padding: "40px 64px" }}>
      <h1>Camper Details</h1>
      <p>
        Now viewing camper with ID: <strong>{id}</strong>
      </p>
      {/* Тут пізніше буде запит за деталями кемпера */}
    </div>
  );
};

export default CamperPage;
