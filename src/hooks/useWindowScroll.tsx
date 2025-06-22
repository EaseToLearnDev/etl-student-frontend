import { useEffect, useState } from "react";

function useWindowScroll() {
  const [scroll, setScroll] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setScroll({ x: window.scrollX, y: window.scrollY });
      });
    };

    handleScroll(); // set initial values
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return scroll;
}

export default useWindowScroll;
