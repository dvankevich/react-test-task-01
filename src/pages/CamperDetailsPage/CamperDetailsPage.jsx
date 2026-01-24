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

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bookingDate: "",
    comment: "",
  });

  useEffect(() => {
    dispatch(fetchCamperById(id));
  }, [dispatch, id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Booking Data:", formData);
    alert("Дякуємо! Ваша заявка на бронювання прийнята.");
    setFormData({ name: "", email: "", bookingDate: "", comment: "" });
  };

  if (isLoading || !camper)
    return <div className={styles.loading}>Loading...</div>;

  // Конфігурація для бейджів характеристик
  const featureConfig = [
    { key: "transmission", icon: "bi:diagram-3", label: (c) => c.transmission },
    { key: "engine", icon: "bi:fuel-pump", label: (c) => c.engine },
    { key: "AC", icon: "bi:wind", label: () => "AC" },
    { key: "bathroom", icon: "ph:shower", label: () => "Bathroom" },
    { key: "kitchen", icon: "bi:cup-hot", label: () => "Kitchen" },
    { key: "TV", icon: "bi:tv", label: () => "TV" },
    { key: "radio", icon: "bi:ui-radios", label: () => "Radio" },
    {
      key: "refrigerator",
      icon: "lucide:refrigerator",
      label: () => "Refrigerator",
    },
    { key: "microwave", icon: "lucide:microwave", label: () => "Microwave" },
    { key: "gas", icon: "hugeicons:gas-stove", label: () => "Gas" },
    { key: "water", icon: "ion:water-outline", label: () => "Water" },
  ];

  return (
    <main className={styles.container}>
      {/* Секція заголовку */}
      <section className={styles.header}>
        <h1 className={styles.title}>{camper.name}</h1>
        <div className={styles.meta}>
          <div className={styles.rating}>
            <Icon icon="bi:star-fill" className={styles.starIcon} />
            <span>
              {camper.rating} ({camper.reviews?.length} Reviews)
            </span>
          </div>
          <div className={styles.location}>
            <Icon icon="bi:map" />
            <span>{camper.location}</span>
          </div>
        </div>
        <p className={styles.price}>€{camper.price.toFixed(2)}</p>
      </section>

      {/* Галерея */}
      <section className={styles.gallery}>
        {camper.gallery.map((img, index) => (
          <div key={index} className={styles.imageThumb}>
            <img src={img.original} alt={`${camper.name} ${index}`} />
          </div>
        ))}
      </section>

      <p className={styles.description}>{camper.description}</p>

      {/* Таби */}
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
        {/* ЛІВА ЧАСТИНА */}
        <div className={styles.contentLeft}>
          {activeTab === "features" ? (
            <div className={styles.featuresSection}>
              {/* Динамічні бейджі */}
              <div className={styles.badges}>
                {featureConfig.map((item) => {
                  const isVisible =
                    typeof camper[item.key] === "boolean"
                      ? camper[item.key]
                      : !!camper[item.key];

                  if (!isVisible) return null;

                  return (
                    <div key={item.key} className={styles.badge}>
                      <Icon icon={item.icon} />
                      <span className={styles.capitalize}>
                        {item.label(camper)}
                      </span>
                    </div>
                  );
                })}
              </div>

              <h3 className={styles.subTitle}>Vehicle details</h3>
              <ul className={styles.detailsList}>
                <li>
                  <span>Form</span>{" "}
                  <span className={styles.capitalize}>
                    {camper.form.replace(/([A-Z])/g, " $1")}
                  </span>
                </li>
                <li>
                  <span>Length</span>
                  <span>{parseFloat(camper.length)} m</span>
                </li>
                <li>
                  <span>Width</span>
                  <span>{parseFloat(camper.width)} m</span>
                </li>
                <li>
                  <span>Height</span>
                  <span>{parseFloat(camper.height)} m</span>
                </li>
                <li>
                  <span>Tank</span>
                  <span>{parseFloat(camper.tank)} l</span>
                </li>
                <li>
                  <span>Consumption</span> <span>{camper.consumption}</span>
                </li>
              </ul>
            </div>
          ) : (
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
                              s < rev.reviewer_rating
                                ? "#FFC531"
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

        {/* ПРАВА ЧАСТИНА (Sidebar) */}
        <aside className={styles.bookingSidebar}>
          <div className={styles.bookingFormCard}>
            <h3>Book your campervan now</h3>
            <p className={styles.formNote}>
              Stay connected! We are always ready to help you.
            </p>
            <form className={styles.form} onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Name*"
                required
                value={formData.name}
                onChange={handleInputChange}
              />
              <input
                type="email"
                name="email"
                placeholder="Email*"
                required
                value={formData.email}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="bookingDate"
                placeholder="Booking date*"
                required
                onFocus={(e) => (e.target.type = "date")}
                value={formData.bookingDate}
                onChange={handleInputChange}
              />
              <textarea
                name="comment"
                placeholder="Comment"
                rows="4"
                value={formData.comment}
                onChange={handleInputChange}
              ></textarea>
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
