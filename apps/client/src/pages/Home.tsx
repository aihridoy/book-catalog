import { useEffect } from "react";
import Books from "../components/Books";
import Hero from "../components/Hero";

export default function Home() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <div>
      <Hero />
      <Books />
    </div>
  );
}
