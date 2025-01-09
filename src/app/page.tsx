import Image from "next/image";
import Footer from "./footer";
import Navbar from "./navbar";
import Home from "./home";

export default function App() {
  return (
    <div id="root">
        <Navbar />
        <Home />
        <Footer />
    </div>
  );
}
