import React from "react";

interface Title {
  title: string;
}

const BatikTitle: React.FC<Title> = ({ title }) => {
  return (
    <div className="justify-self-center">
      <h1 className="text-center font-serif text-3xl mt-3">
        {title.toUpperCase()}
      </h1>
    </div>
  );
};

export default BatikTitle;
