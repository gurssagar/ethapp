"use client";
import { useState, useEffect, useContext } from "react";
import { Octokit } from "octokit";
import dynamic from "next/dynamic";
import Link from "next/link";
import Menu from "../../components/menu/page";
const PrComponent = () => {
  const [repos, setRepos] = useState<any[]>([]);
  const [octokit, setOctokit] = useState<Octokit | null>(null);
  const [userData, setUserData] = useState<any[]>([]);
  const fetchBounties = async () => {
    const res = await fetch(`https://ethapp-wine.vercel.app/api/totalbounties`);
    const data = await res.json();
    setUserData(data.data);
    console.log(data.data, "akk");
    };


  const fetchRepos = async () => {
    try {
      if (typeof window !== "undefined") {
        const accessToken = window.localStorage.getItem("accessToken");
        console.log(accessToken);
        if (accessToken && !octokit) {
          const client = new Octokit({
            auth: accessToken,
          });
          setOctokit(client);
        }

        if (octokit) {
          const response = await octokit.request("GET /user/repos", {
            headers: {
              "X-GitHub-Api-Version": "2022-11-28",
            },
            sort: "updated",
            per_page: 100,
          });
          setRepos(response.data);
        }
      }
    } catch (error) {
      console.error("GitHub API request failed:", error);
    }
  };

  useEffect(() => {
    fetchRepos();
    fetchBounties();
  }, [octokit]);
  console.log(repos);

  return (
    <>
      <Menu />
      <div>
        <div className="mt-40 grid grid-cols-3 px-4 py-10">
          {repos.map((repo) => {
            return (
              <>
                <div className="m-10 bg-gradient-to-br from-purple-900 to-black rounded-xl overflow-hidden shadow-lg border border-purple-700">
                  <div className="p-5">
                    {/* Header with app icon and name */}
                    <div className="flex items-center gap-3 mb-3">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                          {/* Custom music icon */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-white"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M9 18V5l12-2v13" />
                            <circle cx="6" cy="18" r="3" />
                            <circle cx="18" cy="16" r="3" />
                          </svg>
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-pink-500 flex items-center justify-center">
                          <div className="w-3 h-1 bg-white rounded-full"></div>
                        </div>
                      </div>
                      <div>
                        <h2 className="text-white font-bold text-xl">
                          {repo.name}
                        </h2>
                        <div className="flex items-center space-x-2 text-gray-400 text-sm">
                          <span>★ 20</span>
                          <span>🍴 143</span>
                          <span>👤 118</span>
                        </div>
                      </div>
                      <div className="ml-auto">
                        <a href={`${repo.html_url}`}>
                          <button className="p-2 rounded-full hover:bg-gray-800">
                            {/* Custom link icon */}
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 text-gray-400"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                            </svg>
                          </button>
                        </a>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="rounded-lg bg-gray-900 px-4 py-3">
                        <div className="text-gray-400 text-xs mb-1">
                          Open issues
                        </div>
                        <div className="flex items-center">
                          <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                          <span className="text-white font-bold text-2xl">
                            {repo.open_issues_count}
                          </span>
                        </div>
                      </div>
                      <div className="rounded-lg bg-gray-900 px-4 py-3">
                        <div className="text-gray-400 text-xs mb-1">
                          Good first issues
                        </div>
                        <div className="flex items-center">
                          <div className="w-4 h-4 rounded-full bg-green-500 mr-2"></div>
                          <span className="text-white font-bold text-2xl">
                            {repo.open_issues_count}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="mb-4">
                      <p className="text-gray-300 text-sm">
                        {repo.description}..
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex space-x-2 mb-4">
                      <span className="px-3 py-1 rounded-full bg-gray-800 text-xs text-gray-300">
                        DeFi
                      </span>
                      <span className="px-3 py-1 rounded-full bg-gray-800 text-xs text-gray-300">
                        Gaming
                      </span>
                    </div>

                    {/* Progress bars */}
                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center text-xs text-white mr-2">
                        TS
                      </div>
                      <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500"
                          style={{ width: "67%" }}
                        ></div>
                      </div>
                      <span className="ml-2 text-blue-500 text-sm">67%</span>
                    </div>

                    <div className="flex items-center mb-2">
                      <div className="w-8 h-8 rounded-full bg-yellow-900 flex items-center justify-center text-xs text-white mr-2">
                        JS
                      </div>
                      <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-yellow-500"
                          style={{ width: "23%" }}
                        ></div>
                      </div>
                      <span className="ml-2 text-yellow-500 text-sm">23%</span>
                    </div>

                    <div className="flex items-center">
                      <span className="text-gray-400 text-sm ml-10">+ 10%</span>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
          {repos.map((repo) => (
            <div
              key={repo.id}
              className="bg-gray-900 rounded-xl py-6 px-6 mx-20 my-10 "
            >
              <h3>{repo.full_name}</h3>
              <button className="bg-white text-black py-2 px-4 mt-5">
                View Code
              </button>
              <Link
                href={{
                  pathname: `/PullRequests/${repo.id}`,
                  query: { search: repo.full_name },
                }}
              >
                {repo.full_name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(PrComponent), {
  ssr: false,
});
