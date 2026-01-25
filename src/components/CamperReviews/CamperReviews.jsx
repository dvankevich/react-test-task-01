import { useOutletContext } from "react-router-dom";
import { Icon } from "@iconify/react";
import styles from "./CamperReviews.module.css";

const CamperReviews = () => {
  const { camper } = useOutletContext();

  return (
    <div className={styles.reviewsList}>
      {camper.reviews.map((rev, i) => (
        <div key={i} className={styles.reviewCard}>
          <div className={styles.reviewHeader}>
            <div className={styles.avatar}>{rev.reviewer_name[0]}</div>
            <div>
              <p className={styles.reviewerName}>{rev.reviewer_name}</p>
              <div className={styles.stars}>
                {[...Array(5)].map((_, s) => (
                  <Icon
                    key={s}
                    icon="bi:star-fill"
                    color={
                      s < rev.reviewer_rating ? "#FFC531" : "var(--badges)"
                    }
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
