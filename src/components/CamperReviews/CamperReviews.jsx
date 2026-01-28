import { useOutletContext } from "react-router-dom";
import { Icons } from "../Icons";
import styles from "./CamperReviews.module.css";

const CamperReviews = () => {
  const { camper } = useOutletContext();

  return (
    <div className={styles.reviewsList}>
      {camper.reviews.map((rev, i) => (
        <div key={i} className={styles.reviewCard}>
          <div className={styles.reviewHeader}>
            <div className={styles.avatar}>
              {rev.reviewer_name ? rev.reviewer_name[0] : "?"}
            </div>
            <div>
              <p className={styles.reviewerName}>{rev.reviewer_name}</p>
              <div className={styles.stars}>
                {/* Створюємо масив із 5 зірок */}
                {[...Array(5)].map((_, s) => (
                  <Icons.StarFull
                    key={s}
                    // Динамічно змінюємо колір через style
                    style={{
                      color:
                        s < rev.reviewer_rating ? "#FFC531" : "var(--badges)",
                    }}
                    width="16" // Можеш налаштувати потрібний розмір
                    height="16"
                  />
                ))}
              </div>
            </div>
          </div>
          <p className={styles.reviewComment}>{rev.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default CamperReviews;
