import PropTypes from "prop-types";

const SEO = ({ title, description, image, url }) => {
  return (
    <head>
      <title>{title ? `${title} | TravelTrucks` : "TravelTrucks"}</title>
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
      {url && <meta property="og:url" content={url} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </head>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  url: PropTypes.string,
};

SEO.defaultProps = {
  title: "",
  description: "",
  image: null,
  url: null,
};

export default SEO;
