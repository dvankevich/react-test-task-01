import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import { fetchCamperById } from "../../redux/campers/operations";
import styles from "./CamperDetailsPage.module.css";

const CamperDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const camper = useSelector((state) => state.campers.currentCamper);
  const isLoading = useSelector((state) => state.campers.isLoading);

  const [activeTab, setActiveTab] = useState("features");

  useEffect(() => {
    dispatch(fetchCamperById(id));
  }, [dispatch, id]);

  if (isLoading || !camper)
    return <div className={styles.loading}>Loading...</div>;

  return (
    <main className={styles.container}>
      {/* 1. Заголовок та основна інформація */}
      <section className={styles.header}>
        <h1 className={styles.title}>{camper.name}</h1>
        <div className={styles.meta}>
          <div className={styles.rating}>
            <Icon icon="bi:star-fill" className={styles.starIcon} />
            <span>
              {camper.rating}({camper.reviews?.length} Reviews)
            </span>
          </div>
          <div className={styles.location}>
            <Icon icon="bi:map" />
            <span>{camper.location}</span>
          </div>
        </div>
        <p className={styles.price}>€{camper.price.toFixed(2)}</p>
      </section>

      {/* 2. Галерея зображень */}
      <section className={styles.gallery}>
        {camper.gallery.map((img, index) => (
          <div key={index} className={styles.imageThumb}>
            <img src={img.original} alt={`${camper.name} view ${index}`} />
          </div>
        ))}
      </section>

      {/* 3. Опис */}
      <p className={styles.description}>{camper.description}</p>

      {/* 4. Таби (Features / Reviews) */}
      <div className={styles.tabs}>
        <button
          className={activeTab === "features" ? styles.activeTab : ""}
          onClick={() => setActiveTab("features")}
        >
          Features
        </button>
        <button
          className={activeTab === "reviews" ? styles.activeTab : ""}
          onClick={() => setActiveTab("reviews")}
        >
          Reviews
        </button>
      </div>

      <div className={styles.layout}>
        {/* Ліва частина: Контент вкладок */}
        <div className={styles.contentLeft}>
          {activeTab === "features" ? (
            <div className={styles.features}>
              <div className={styles.badges}>
                <div className={styles.badge}>
                  <Icon icon="bi:diagram-3" /> {camper.transmission}
                </div>
                <div className={styles.badge}>
                  <Icon icon="bi:wind" /> AC
                </div>
                <div className={styles.badge}>
                  <Icon icon="bi:fuel-pump" /> {camper.engine}
                </div>
                <div className={styles.badge}>
                  <Icon icon="bi:cup-hot" /> Kitchen
                </div>
                <div className={styles.badge}>
                  <Icon icon="bi:ui-radios" /> Radio
                </div>
              </div>

              <h3 className={styles.subTitle}>Vehicle details</h3>
              <ul className={styles.detailsList}>
                <li>
                  <span>Form</span> <span>{camper.form}</span>
                </li>
                <li>
                  <span>Length</span> <span>{camper.length}</span>
                </li>
                <li>
                  <span>Width</span> <span>{camper.width}</span>
                </li>
                <li>
                  <span>Height</span> <span>{camper.height}</span>
                </li>
                <li>
                  <span>Tank</span> <span>{camper.tank}</span>
                </li>
                <li>
                  <span>Consumption</span> <span>{camper.consumption}</span>
                </li>
              </ul>
            </div>
          ) : (
            <div className={styles.reviews}>
              {camper.reviews.map((rev, i) => (
                <div key={i} className={styles.reviewCard}>
                  <div className={styles.reviewHeader}>
                    <div className={styles.avatar}>{rev.reviewer_name[0]}</div>
                    <div>
                      <p className={styles.reviewerName}>{rev.reviewer_name}</p>
                      <div className={styles.stars}>
                        {[...Array(5)].map((_, starIdx) => (
                          <Icon
                            key={starIdx}
                            icon="bi:star-fill"
                            color={
                              starIdx < rev.reviewer_rating
                                ? "var(--rating)"
                                : "var(--badges)"
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
          )}
        </div>

        {/* Права частина: Форма бронювання */}
        <aside className={styles.bookingSidebar}>
          <div className={styles.bookingForm}>
            <h3>Book your campervan now</h3>
            <p className={styles.bookingSub}>
              Stay connected! We are always ready to help you.
            </p>
            <form className={styles.form}>
              <input type="text" placeholder="Name*" required />
              <input type="email" placeholder="Email*" required />
              <input
                type="text"
                placeholder="Booking date*"
                onFocus={(e) => (e.target.type = "date")}
                required
              />
              <textarea placeholder="Comment" rows="4"></textarea>
              <button type="submit" className={styles.sendBtn}>
                Send
              </button>
            </form>
          </div>
        </aside>
      </div>
    </main>
  );
};

export default CamperDetailsPage;
