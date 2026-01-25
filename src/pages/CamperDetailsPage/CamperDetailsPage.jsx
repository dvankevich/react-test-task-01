import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import { Icon } from "@iconify/react";
import { fetchCamperById } from "../../redux/campers/operations";
import styles from "./CamperDetailsPage.module.css";

const CamperDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const camper = useSelector((state) => state.campers.currentCamper);
  const isLoading = useSelector((state) => state.campers.isLoading);

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
    alert("Thank you! Your booking request has been accepted.");
    setFormData({ name: "", email: "", bookingDate: "", comment: "" });
  };

  if (isLoading || !camper)
    return <div className={styles.loading}>Loading...</div>;

  return (
    <main className={styles.container}>
      {/* header */}
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

      {/* gallery */}
      <section className={styles.gallery}>
        {camper.gallery.map((img, index) => (
          <div key={index} className={styles.imageThumb}>
            <img src={img.original} alt={`${camper.name} ${index}`} />
          </div>
        ))}
      </section>

      <p className={styles.description}>{camper.description}</p>

      {/* tabs */}
      <div className={styles.tabs}>
        <NavLink
          to="features"
          className={({ isActive }) => (isActive ? styles.activeTab : "")}
        >
          Features
        </NavLink>
        <NavLink
          to="reviews"
          className={({ isActive }) => (isActive ? styles.activeTab : "")}
        >
          Reviews
        </NavLink>
      </div>

      <div className={styles.layout}>
        {/* left */}
        <div className={styles.contentLeft}>
          <Outlet context={{ camper }} />
        </div>

        {/* right */}
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
