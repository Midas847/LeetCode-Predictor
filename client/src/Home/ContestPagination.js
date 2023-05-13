import React from "react";
import Footer from "../Footer/Footer";
import Navbar from "../Header/Navbar";
import Banner from "../Header/Banner";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const ContestPagination = (props) => {
  const navigate = useNavigate();
  const totalPages = 50;
  const { currentPage, maxPageLimit, minPageLimit } = props;
  const data = props.response;
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  console.log(props);
  const handlePrevClick = () => {
    props.onPrevClick();
  };

  const handleNextClick = () => {
    props.onNextClick();
  };

  const handlePageClick = (e) => {
    props.onPageChange(Number(e.target.id));
  };

  const pageNumbers = pages.map((page) => {
    if (page <= maxPageLimit && page > minPageLimit) {
      return (
        <li
          key={page}
          id={page}
          onClick={handlePageClick}
          className={
            currentPage === page
              ? "h-10 px-5 py-2 text-white transition-colors duration-150 bg-green-600 border border-r-0 border-green-600 focus:shadow-outline"
              : "h-10 px-5 py-2 text-green-600 transition-colors duration-150 focus:shadow-outline hover:bg-green-100 cursor-pointer"
          }
        >
          {page}
        </li>
      );
    } else {
      return null;
    }
  });

  let pageIncrementEllipses = null;
  if (pages.length > maxPageLimit) {
    pageIncrementEllipses = (
      <li className="mt-1" onClick={handleNextClick}>
        . . .
      </li>
    );
  }
  let pageDecremenEllipses = null;
  if (minPageLimit >= 1) {
    pageDecremenEllipses = (
      <li className="mt-1" onClick={handlePrevClick}>
        . . .
      </li>
    );
  }

  return (
    <div className="">
      <Banner />
      <Navbar />
      <div className="p-[10px]">
        <table className="min-w-full text-center text-sm shadow-md rounded-lg">
          {/* <thead className="border-b bg-neutral-100 font-medium text-[16px]  dark:border-neutral-500 dark:text-neutral-800"> */}
          <thead className="border-b bg-gray-800 text-white font-medium text-[16px]  dark:border-neutral-500 dark:text-neutral-800">
            <tr>
              <th scope="col" className=" px-4 py-4">
                #
              </th>
              <th scope="col" className=" px-4 py-2 ">
                Contest Name
              </th>
              <th scope="col" className=" px-6 py-4">
                Start Time
              </th>
              <th scope="col" className=" px-6 py-4">
                Duration
              </th>
              <th scope="col" className=" px-6 py-4">
                Ranks Predicted
              </th>
              <th scope="col" className=" px-6 py-4">
                Predicted Time
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((contest, index) => {
              return (
                <tr
                  key={index}
                  className="text-[16px] border-b dark:border-neutral-500"
                >
                  <td className="whitespace-nowrap  px-6 py-4 font-medium">
                    {index + 1}
                  </td>
                  <td className="whitespace-nowrap  px-6 py-4 text-[16px] cursor-pointer ">
                    <p
                      className="text-blue-600 underline hover:text-blue-800"
                      onClick={() => navigate(`/contest/${contest.title}`)}
                    >
                      {contest.title}
                    </p>
                  </td>
                  <td className="whitespace-nowrap  px-6 py-4 ">
                    {moment(contest.startTime * 1000).format(
                      "DD/MM/yyyy HH:MM:SS"
                    )}
                  </td>
                  <td className="whitespace-nowrap  px-6 py-4">90 min</td>
                  <td className="whitespace-nowrap  px-6 py-4">No</td>
                  <td className="whitespace-nowrap  px-6 py-4">
                    {moment(contest.startTime * 1000).format(
                      "DD/MM/yyyy HH:MM:SS"
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <div class="bg-white p-4 flex items-center flex-wrap justify-center">
          <nav aria-label="Page navigation">
            <ul class="inline-flex">
              <li>
                <button
                  class="h-10 px-5 text-green-600 transition-colors duration-150 rounded-l-lg focus:shadow-outline hover:bg-green-100"
                  onClick={handlePrevClick}
                >
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clip-rule="evenodd"
                      fill-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </li>
              {pageDecremenEllipses}
              {pageNumbers}
              {pageIncrementEllipses}
              <li>
                <button
                  class="h-10 px-5 text-green-600 transition-colors duration-150 bg-white rounded-r-lg focus:shadow-outline hover:bg-green-100"
                  onClick={handleNextClick}
                >
                  <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20">
                    <path
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                      fill-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ContestPagination;
