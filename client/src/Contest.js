import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";

const Contest = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 25;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = data.slice(firstIndex, lastIndex);
  const npage = Math.ceil(data.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);

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
        "http://localhost:3500/api/routes/leetcode/getContestRankings?contestId=biweekly-contest-98"
      )
      .then((res) => {
        setData(res.data[0].rankings);
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <>
      {data.length === 0 ? (
        <div>Loading...</div>
      ) : (
        <div>
          <div className="p-[50px]">
            <table className="min-w-full text-center text-sm font-light">
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
            <nav className="flex mt-2 justify-center">
              <ul className="list-style-none flex">
                <li>
                  <button
                    className="p-2 border-2 rounded-l-md"
                    onClick={prevPage}
                  >
                    Prev
                  </button>
                </li>
                {numbers.slice(currentPage, currentPage + 5).map((n, i) => (
                  <li key={i}>
                    <button
                      className="p-2 pl-4 pr-4 border-2"
                      onClick={() => changeCurrentPage(n)}
                    >
                      {n}
                    </button>
                  </li>
                ))}
                <li className="">
                  <button
                    className="p-2 border-2 rounded-r-md"
                    onClick={nextPage}
                  >
                    Next
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
