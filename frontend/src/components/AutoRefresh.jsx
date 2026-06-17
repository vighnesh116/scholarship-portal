import { useEffect } from "react";

const AutoRefresh = ({ interval = 30000 }) => {
  useEffect(() => {
    const timer = setInterval(() => {
      window.location.reload();
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  return null; 
};

export default AutoRefresh;