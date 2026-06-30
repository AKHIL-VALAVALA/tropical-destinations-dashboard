function DestinationCard({ destination }) {
  const { image, name, location, rating, tag } = destination;

  return (
    <div className="destination-card">
      <div className="card-image-wrap">
        <img
          src={image || "https://placehold.co/400x260?text=Destination"}
          alt={name}
          loading="lazy"
        />
        {tag && <span className="card-tag">{tag}</span>}
      </div>
      <div className="card-body">
        <h3>{name}</h3>
        <p className="card-location">📍 {location}</p>
        <div className="card-rating">⭐ {rating ?? "N/A"}</div>
      </div>
    </div>
  );
}

export default DestinationCard;
