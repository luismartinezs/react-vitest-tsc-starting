import React from "react";
import IconSun from "~icons/heroicons-outline/sun.jsx";

interface HelloWorldProps {
  message: string;
}

const HelloWorld: React.FC<HelloWorldProps> = ({ message }): JSX.Element => {
  return (
    <h1 className="text-xl font-bold flex items-center">
      <IconSun /> <span>{message}</span>
    </h1>
  );
};

export default HelloWorld;
