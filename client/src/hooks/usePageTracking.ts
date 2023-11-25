import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const usePageTracking = (): void => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isReturning, setIsReturning] = useState(false);

  useEffect(() => {
    if (!isReturning) {
      const savedPage = localStorage.getItem("lastPage");

      const timeoutId = setTimeout(() => {
        if (savedPage && savedPage !== location.pathname) {
          const shouldReturn = window.confirm(
            "Хочете повернутися на попередню сторінку?"
          );
          if (shouldReturn) {
            setIsReturning(true);
            navigate(savedPage);
          }
        }
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [location, navigate, isReturning]);

  useEffect(() => {
    localStorage.setItem("lastPage", location.pathname);

    setIsReturning(false);
  }, [location]);
};
