import { useEffect, useState } from "react";

import ContestPagination from "./ContestPagination";
import { publicRequest } from "../requestMethods";
import Loader from "../Loader";

const Home = () => {
  const [contests, setcontests] = useState([]);

  // const [data, setData] = useState([]);

  const pageNumberLimit = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageLimit, setMaxPageLimit] = useState(5);
  const [minPageLimit, setMinPageLimit] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    publicRequest
      .get(`/getContestData?page=${currentPage}&limit=10`)
      .then((res) => {
        console.log(res.data);
        setcontests(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [currentPage]);

  const onPageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const onPrevClick = () => {
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageLimit(maxPageLimit - pageNumberLimit);
      setMinPageLimit(minPageLimit - pageNumberLimit);
    }
    setCurrentPage((prev) => prev - 1);
  };

  const onNextClick = () => {
    if (currentPage + 1 > maxPageLimit) {
      setMaxPageLimit(maxPageLimit + pageNumberLimit);
      setMinPageLimit(minPageLimit + pageNumberLimit);
    }
    setCurrentPage((prev) => prev + 1);
  };

  const paginationAttributes = {
    currentPage,
    maxPageLimit,
    minPageLimit,
    response: contests,
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <ContestPagination
          {...paginationAttributes}
          onPrevClick={onPrevClick}
          onNextClick={onNextClick}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
};

export default Home;
