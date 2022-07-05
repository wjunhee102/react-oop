import React, { useCallback } from "react";

interface ErrorProps {
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
}

const Error: React.FC<ErrorProps> = ({
  error,
  setError
}) => {

  const closeError = useCallback(() => {
    setError(null);
  }, []);

  if(!error) {
    return null;
  }

  return (
    <div className="absolute flex justify-center items-center left-0 top-0 w-screen h-screen bg-slate-700 bg-opacity-40">
      <div className="bg-white shadow rounded">
        <p>{error}</p>

        <div className="w-full flex justify-center">
          <button onClick={closeError}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

export default Error;