import { useOutletContext } from "react-router-dom";
import { Icons } from "../Icons";
import styles from "./CamperReviews.module.css";

const CamperReviews = () => {
  const { camper } = useOutletContext();

  return (
    <div className={styles.reviewsList}>
      {camper.reviews.map((rev) => (
        <div key={rev.reviewer_name} className={styles.reviewCard}>
          <div className={styles.reviewHeader}>
            <div className={styles.avatar}>
              {rev.reviewer_name ? rev.reviewer_name[0] : "?"}
            </div>
            <div>
              <p className={styles.reviewerName}>{rev.reviewer_name}</p>
              <div className={styles.stars}>
                {[...Array(5)].map((_, s) => (
                  <Icons.StarFull
                    key={s}
                    style={{
                      color:
                        s < rev.reviewer_rating
                          ? "var(--rating)"
                          : "var(--badges)",
                    }}
                    width="16"
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
