import React from "react";
import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
  const navigate = useNavigate();
  const goToHome = async () => {
    let path = "/";
    navigate(path);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex flex-col sm:w-[768px] w-[390px]">
        <div className="pt-[120px] flex flex-col gap-10 p-4">
          <div className="flex flex-col justify-center items-center py-5">
            <h1 className=" text-[32px] font-bold">Oops 404 Error</h1>
            <h2>Page not exist</h2>
          </div>
          <button
            onClick={goToHome}
            className="flex flex-row gap-2 items-center justify-center p-3 text-white font-semibold text-[16px]  rounded-[16px] bg-[#85a236]">
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}
