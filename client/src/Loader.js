import React from "react";
import { InfinitySpin } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex justify-center items-center mt-[300px]">
      <InfinitySpin width="200" color="#243c5a" />
    </div>
  );
};

export default Loader;
