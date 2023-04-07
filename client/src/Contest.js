import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import Navbar from "./Navbar";

const Contest = () => {
  const [data, setData] = useState([]);
  const [search, setsearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 25;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  const contestId = useParams().id.toLowerCase().replace(/ /g, "-");

  console.log(contestId);
  const prevPage = () => {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1);
    }
  };

  const changeCurrentPage = (id) => {
    setCurrentPage(id);
  };

  useEffect(() => {
    axios
      .get(
        `http://localhost:3500/api/routes/leetcode/getContestRankings?contestId=${contestId}`
      )
      .then((res) => {
        setData(res.data[0].rankings);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [contestId]);
  return (
    <>
      {data.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <div>
          <Navbar />
          <div className="p-[10px]">
            <div class="pb-4 float-right bg-white dark:bg-gray-900">
              <label for="table-search" class="sr-only">
                Search
              </label>
              <div class="relative mt-1 cursor-pointer">
                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
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

            <table className="min-w-full text-center text-sm font-light shadow-md rounded-lg">
              <thead className="border-b bg-neutral-50 font-medium dark:border-neutral-500 dark:text-neutral-800">
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
              <tbody>
                {records.map((user, index) => {
                  return (
                    <tr className="border-b dark:border-neutral-500">
                      <td className="whitespace-nowrap  px-6 py-4 font-medium">
                        {user.rank + 1}
                      </td>
                      <td className="whitespace-nowrap  px-6 py-4 text-[16px]">
                        {user.username}
                      </td>
                      <td className="whitespace-nowrap  px-6 py-4">
                        {user.rating}
                      </td>
                      <td className="whitespace-nowrap  px-6 py-4">
                        {user.predictedRating}
                      </td>
                      {/* <td className="whitespace-nowrap  px-6 py-4">
                        {user.predictedRating - user.rating}
                      </td> */}
                      {user.predictedRating - user.rating > 0 ? (
                        <td className="whitespace-nowrap bg-green-100  px-4 py-4">
                          {user.predictedRating - user.rating}
                        </td>
                      ) : (
                        <td className="whitespace-nowrap bg-red-100  px-4 py-4">
                          {user.predictedRating - user.rating}
                        </td>
                      )}
                      <td className="whitespace-nowrap  px-6 py-4">
                        {user.region}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <nav
              className="flex items-center justify-between p-4"
              aria-label="Table navigation"
            >
              <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                Showing{" "}
                <span class="font-semibold text-gray-900 dark:text-white">
                  1-10
                </span>{" "}
                of{" "}
                <span class="font-semibold text-gray-900 dark:text-white">
                  1000
                </span>
              </span>

              {/* Pagination */}
              <ul class="inline-flex items-center -space-x-px">
                <li>
                  <li>
                    <button
                      class="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      onClick={prevPage}
                    >
                      <span class="sr-only">Previous</span>
                      <svg
                        class="w-5 h-5"
                        aria-hidden="true"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </li>
                </li>

                {numbers.slice(currentPage, currentPage + 5).map((n, i) => (
                  <li key={i}>
                    <button
                      class="px-[25px] py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      onClick={() => changeCurrentPage(n)}
                    >
                      {n}
                    </button>
                  </li>
                ))}
                {}
                <li>
                  <button class="px-[25px] py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                    ...
                  </button>
                </li>
                <li>
                  <button
                    class="block px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                    onClick={nextPage}
                  >
                    <span class="sr-only">Next</span>
                    <svg
                      class="w-5 h-5"
                      aria-hidden="true"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Contest;
