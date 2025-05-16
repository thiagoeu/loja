import { use, useEffect, useState } from "react";

const useMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

  const handleResize = () => {
    const chepkpoint = window.innerWidth < breakpoint;
    setIsMobile(chepkpoint);
  };

  useEffect(() => {
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return [isMobile];
};

export default useMobile;
