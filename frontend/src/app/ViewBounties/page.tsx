"use client";
import React from "react";
import dynamic from "next/dynamic";
import Menu from "@/components/menu/page";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Octokit } from "octokit";
import BountyCard from "../../components/ui/BountyCard"; // Import the new component

const ViewBounties: React.FC = () => {
  const [userData, setUserData] = useState<any[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [modal, ChangeModal] = useState(false);
  const [octokit, setOctokit] = useState<Octokit | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchBounties();
  }, []);

  useEffect(() => {
    updateBounties();
  }, [currentPage]);

  const fetchBounties = async () => {
    const res = await fetch(
      `https://ethapp-wine.vercel.app/api/bounties?page=${currentPage}`
    );
    const data = await res.json();
    setUserData(data.data);
    console.log(data.data, "akk");
    setTotalPages(data.totalPages);
  };

  const updateBounties = async () => {
    fetchBounties();
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const [userId, setUserId] = useState("");
  const [contributorUsername, setRepoContributor] = useState("");
  const [repoOwner, setRepoOwner] = useState("");
  const [githubRepo, setRepo] = useState("");
  const [contribution, setContribution] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleInvestigate = (repo: string, issue: string) => {
    ChangeModal(true);
    setRepoOwner(issue);
    setRepo(repo);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (typeof window !== "undefined") {
        const accessToken = window.localStorage.getItem("accessToken");
        if (accessToken) {
          const octokit = new Octokit({
            auth: accessToken,
          });
          setOctokit(octokit);

          const response = await octokit.request(
            `POST /repos/${githubRepo}/issues/${repoOwner}/comments`,
            {
              body: "Please assign me this issue",
              headers: {
                "X-GitHub-Api-Version": "2022-11-28",
              },
            }
          );
          response;
        }
      }

      const formData = {
        contributorUsername,
        repoOwner,
        githubRepo,
        accepted: false,
      };

      const response = await fetch(
        "https://ethapp-wine.vercel.app/api/contribute",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSuccess(true);
        setRepoContributor("");
        setRepoOwner("");
        setRepo("");
        setContribution("");
      } else {
        setSuccess(false);
        const errorData = await response.json();
        // Handle error response, e.g., setErrorMessage(errorData.message)
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Menu />
      <div className="mt-40">
        <h1 className="pb-20 mt-20 text-4xl font-bold text-center mt-8">
          View bounties
        </h1>
      </div>
      <div className="grid grid-cols-3 gap-8 p-4">
        {userData?.map((user: any, index: number) => (
          <React.Fragment key={index}>
            <BountyCard
              title={user.title}
              difficulty={user.difficulty}
              status={user.status}
              oneLiner={user.oneLiner}
              description={user.description}
              githubRepo={user.githubRepo}
              githubIssue={user.githubIssue}
              rewardAmount={user.rewardAmount}
              paymentToken={user.paymentToken}
              onInvestigate={() =>
                handleInvestigate(user.githubRepo, user.githubIssue)
              }
            />
          </React.Fragment>
        ))}
      </div>

      {/* Modal remains the same */}
      {modal && (
        <div className="rounded-xl border-2 border-gray-300 dark:border-[#28282b] py-10 px-5 fixed m-auto max-w-[30rem] max-h-[28rem] inset-0 items-center justify-center z-50 backdrop-blur-xl">
          <div className="justify-between flex">
            <div className="text-[22px] font-bold">Contribute</div>
            <button onClick={() => ChangeModal(false)}>X</button>
          </div>
          <div className="text-sm">
            Contribute and earn rewards for your contributions.
          </div>
          <form onSubmit={handleSubmit} className="mb-6">
            <div className="gap-y-2">
              <div className="flex py-2">
                <label
                  htmlFor="contributorUsername"
                  className="w-1/4 my-4 inline-block align-[24px] mb-2 text-gray-800 dark:text-gray-100"
                >
                  Github Username
                </label>
                <input
                  type="string"
                  id="contributorUsername"
                  value={contributorUsername}
                  onChange={(e) => setRepoContributor(e.target.value)}
                  className="w-3/4 block w-full p-2 mt-2 text-gray-900 bg-gray-50 border-gray-200 dark:text-white dark:bg-gray-950 border dark:border-gray-600 rounded focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="flex py-2">
                <label
                  htmlFor="repoOwner"
                  className="w-1/4 my-4 inline-block align-[24px] mb-2 text-gray-800 dark:text-gray-100"
                >
                  Repo Owner
                </label>
                <input
                  type="string"
                  id="repoOwner"
                  value={repoOwner}
                  onChange={(e) => setRepoOwner(e.target.value)}
                  readOnly
                  className="w-3/4 block w-full p-2 mt-2 text-gray-900 bg-gray-50 border-gray-200 dark:text-white dark:bg-gray-950 border dark:border-gray-600 rounded focus:outline-none focus:border-indigo-500 cursor-not-allowed"
                />
              </div>
              <div className="flex py-2">
                <label
                  htmlFor="githubRepo"
                  className="w-1/4 my-4 inline-block align-[24px] mb-2 text-gray-800 dark:text-gray-100"
                >
                  Github Repo
                </label>
                <input
                  type="string"
                  id="githubRepo"
                  value={githubRepo}
                  onChange={(e) => setRepo(e.target.value)}
                  readOnly
                  className="w-3/4 block w-full p-2 mt-2 text-gray-900 bg-gray-50 border-gray-200 dark:text-white dark:bg-gray-950 border dark:border-gray-600 rounded focus:outline-none focus:border-indigo-500 cursor-not-allowed"
                />
              </div>
              <div className="flex justify-end">
                <div></div>
                <button
                  type="submit"
                  className="mt-4 py-2 px-4 text-white bg-black dark:text-black rounded dark:bg-white hover:bg-gray-950"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* Pagination controls */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 mb-8">
          <button
            onClick={() => {
              if (currentPage > 1) handlePageChange(currentPage - 1);
            }}
            className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-white font-semibold py-2 px-4 rounded-lg transition mr-2"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition mx-2">
            {currentPage}
          </button>
          <button
            onClick={() => {
              if (currentPage < totalPages) handlePageChange(currentPage + 1);
            }}
            className="bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-white font-semibold py-2 px-4 rounded-lg transition ml-2"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default dynamic(() => Promise.resolve(ViewBounties), {
  ssr: false,
});
