"use client";
import React from "react";

interface User {
  githubRepo: string;
  repoOwner: string;
  contributorUsername: string;
}

interface RequestProps {
  user: User;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onReject?: () => void;
}

const Request: React.FC<RequestProps> = ({ user, onSubmit, onReject }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-[#121212] p-6 rounded-xl mx-auto w-full max-w-md border border-gray-800 shadow-lg"
    >
      <div className="request-info flex flex-col gap-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-400 font-medium">Repository:</span>
          <input
            type="text"
            name="repository"
            className="text-white bg-transparent text-right font-semibold outline-none"
            value={user.githubRepo}
            readOnly
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400 font-medium">Repo Owner:</span>
          <input
            type="text"
            name="repoOwner"
            className="text-white bg-transparent text-right font-semibold outline-none"
            value={user.repoOwner}
            readOnly
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400 font-medium">Contributor:</span>
          <input
            type="text"
            name="contributorUsername"
            className="text-white bg-transparent text-right font-semibold outline-none"
            value={user.contributorUsername}
            readOnly
          />
        </div>
        <div className="flex justify-between mt-4 gap-3">
          <button
            type="submit"
            className="bg-gradient-to-r from-purple-500 to-teal-400 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex-1 font-medium"
          >
            Accept
          </button>
          <button
            type="button"
            onClick={onReject}
            className="bg-gradient-to-r from-purple-700 to-teal-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors flex-1 font-medium"
          >
            Reject
          </button>
        </div>
      </div>
    </form>
  );
};

export default Request;
