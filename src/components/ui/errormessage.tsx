import React from "react";

interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  if (!message) return null; // Don't render anything if no error

  return <p className="text-red-500 text-sm mt-1">{message}</p>;
};

export default ErrorMessage;
