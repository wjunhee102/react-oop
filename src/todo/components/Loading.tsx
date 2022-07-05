import React from "react";

interface LoadingProps {
  isLoading: boolean;
  children: React.ReactNode;
}

const Loading: React.FC<LoadingProps> = ({
  isLoading,
  children
}) => {

  if(isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center text-lg">
        로딩중...
      </div>
    );
  }

  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  ) 
}

export default Loading;