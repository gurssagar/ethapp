"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Octokit } from "octokit";
import Menu from "../../components/menu/page";
import Request from "../../components/ui/Request";
import dynamic from "next/dynamic";

const BountyRequests = () => {
  const [userData, setUserData] = useState([]);
  const [data, setData] = useState();
  const router = useRouter();
  const [reRender, setReRender] = useState(false);
  const [octokit, setOctokit] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      if (typeof window !== "undefined") {
        const storedData = window.localStorage.getItem("access_token");
        if (window.location.search && !storedData) {
          try {
            const params = new URLSearchParams(window.location.search);
            const code = params.get("code");
            if (code) {
              const response = await fetch(
                `https://ethapp-wine.vercel.app/getAccessToken?code=${code}`
              );
              const data = await response.json();
              if (data.access_token) {
                window.localStorage.setItem("accessToken", data.access_token);
                setReRender((prev) => !prev);
              }
            }
          } catch (error) {
            console.error("Error getting access token:", error);
          }
        }
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    const fetchBounties = async () => {
      try {
        const response = await fetch(
          "https://ethapp-wine.vercel.app/api/contribute"
        );
        const data = await response.json();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching bounties:", error);
      }
    };

    fetchBounties();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const user = window.localStorage.getItem("accessToken");
      if (user) {
        try {
          const response = await fetch(
            "https://ethapp-wine.vercel.app/getUserData",
            {
              headers: {
                Authorization: `Bearer ${user}`,
              },
            }
          );
          const data = await response.json();
          setData(data.login);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, []);

  const authenticateGitHub = async (formData) => {
    try {
      const accessToken = window.localStorage.getItem("accessToken");
      if (accessToken) {
        const octokit = new Octokit({
          auth: accessToken,
        });
        setOctokit(octokit);

        const response = await octokit.request(
          `PATCH /repos/${formData.repository}/issues/${formData.repoOwner}`,
          {
            issue_number: formData.repoOwner,
            assignees: [formData.contributorUsername],
            state: "open",
            labels: ["bug"],
            headers: {
              "X-GitHub-Api-Version": "2022-11-28",
            },
          }
        );
        console.log(response);
      }
    } catch (error) {
      console.error("GitHub authentication failed:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      repository: e.target.elements.repository.value,
      repoOwner: e.target.elements.repoOwner.value,
      contributorUsername: e.target.elements.contributorUsername.value,
    };
    authenticateGitHub(formData);
  };

  return (
    <>
      <Menu />
      <div className="mt-40">
        <div className="text-3xl font-bold text-center mb-4 pb-20">
          Contribution Requests
        </div>
        <div className="grid grid-cols-3 gap-y-10">
          {userData.map((user, index) => (
            <Request key={index} user={user} onSubmit={handleSubmit} />
          ))}
        </div>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(BountyRequests), {
  ssr: false,
});
