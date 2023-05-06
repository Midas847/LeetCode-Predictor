import { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { InfinitySpin } from "react-loader-spinner";
import Footer from "./Footer";
import Banner from "./Banner";

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
        <div className="flex justify-center items-center mt-[300px]">
          <InfinitySpin width="200" color="#243c5a" />
        </div>
      ) : (
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
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default Home;
