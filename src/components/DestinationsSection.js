import { useEffect, useMemo, useState } from "react";
import DestinationCard from "./DestinationCard";

const API_URL =
  "https://nxtwave-assessments-backend-nxtwave-media-static.s3-ap-south-1.amazonaws.com/topin_beta/media/content_loading/uploads/19e5009c-c751-4324-a3fe-3a29d46587f2_destinationData.json";

const PAGE_SIZE = 6;

// Normalizes different possible API key names into a consistent shape,
// since the exact field names from the API may vary.
function normalizeDestination(item, index) {
  return {
    id: item.id ?? item._id ?? index,
    name: item.name ?? item.destinationName ?? item.title ?? "Unknown",
    location: item.location ?? item.country ?? item.place ?? "Unknown",
    rating: item.rating ?? item.ratings ?? item.score ?? "N/A",
    tag: item.tag ?? item.category ?? item.type ?? "",
    image: item.image ?? item.imageUrl ?? item.img ?? item.photo ?? "",
  };
}

function DestinationsSection() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    let cancelled = false;

    async function fetchDestinations() {
      try {
        setLoading(true);
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch destinations");
        const data = await res.json();

        // API may return an array directly, or wrap it in a key.
        const list = Array.isArray(data)
          ? data
          : data.destinations || data.data || [];

        if (!cancelled) {
          setDestinations(list.map(normalizeDestination));
          setError(null);
        }
      } catch (err) {
        if (!cancelled) setError(err.message || "Something went wrong");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchDestinations();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    if (!search.trim()) return destinations;
    return destinations.filter((d) =>
      d.name.toLowerCase().includes(search.trim().toLowerCase())
    );
  }, [search, destinations]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE
  );

  function handleSearchChange(e) {
    setSearch(e.target.value);
    setPage(1);
  }

  return (
    <section className="destinations" id="destinations">
      <div className="section-heading">
        <h2>Explore Destinations</h2>
        <input
          type="text"
          className="search-input"
          placeholder="Search destination by name..."
          value={search}
          onChange={handleSearchChange}
        />
      </div>

      {loading && <p className="status-msg">Loading destinations...</p>}
      {error && <p className="status-msg error">Error: {error}</p>}

      {!loading && !error && filtered.length === 0 && (
        <p className="status-msg">No such destination</p>
      )}

      {!loading && !error && filtered.length > 0 && (
        <>
          <div className="destinations-grid">
            {paginated.map((dest) => (
              <DestinationCard key={dest.id} destination={dest} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="pagination">
              <button
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
              >
                Prev
              </button>
              <span>
                Page {page} of {totalPages}
              </span>
              <button
                disabled={page === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default DestinationsSection;
