import { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";

const Home = () => {
  const [contests, setcontests] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 25;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = contests.slice(firstIndex, lastIndex);
  const npage = Math.ceil(contests.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  // const contestId = useParams().id.toLowerCase().replace(/ /g, "-");

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
      .get("http://localhost:3500/api/routes/leetcode/getContestData")
      .then((res) => {
        console.log(res.data);
        setcontests(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {contests.length === 0 ? (
        <div>Loading</div>
      ) : (
        <div className="">
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
                {records.map((contest, index) => {
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

            <nav
              className="flex items-center justify-between p-4"
              aria-label="Table navigation"
            >
              <span class="text-sm font-normal text-gray-500 dark:text-gray-400">
                Showing{" "}
                <span class="font-semibold text-gray-900 dark:text-white">
                  1-25
                </span>{" "}
                of{" "}
                <span class="font-semibold text-gray-900 dark:text-white">
                  {contests.length}
                </span>
              </span>

              {/* Pagination */}
              <ul class="inline-flex items-center -space-x-px">
                <li>
                  <li>
                    <button
                      class="block px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                      onClick={prevPage}
                      disabled={currentPage === 1}
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
                    disabled={currentPage === npage - 5}
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

export default Home;
