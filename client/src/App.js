import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    // const res = axios.get("http://localhost:3500/api/routes/leetcode")
    // .then((res) => {
    //   setData(res);
    // )
    // .catch((error)=>{
    //   console.log(error)
    // })
    axios
      .get("http://localhost:3500/api/routes/leetcode")
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      {data.length === 0 ? (
        <p>Loading...</p>
      ) : (
        data.map((item) => {
          return <div>{item}<br/></div>;
        })
      )}
    </div>
  );
};

export default App;
