import { useState } from "react";

const initialState = { name: "", email: "", date: "", destination: "" };

function BookingSection() {
  const [form, setForm] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Mock submission — no real backend, just log + confirm to the user.
    console.log("Booking submitted:", form);
    setSubmitted(true);
    setForm(initialState);
    setTimeout(() => setSubmitted(false), 4000);
  }

  return (
    <section className="booking" id="booking">
      <h2>Book Your Trip</h2>
      <form className="booking-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Your full name"
          />
        </div>

        <div className="form-row">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
          />
        </div>

        <div className="form-row">
          <label htmlFor="date">Date</label>
          <input
            id="date"
            name="date"
            type="date"
            required
            value={form.date}
            onChange={handleChange}
          />
        </div>

        <div className="form-row">
          <label htmlFor="destination">Destination</label>
          <input
            id="destination"
            name="destination"
            type="text"
            required
            value={form.destination}
            onChange={handleChange}
            placeholder="Where do you want to go?"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Book Now
        </button>

        {submitted && (
          <p className="confirm-msg">
            Thanks! Your booking request has been received.
          </p>
        )}
      </form>
    </section>
  );
}

export default BookingSection;
