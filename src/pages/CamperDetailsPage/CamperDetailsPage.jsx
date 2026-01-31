import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Outlet } from "react-router-dom";
import { Icons } from "../../components/Icons";
import { fetchCamperById } from "../../redux/campers/operations";
import SEO from "../../components/SEO/SEO";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import { enGB } from "date-fns/locale/en-GB";
registerLocale("en-GB", enGB);
import styles from "./CamperDetailsPage.module.css";

const CamperDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const camper = useSelector((state) => state.campers.currentCamper);
  const isLoading = useSelector((state) => state.campers.isLoading);

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

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

  const slides = camper.gallery
    ? camper.gallery.map((img) => ({
        src: img.original,
        alt: `${camper.name} full view`,
      }))
    : [];

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, bookingDate: date }));
  };

  return (
    <>
      <SEO
        title={camper.name}
        description="Discover the best camper rentals in Ukraine for your next adventure."
      />
      <main className={styles.container}>
        {/* header */}
        <section className={styles.header}>
          <h1 className={styles.title}>{camper.name}</h1>
          <div className={styles.meta}>
            <NavLink
              to="reviews"
              className={({ isActive }) => (isActive ? styles.activeTab : "")}
              aria-label={`View ${camper.reviews?.length} reviews`}
            >
              <div className={styles.rating}>
                <Icons.StarFull
                  className={styles.starIcon}
                  style={{ color: "var(--rating)" }}
                  aria-hidden="true"
                />
                <span>
                  {camper.rating} ({camper.reviews?.length} Reviews)
                </span>
              </div>
            </NavLink>

            <div className={styles.location}>
              <Icons.Map aria-hidden="true" />
              <span>{camper.location}</span>
            </div>
          </div>
          <p className={styles.price}>€{camper.price.toFixed(2)}</p>
        </section>

        {/* gallery */}
        <section className={styles.gallery}>
          {camper.gallery.map((img, i) => (
            <div
              key={i}
              className={styles.imageThumb}
              onClick={() => {
                setIndex(i);
                setOpen(true);
              }}
              aria-label={`Open photo ${i + 1} of ${camper.name}`}
            >
              <img src={img.thumb} alt={`${camper.name} preview ${i + 1}`} />
            </div>
          ))}
        </section>

        <p className={styles.description}>{camper.description}</p>

        {/* tabs */}
        <div className={styles.tabs} role="tablist">
          <NavLink
            to="features"
            role="tab"
            className={({ isActive }) => (isActive ? styles.activeTab : "")}
          >
            Features
          </NavLink>
          <NavLink
            to="reviews"
            role="tab"
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
                  aria-label="Full Name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email*"
                  aria-label="Email Address"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <div className={styles.datepickerWrapper}>
                  <DatePicker
                    selected={formData.bookingDate}
                    onChange={handleDateChange}
                    placeholderText="Booking date*"
                    ariaLabelledBy="booking-date-label"
                    dateFormat="dd/MM/yyyy"
                    minDate={new Date()}
                    required
                    calendarStartDay={1}
                    className={styles.datepickerInput}
                    calendarClassName={styles.customCalendar}
                  />
                </div>
                <textarea
                  name="comment"
                  placeholder="Comment"
                  aria-label="Your comment"
                  rows="4"
                  value={formData.comment}
                  onChange={handleInputChange}
                ></textarea>
                <button
                  type="submit"
                  className={styles.sendBtn}
                  aria-label="Send booking request"
                >
                  Send
                </button>
              </form>
            </div>
          </aside>
        </div>
      </main>

      {/* Lightbox */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        on={{ view: ({ index: currentIndex }) => setIndex(currentIndex) }}
      />
    </>
  );
};

export default CamperDetailsPage;
