import { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [contests, setcontests] = useState([]);
  const navigate = useNavigate();

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
    {contests.length === 0? (
      <div>Loading</div>
    ):(
      <div className="">
        <div className="">
          <h1 className="text-center text-4xl p-20 font-bold tracking-tight text-gray-900">
            Leetcode Rating Predictor
          </h1>
        </div>
        <div className="p[50px]">
          <table className="min-w-full text-center text-sm font-light">
            <thead className="border-b bg-neutral-50 font-medium dark:border-neutral-500 dark:text-neutral-800">
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
              {contests.map((contest, index) => {
                return (
                  <tr key={index} className="border-b dark:border-neutral-500">
                    <td className="whitespace-nowrap  px-6 py-4 font-medium">
                      {index + 1}
                    </td>
                    <td className="whitespace-nowrap  px-6 py-4 text-[16px] cursor-pointer ">
                      <p
                        className="underline hover:text-black"
                        onClick={() => navigate(`/contest/${contest.title}`)}
                      >
                        {contest.title}
                      </p>
                    </td>
                    <td className="whitespace-nowrap  px-6 py-4">
                      {moment(contest.startTime * 1000).format()}
                    </td>
                    <td className="whitespace-nowrap  px-6 py-4">90 min</td>
                    <td className="whitespace-nowrap  px-6 py-4">No</td>
                    <td className="whitespace-nowrap  px-6 py-4">
                      {moment(contest.startTime * 1000).format()}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      )}
    </>
  );
};

export default Home;
