import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { lastPageState } from "../recoil/lastPageAtom";

export const usePageTracking = (): void => {
  const location = useLocation();
  const navigate = useNavigate();
  const [lastPage, setLastPage] = useRecoilState(lastPageState);
  const [isReturning, setIsReturning] = useState(false);

  useEffect(() => {
    if (!isReturning) {
      const timeoutId = setTimeout(() => {
        if (lastPage && lastPage !== location.pathname) {
          const shouldReturn = window.confirm(
            "Хочете повернутися на попередню сторінку?",
          );
          if (shouldReturn) {
            setIsReturning(true);
            navigate(lastPage);
          }
        }
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [location, navigate, isReturning]);

  useEffect(() => {
    setLastPage(location.pathname);
    setIsReturning(false);
  }, [location, setLastPage]);
};
