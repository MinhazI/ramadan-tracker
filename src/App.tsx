import Counter from "./components/Counter";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";

function App() {
  return (
    <>
      <Navigation />
      <div className="flex flex-col items-center justify-center min-h-[90vh]">
        <Counter />
      </div>
      <Footer />
    </>
  );
}

export default App;
