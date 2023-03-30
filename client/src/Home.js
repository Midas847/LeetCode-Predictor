const contests = [
  {
    name: "weekly-contest-339",
    start: "3/26/2023, 8:00:00 AM",
    duration: "90 min",
    predcited: "No",
    predictedTime: "3/26/2023, 10:08:40 AM",
  },
  {
    name: "weekly-contest-339",
    start: "3/26/2023, 8:00:00 AM",
    duration: "90 min",
    predcited: "No",
    predictedTime: "3/26/2023, 10:08:40 AM",
  },
  {
    name: "weekly-contest-339",
    start: "3/26/2023, 8:00:00 AM",
    duration: "90 min",
    predcited: "No",
    predictedTime: "3/26/2023, 10:08:40 AM",
  },
  {
    name: "weekly-contest-339",
    start: "3/26/2023, 8:00:00 AM",
    duration: "90 min",
    predcited: "No",
    predictedTime: "3/26/2023, 10:08:40 AM",
  },
  {
    name: "weekly-contest-339",
    start: "3/26/2023, 8:00:00 AM",
    duration: "90 min",
    predcited: "No",
    predictedTime: "3/26/2023, 10:08:40 AM",
  },
  {
    name: "weekly-contest-339",
    start: "3/26/2023, 8:00:00 AM",
    duration: "90 min",
    predcited: "No",
    predictedTime: "3/26/2023, 10:08:40 AM",
  },
  {
    name: "weekly-contest-339",
    start: "3/26/2023, 8:00:00 AM",
    duration: "90 min",
    predcited: "No",
    predictedTime: "3/26/2023, 10:08:40 AM",
  },
  {
    name: "weekly-contest-339",
    start: "3/26/2023, 8:00:00 AM",
    duration: "90 min",
    predcited: "No",
    predictedTime: "3/26/2023, 10:08:40 AM",
  },
];

const Home = () => {
  // return (
  //   <div>
  //     <h1>Leetcode Rating Predictor</h1>
  //     {/* {data.length === 0 ? (
  //       <p>Loading...</p>
  //     ) : (
  //       data.map((item1) => {
  //         return (
  //           <p>
  //             <div>Username : {item1.username}</div>
  //             <div> Previous Rating : {item1.rating}</div>
  //             <div> Predicted Rating : {item1.predictedRating}</div>
  //             <div> Rank : {item1.rank}</div>
  //             <div>
  //               {" "}
  //               First contest : {item1.isFirstContest ? "True" : "False"}
  //             </div>
  //             <div> Region : {item1.region}</div>
  //           </p>
  //         );
  //       })
  //     )} */}
  //   </div>
  // );
  return (
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
              <th scope="col" className=" px-4 py-2">
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
                <tr className="border-b dark:border-neutral-500">
                  <td className="whitespace-nowrap  px-6 py-4 font-medium">
                    {index + 1}
                  </td>
                  <td className="whitespace-nowrap  px-6 py-4 text-[16px]">
                    {contest.name}
                  </td>
                  <td className="whitespace-nowrap  px-6 py-4">
                    {contest.start}
                  </td>
                  <td className="whitespace-nowrap  px-6 py-4">
                    {contest.duration}
                  </td>
                  <td className="whitespace-nowrap  px-6 py-4">
                    {contest.predcited}
                  </td>
                  <td className="whitespace-nowrap  px-6 py-4">
                    {contest.predictedTime}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
