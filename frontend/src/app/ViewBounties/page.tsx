'use client'
import dynamic from 'next/dynamic'
import Menu from "@/components/menu/page";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Octokit } from "octokit";

const ViewBounties: React.FC = ()=> {
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
        const res = await fetch(`https://ethapp-wine.vercel.app/api/bounties?page=${currentPage}`);
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
    const [contributorUsername, setRepoContributor] = useState('');
    const [repoOwner, setRepoOwner] = useState('');
    const [githubRepo, setRepo] = useState('');
    const [contribution, setContribution] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (typeof window !== 'undefined') {
                const accessToken = window.localStorage.getItem("accessToken");
                if (accessToken) {
                    const octokit = new Octokit({
                        auth: accessToken
                    });
                    setOctokit(octokit);

                    const response = await octokit.request(
                        `POST /repos/${githubRepo}/issues/${repoOwner}/comments`,
                        {
                            body: "Please assign me this issue",
                            headers: {
                                'X-GitHub-Api-Version': '2022-11-28'
                            }
                        }
                    );
                }
            }

            const formData = {
                contributorUsername,
                repoOwner,
                githubRepo,
                accepted: false
            };

            const response = await fetch('https://ethapp-wine.vercel.app/api/contribute', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                setSuccess(true);
                setRepoContributor('');
                setRepoOwner('');
                setRepo('');
                setContribution('');
            } else {
                setSuccess(false);
                const errorData = await response.json();
                // Handle error response, e.g., setErrorMessage(errorData.message)
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setSuccess(false);
        } finally {
            setLoading(false);
        }
    };

    console.log(userData, "add");
    return (
        <>
            <Menu />
            <div className=" mt-40 ">
                <h1 className="pb-20 mt-20 text-4xl font-bold text-center mt-8">View bounties</h1>
            </div>
            <div className="grid grid-cols-3 gap-8 p-4">
                {userData?.map((user: any, index: number) => (
                    <>
                        <div key={index} className="dark:bg-black dark:text-white p-6 bg-white rounded-2xl shadow-lg border border-[#28282b]">
                            <h1 className="text-2xl font-semibold dark:text-white text-gray-800 mb-3">{user.title}</h1>

                            <div className="flex items-center justify-between dark:text-white text-sm text-gray-600 mb-4">
                                <p className="font-medium dark:text-white">Difficulty: 
                                    <span className={`ml-1 px-2 py-1 rounded text-white bg-gray-800 text-black`}>
                                        {user.difficulty || 'Medium'}
                                    </span>
                                </p>
                                <p>Status: 
                                    <span className="dark:text-black ml-1 px-2 py-1 rounded text-black bg-white">
                                        {user.status || 'Live'}
                                    </span>
                                </p>
                            </div>

                            <p className="text-gray-700 text-lg mb-2 dark:text-white"><strong>One-Liner:</strong> {user.oneLiner}</p>
                            <p className="text-gray-600 text-base mb-4 dark:text-white">{user.description}</p>

                            <div className="dark:text-white space-y-2 text-sm">
                                <p>📂 <span className="font-semibold">Repository:</span> 
                                    <a href={"https://www.github.com/" + user.githubRepo} className="text-blue-500 hover:underline ml-1">
                                        {user.githubRepo}
                                    </a>
                                </p>
                                <p>🐛 <span className="font-semibold">Issue:</span> 
                                    <a href={"https://www.github.com/" + user.githubRepo + "/issues/" + user.githubIssue} className="text-blue-500 hover:underline ml-1">
                                        {user.githubIssue}
                                    </a>
                                </p>
                            </div>

                            <div className="flex items-center dark:text-white justify-between mt-5">
                                <p className="text-lg font-semibold dark:text-white text-gray-700">💰 Reward: {`${user.rewardAmount}${user.paymentToken}` || '100 USDC'}</p>
                                <button className="dark:text-black bg-white hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition" onClick={() => {
                                    ChangeModal(true);
                                    setRepoOwner(user.githubIssue);
                                    setRepo(user.githubRepo);
                                }}>
                                    Investigate
                                </button>
                            </div>
                        </div>
                        {
                            modal && (
                                <>
                                    <div className="rounded-xl border-2 border-gray-300 dark:border-[#28282b] py-10 px-5 fixed m-auto max-w-[30rem] max-h-[28rem] inset-0 items-center justify-center z-50 backdrop-blur-xl">
                                        <div className="justify-between flex">
                                            <div className="text-[22px] font-bold">
                                                Contribute
                                            </div>
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
                                                        className="w-3/4 block w-full p-2 mt-2 text-gray-900 bg-gray-50 border-gray-200 dark:text-white dark:bg-gray-950 border dark:border-gray-600 rounded focus:outline-none focus:border-indigo-500 cursor-not-allowed"
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
                                </>
                            )
                        }
                    </>
                ))}
            </div>
            {totalPages > 1 && (
                <div className="flex justify-center">
                    <>
                        <button onClick={() => {
                            if (currentPage > 1) {
                                handlePageChange(currentPage - 1)
                            }
                        }}>Previous</button>
                        <button className={`bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition ${currentPage === currentPage + 1 ? 'bg-blue-700' : ''} mx-2`} >
                            {currentPage}
                        </button>
                        <button onClick={() => {
                            if (currentPage < totalPages) {
                                handlePageChange(currentPage + 1)
                            }
                        }}>Next</button>
                    </>
                </div>
            )}
        </>
    );
};


export default dynamic(() => Promise.resolve(ViewBounties), {
  ssr: false
});