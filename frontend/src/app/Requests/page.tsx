'use client'
import Menu from "@/components/menu/page";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {Octokit} from "octokit";

export default function BountyRequests() {
    const [userData, setUserData] = useState<any[]>([]);
    const [data, setData] = useState();
    const router = useRouter();
    const [reRender, setReRender] = useState(false);
    const [userDatad, setDatao] = useState();
    const [octokit, setOctokit] = useState<Octokit | null>(null);



    //github auth



    useEffect(() => {
        const timeout = setTimeout(() => {
            const formData = {
                repository: document.getElementsByClassName('one')[0] ,
                repoOwner: document.getElementsByClassName('two')[0],
                contributorUsername: document.getElementsByClassName('three')[0]
            };
            console.log(formData.repository.value,"123123")
        }, 100);
    
        return () => clearTimeout(timeout);
    }, []);
    
    useEffect(() => {
        const queryString = window.location.search;
        let storedData = localStorage.getItem("access_token");
        if (sessionStorage.getItem("code") && (storedData === null)) {
            async function getAccessToken() {
                await fetch("https://ethapp-wine.vercel.app/getAccessToken?code=" + sessionStorage.getItem("code"), {
                    method: "GET"
                }).then(response => {
                    return response.json()
                }).then((data) => {
                    console.log(data);
                    if (data.access_token) {
                        localStorage.setItem("accessToken", data.access_token);
                        setReRender(!reRender);
                    }
                });

                await fetch("https://ethapp-wine.vercel.app/getUserData", {
                    method: "GET",
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("accessToken")
                    }
                }).then(response => response.json())
                    .then((data) => {
                        setData(data.login);
                        console.log(data.login, "3132423");
                    });
            }
            getAccessToken()
        }
        console.log(userDatad, "userDatad")

        function fetchBounties() {
            fetch(`https://ethapp-wine.vercel.app/api/contribute`)
                .then((res) => res.json())
                .then((data) => {
                    setUserData(data)
                    console.log(userData, "data")
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                });
        }
        fetchBounties();
    }, []);

    function acceptContribution() {
        console.log("accepted")
    }

    function onSubmit(e: React.FormEvent) {
        e.preventDefault();
        const formData = {
            repository: e.target.elements.repository.value,
            repoOwner: e.target.elements.repoOwner.value,
            contributorUsername: e.target.elements.contributorUsername.value
        };
        
        // Call authenticateGitHub with formData
        authenticateGitHub(formData);
    }

    const authenticateGitHub = async (formData: {
            repository: string;
            repoOwner: string;
            contributorUsername: string;
        }) => {
        try {
        const accessToken = localStorage.getItem("accessToken");
        
        if (accessToken) {
            const octokit = new Octokit({
                auth: accessToken
            });
            setOctokit(octokit);
            console.log(octokit, "octokit")

            // Use the form data in the API request
            const response = await octokit.request(
                `PATCH /repos/${formData.repository}/issues/${formData.repoOwner}`,
                {
                    issue_number:formData.repoOwner,
                    assignees: [formData.contributorUsername],
                    state: 'open',
                    labels: [
                      'bug'
                    ],
                    headers: {
                      'X-GitHub-Api-Version': '2022-11-28'
                    }
                    
                }
            );
        }
        } catch (error) {
        console.error('GitHub authentication failed:', error);
        }
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
                    
                    <form onSubmit={onSubmit} className="  bg-[#121212] p-10 rounded-xl mx-auto">
                    <div className=" request-info flex flex-col gap-4 mb-6">
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