import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.title}>Campers of your dreams</h1>
          <p className={styles.subtitle}>
            You can find everything you want in our catalog
          </p>
          <button
            className={styles.button}
            onClick={() => navigate("/catalog")}
          >
            View Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
