import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Pagination from "./Pagination";
import { publicRequest } from "../requestMethods";
import Loader from "../Loader";

const Contest = () => {
  const [data, setData] = useState([]);

  const pageNumberLimit = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPageLimit, setMaxPageLimit] = useState(5);
  const [minPageLimit, setMinPageLimit] = useState(0);
  const contestId = useParams().id.toLowerCase().replace(/ /g, "-");
  const [loading, setLoading] = useState(true);

  console.log(contestId);

  useEffect(() => {
    setLoading(true);
    publicRequest
      .get(
        `/getContestRankings?contestId=${contestId}&page=${currentPage}&limit=25`
      )
      .then((res) => {
        setData(res.data[0].rankings);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [contestId, currentPage]);

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
    contestId,
    response: data,
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Pagination
          {...paginationAttributes}
          onPrevClick={onPrevClick}
          onNextClick={onNextClick}
          onPageChange={onPageChange}
        />
      )}
    </>
  );
};

export default Contest;
