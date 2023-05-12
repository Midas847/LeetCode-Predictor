import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { InfinitySpin } from "react-loader-spinner";
import Pagination from "./Pagination";

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
    axios
      .get(
        `https://maroon-waders.cyclic.app/api/routes/leetcode/getContestRankings?contestId=${contestId}&page=${currentPage}&limit=25`
      )
      .then((res) => {
        setData(res.data[0].rankings);
        setLoading(false);
        // console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
    // console.log("minPageLimit" + minPageLimit);
    // console.log("maxPageLimit" + maxPageLimit);
    // console.log("currentPage" + currentPage);
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
        <div className="flex justify-center items-center mt-[300px]">
          <InfinitySpin width="200" color="#243c5a" />
        </div>
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
