'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Octokit } from "octokit";
import Menu from '../../components/menu/page'
import dynamic from "next/dynamic";

const  BountyRequests = () => {
    const [userData, setUserData] = useState([]);
    const [data, setData] = useState();
    const router = useRouter();
    const [reRender, setReRender] = useState(false);
    const [userDatad, setDatao] = useState();
    const [octokit, setOctokit] = useState(null);

    useEffect(() => {
        const checkAuth = async () => {
            if (typeof window !== 'undefined') {
                const storedData = window.localStorage.getItem("access_token");
                if (window.location.search && !storedData) {
                    try {
                        const params = new URLSearchParams(window.location.search);
                        const code = params.get('code');
                        if (code) {
                            const response = await fetch(`https://ethapp-wine.vercel.app/getAccessToken?code=${code}`);
                            const data = await response.json();
                            if (data.access_token) {
                                window.localStorage.setItem("accessToken", data.access_token);
                                setReRender(prev => !prev);
                            }
                        }
                    } catch (error) {
                        console.error("Error getting access token:", error);
                    }
                }
            }
        };

        if (typeof window !== 'undefined') {
            checkAuth();
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const fetchBounties = async () => {
                try {
                    const response = await fetch("https://ethapp-wine.vercel.app/api/contribute");
                    const data = await response.json();
                    setUserData(data);
                } catch (error) {
                    console.error("Error fetching bounties:", error);
                }
            };

            fetchBounties();
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const user = window.localStorage.getItem("accessToken");
            if (user) {
                fetch("https://ethapp-wine.vercel.app/getUserData", {
                    headers: {
                        "Authorization": `Bearer ${user}`
                    }
                })
                    .then(response => response.json())
                    .then(data => {
                        setData(data.login);
                    })
                    .catch(error => {
                        console.error("Error fetching user data:", error);
                    });
            }
        }
    }, []);

    function acceptContribution() {
        console.log("accepted")
    }

    function onSubmit(e) {
        e.preventDefault();
        const formData = {
            repository: e.target.elements.repository.value,
            repoOwner: e.target.elements.repoOwner.value,
            contributorUsername: e.target.elements.contributorUsername.value
        };

        authenticateGitHub(formData);
    }

    const authenticateGitHub = async (formData) => {
        try {
            if (typeof window !== 'undefined') {
                const accessToken = window.localStorage.getItem("accessToken");
                if (accessToken) {
                    const octokit = new Octokit({
                        auth: accessToken
                    });
                    setOctokit(octokit);

                    try {
                        const response = await octokit.request(
                            `PATCH /repos/${formData.repository}/issues/${formData.repoOwner}`,
                            {
                                issue_number: formData.repoOwner,
                                assignees: [formData.contributorUsername],
                                state: 'open',
                                labels: ['bug'],
                                headers: {
                                    'X-GitHub-Api-Version': '2022-11-28'
                                }
                            }
                        );
                        console.log(response);
                    } catch (error) {
                        console.error('GitHub API request failed:', error);
                    }
                }
            }
        } catch (error) {
            console.error('GitHub authentication failed:', error);
        }
    };

    return (
        <>
        <Menu/>
            <div className="mt-40">
                <div className="text-3xl font-bold text-center mb-4 pb-20">
                    Contribution Requests
                </div>
                <div className="grid grid-cols-3 gap-y-10">
                    {userData.map((user, index) => (
                        <form onSubmit={onSubmit} key={index} className="bg-[#121212] p-10 rounded-xl mx-auto">
                            <div className="request-info flex flex-col gap-4 mb-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-700 font-medium dark:text-white">Repository:</span>
                                    <input
                                        type="text"
                                        name="repository"
                                        className="text-gray-600 dark:text-white"
                                        value={user.githubRepo}
                                        readOnly
                                    />
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-700 font-medium dark:text-white">Repo Owner:</span>
                                    <input
                                        type="text"
                                        name="repoOwner"
                                        className="text-gray-600 dark:text-white"
                                        value={user.repoOwner}
                                        readOnly
                                    />
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-700 font-medium dark:text-white">Contributor:</span>
                                    <input
                                        type="text"
                                        name="contributorUsername"
                                        className="text-gray-600 dark:text-white"
                                        value={user.contributorUsername}
                                        readOnly
                                    />
                                </div>
                                <div className="block space-x-4 gap-4">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                                    >
                                        Accept Contribution
                                    </button>
                                    <button
                                        type="button"
                                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                                    >
                                        Reject Contribution
                                    </button>
                                </div>
                            </div>
                        </form>
                    ))}
                </div>
            </div>
        </>
    )
}

export default dynamic(() => Promise.resolve(BountyRequests), {
    ssr: false
});