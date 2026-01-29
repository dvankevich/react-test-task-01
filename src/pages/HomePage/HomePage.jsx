import { useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";
import SEO from "../../components/SEO/SEO";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEO
        title="Camper Rental Services"
        description="Discover the best camper rentals in Ukraine for your next adventure."
      />
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
    </>
  );
};

export default HomePage;
