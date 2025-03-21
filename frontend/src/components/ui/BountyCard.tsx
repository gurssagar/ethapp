"use client";

import React from "react";
import Link from "next/link";

interface BountyCardProps {
  title: string;
  difficulty: string;
  status: string;
  oneLiner: string;
  description: string;
  githubRepo: string;
  githubIssue: string;
  rewardAmount: string;
  paymentToken: string;
  onInvestigate: (repo: string, issue: string) => void;
}

const BountyCard: React.FC<BountyCardProps> = ({
  title,
  difficulty = "Medium",
  status = "Live",
  oneLiner,
  description,
  githubRepo,
  githubIssue,
  rewardAmount,
  paymentToken,
  onInvestigate,
}) => {
  return (
    <div className=" mx-10  bg-black rounded-3xl overflow-hidden border border-gray-800 shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col">
          <h2 className="text-white text-3xl font-bold">{title}</h2>
          <div className="flex items-center mt-1 space-x-3">
            <div className="flex items-center space-x-1">
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                  stroke="#6B7280"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="text-gray-400 text-sm">Difficulty: </span>
              <span
                className={`px-2 py-0.5 rounded text-xs font-medium ${
                  difficulty === "Easy"
                    ? "bg-green-400 text-black"
                    : difficulty === "Medium"
                    ? "bg-purple-500 text-white"
                    : "bg-red-500 text-white"
                }`}
              >
                {difficulty}
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.03L12 21.35Z"
                  stroke="#6B7280"
                  strokeWidth="2"
                />
              </svg>
              <span className="text-gray-400 text-sm">Status: </span>
              <span
                className={`px-2 py-0.5 rounded text-xs font-medium ${
                  status === "Live"
                    ? "bg-green-400 text-black"
                    : status === "Pending"
                    ? "bg-purple-500 text-white"
                    : "bg-gray-500 text-white"
                }`}
              >
                {status}
              </span>
            </div>
          </div>
        </div>
        <div className="bg-gray-900 w-10 h-10 rounded-full flex items-center justify-center border border-purple-400">
          <svg
            viewBox="0 0 24 24"
            width="20"
            height="20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="#8B5CF6"
              strokeWidth="2"
            />
            <path
              d="M10.5 7.5L15.5 12L10.5 16.5"
              stroke="#8B5CF6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 mb-6">
        <div className="bg-gray-900 rounded-xl p-4 border-l-4 border-purple-500">
          <h3 className="text-gray-400 text-sm mb-1">One-Liner</h3>
          <p className="text-white">{oneLiner}</p>
        </div>
      </div>

      <p className="text-gray-400 mb-6">{description}</p>

      <div className="flex space-x-2 mb-6">
        <div className="px-4 py-2 bg-gray-900 rounded-xl text-gray-300 text-sm flex items-center">
          <svg
            className="w-4 h-4 mr-2"
            fill="#8B5CF6"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 1.944A11.954 11.954 0 0 1 2.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0 1 10 1.944zM11 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm0-7a1 1 0 1 0-2 0v3a1 1 0 1 0 2 0V7z"
              clipRule="evenodd"
            />
          </svg>
          Repository:
          <Link
            href={`https://www.github.com/${githubRepo}`}
            className="text-teal-300 hover:text-teal-200 ml-1 underline"
          >
            {githubRepo}
          </Link>
        </div>
        <div className="px-4 py-2 bg-gray-900 rounded-xl text-gray-300 text-sm flex items-center">
          <svg
            className="w-4 h-4 mr-2"
            fill="#8B5CF6"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0zm-7 4a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm-1-9a1 1 0 0 0-1 1v4a1 1 0 1 0 2 0V6a1 1 0 0 0-1-1z"
              clipRule="evenodd"
            />
          </svg>
          Issue:
          <Link
            href={`https://www.github.com/${githubRepo}/issues/${githubIssue}`}
            className="text-teal-300 hover:text-teal-200 ml-1 underline"
          >
            #{githubIssue}
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-between h-14 bg-gray-900 rounded-2xl px-4 border border-purple-500/30">
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-teal-300 flex items-center justify-center text-black font-bold text-sm">
            💰
          </div>
          <div className="ml-2">
            <p className="text-xs text-gray-400">Reward</p>
            <p className="text-white font-bold">
              {rewardAmount} {paymentToken}
            </p>
          </div>
        </div>
        <button
          onClick={() => onInvestigate(githubRepo, githubIssue)}
          className="bg-gradient-to-r from-purple-500 to-teal-400 hover:from-purple-600 hover:to-teal-500 text-black font-medium py-2 px-4 rounded-xl transition duration-200 transform hover:scale-105"
        >
          Investigate
        </button>
      </div>
    </div>
  );
};

export default BountyCard;
