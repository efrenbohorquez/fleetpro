
import React from 'react';

interface CardProps {
  title: string;
  value: string;
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ title, value, children }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h4 className="text-gray-500 font-medium">{title}</h4>
      <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
      {children}
    </div>
  );
};
