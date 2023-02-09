import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3500/api/routes/leetcode")
      .then((res) => {
        setData(res.data);
        console.log(JSON.stringify(res.data));
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
          return item.map((item1) => {
            return (
              <p>
                <div>Username : {item1.username}</div>
                <div> Previous Rating : {item1.rating}</div>
              </p>
            );
          });
        })
      )}
    </div>
  );
};

export default App;
