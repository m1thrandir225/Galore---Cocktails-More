import { useState } from "react";

interface ISidebarProps {
  collapsed: boolean;
  user: string;
  loading: boolean;
}

const Sidebar: React.FC<ISidebarProps> = ({ collapsed, loading, user }) => {
  return (
    <div
      className={`${
        collapsed ? "w-24" : "w-72"
      } bg-gray-100 flex flex-col justify-start items-start h-screen shadow-lg`}
    >
      <div className="w-full h-auto bg-gray-200 flex flex-col justify-center items-center p-8 gap-4">
        <img
          src={"/vite.svg"}
          alt="Vite Logo"
          className={`${
            collapsed ? "w-8 h-8" : "h-16 w-16"
          } object-contain rounded-full border-2 border-gray-800`}
        />
        {collapsed ? null : (
          <h1 className="text-2xl font-bold font-sans text-gray-800">
            Hello, User
          </h1>
        )}
      </div>
      <div className="w-full h-auto flex flex-col justify-start items-start p-8 gap-4"></div>
    </div>
  );
};

export default Sidebar;
