import Header from "./components/Header";
import FeaturedSection from "./components/FeaturedSection";
import DestinationsSection from "./components/DestinationsSection";
import PromotionsSection from "./components/PromotionsSection";
import BookingSection from "./components/BookingSection";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Header />
      <main>
        <FeaturedSection />
        <DestinationsSection />
        <PromotionsSection />
        <BookingSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
