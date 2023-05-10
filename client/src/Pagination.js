import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { InfinitySpin } from "react-loader-spinner";

const Pagination = (props) => {
  const [notFound, setnotFound] = useState(false);
  const [search, setsearch] = useState("");
  const [click, setClick] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchValue, setsearchValue] = useState([]);
  const { currentPage, maxPageLimit, minPageLimit, contestId } = props;
  const totalPages = 50;
  const data = props.response;
  // console.log(props);
  // build page numbers list based on total number of pages
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  // console.log(pages);
  const handlePrevClick = () => {
    props.onPrevClick();
  };

  const handleNextClick = () => {
    props.onNextClick();
  };

  const handlePageClick = (e) => {
    props.onPageChange(Number(e.target.id));
  };

  const handleSearch = (e) => {
    setLoading(true);
    axios
      .get(
        `http://localhost:3500/api/routes/leetcode/getUser?contestId=${contestId}&userId=${search}`
      )
      .then((res) => {
        if (res.data === "User not found") {
          setsearchValue([
            {
              rank: "",
              username: "",
              rating: "",
              predictedRating: "",
              region: "",
            },
          ]);
          console.log(searchValue);
        } else {
          setsearchValue(res.data);
          console.log(searchValue.rank);
        }
        setLoading(false);
        // console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
    setClick(true);
    console.log(search);
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
    <>
      {loading ? (
        <div className="flex justify-center items-center mt-[300px]">
          <InfinitySpin width="200" color="#243c5a" />
        </div>
      ) : (
        <div>
          <div>
            {/* <Banner /> */}

            <Navbar />
            <div className="p-[10px]">
              <div class="pb-4 float-right bg-white dark:bg-gray-900">
                <label for="table-search" class="sr-only">
                  Search
                </label>
                <div
                  class="relative mt-1 cursor-pointer"
                  // onClick={() => console.log(search)}
                >
                  <div
                    class="absolute inset-y-0 left-0 flex items-center pl-3 pointer"
                    onClick={handleSearch}
                  >
                    <button>
                      <svg
                        class="w-5 h-5 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  <input
                    type="text"
                    id="table-search"
                    class="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Search for user"
                    onChange={(e) => setsearch(e.target.value)}
                  />
                </div>
              </div>

              <table className="min-w-full text-center text-sm shadow-md rounded ">
                {/* <thead className="border-b bg-neutral-50 font-medium dark:border-neutral-500 dark:text-neutral-800"> */}
                <thead className="border-b bg-gray-800 text-white font-medium  dark:border-neutral-500 dark:text-neutral-800">
                  <tr>
                    <th scope="col" className=" px-4 py-4">
                      Rank
                    </th>
                    <th scope="col" className=" px-4 py-2">
                      Username
                    </th>
                    <th scope="col" className=" px-6 py-4">
                      Previous Rating
                    </th>
                    <th scope="col" className=" px-6 py-4">
                      Predicted Rating
                    </th>
                    <th scope="col" className=" px-6 py-4">
                      Δ
                    </th>
                    <th scope="col" className=" px-6 py-4">
                      Region
                    </th>
                  </tr>
                </thead>
                {click ? (
                  <tr className="border-b dark:border-neutral-500">
                    <td className="whitespace-nowrap  px-6 py-4 font-medium">
                      {searchValue.rank + 1}
                    </td>
                    <td className="whitespace-nowrap  px-6 py-4 text-[16px]">
                      {searchValue.username}
                    </td>
                    <td className="whitespace-nowrap  px-6 py-4">
                      {searchValue.rating.toFixed(2)}
                    </td>
                    <td className="whitespace-nowrap  px-6 py-4">
                      {searchValue.predictedRating.toFixed(2)}
                    </td>
                    {searchValue.predictedRating - searchValue.rating > 0 ? (
                      <td className="whitespace-nowrap bg-green-100  px-4 py-4">
                        {searchValue.predictedRating.toFixed(2) -
                          searchValue.rating.toFixed(2)}
                      </td>
                    ) : (
                      <td className="whitespace-nowrap bg-red-100  px-4 py-4">
                        {searchValue.predictedRating.toFixed(2) -
                          searchValue.rating.toFixed(2)}
                      </td>
                    )}
                    <td className="whitespace-nowrap  px-6 py-4">
                      {searchValue.region}
                    </td>
                  </tr>
                ) : (
                  <tbody>
                    {data.map((user, index) => {
                      return (
                        <tr className="border-b dark:border-neutral-500">
                          <td className="whitespace-nowrap  px-6 py-4 font-medium">
                            {user.rank + 1}
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4 text-[16px]">
                            {user.username}
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4">
                            {user.rating.toFixed(2)}
                          </td>
                          <td className="whitespace-nowrap  px-6 py-4">
                            {user.predictedRating.toFixed(2)}
                          </td>
                          {user.predictedRating - user.rating > 0 ? (
                            <td className="whitespace-nowrap bg-green-100  px-4 py-4">
                              {(
                                user.predictedRating.toFixed(2) -
                                user.rating.toFixed(2)
                              ).toFixed(2)}
                            </td>
                          ) : (
                            <td className="whitespace-nowrap bg-red-100  px-4 py-4">
                              {(
                                user.predictedRating.toFixed(2) -
                                user.rating.toFixed(2)
                              ).toFixed(2)}
                            </td>
                          )}
                          <td className="whitespace-nowrap  px-6 py-4">
                            {user.region}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                )}
              </table>
              <div class="bg-white p-4 flex items-center flex-wrap justify-center">
                <nav aria-label="Page navigation">
                  <ul class="inline-flex">
                    <li>
                      <button
                        class="h-10 px-5 text-green-600 transition-colors duration-150 rounded-l-lg focus:shadow-outline hover:bg-green-100"
                        disabled={currentPage === 1}
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
                        disabled={currentPage === totalPages}
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
        </div>
      )}
    </>
  );
};

export default Pagination;
