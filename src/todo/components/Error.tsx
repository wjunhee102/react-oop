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
  // eslint-disable-next-line
  }, []);

  if(!error) {
    return null;
  }

  return (
    <div className="absolute top-0 left-0 flex items-center justify-center w-screen h-screen bg-slate-700 bg-opacity-40">
      <div className="bg-white rounded shadow">
        <p>{error}</p>

        <div className="flex justify-center w-full">
          <button onClick={closeError}>
            확인
          </button>
        </div>
      </div>
    </div>
  );
}

export default Error;