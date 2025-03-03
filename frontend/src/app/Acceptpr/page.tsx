'use client'
import Menu from "@/components/menu/page";
import { useEffect, useState } from "react";
import { Octokit } from "octokit";
import { useWeb3 } from "../../components/context/Web3Context";
import { getContract } from "../../utils/contract";
import { ethers } from "ethers";
import dynamic from "next/dynamic";
const YourComponent = () => {
    const [reRender, setReRender] = useState(false);
    const [userData, setUserData] = useState<any[]>([]);
    const [octokit, setOctokit] = useState<Octokit | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [prLink, setPRLink] = useState('');
    const [walletAddress, setWalletAddress] = useState('');
    const [recipient, setRecipient] = useState();
    const [formData, setFormData] = useState({
        repository: '',
        repoOwner: '',
        contributorUsername: '',
        prLink: '',
        walletAddress: '',
        accepted: false,
    });

    const { provider, signer, account } = useWeb3();
    const [depositAmount, setDepositAmount] = useState("");
    const [contractBalance, setContractBalance] = useState("0");

    const handleWithdraw = async (recipient: string, withdrawAmount: string) => {
        if (!signer) return alert("Connect your wallet first!");
        try {
            const contract = getContract(signer);
            const tx = await contract.withdraw(recipient, ethers.parseEther(withdrawAmount));
            await tx.wait();
            alert(`Withdrawn ${withdrawAmount} ETH to ${recipient}`);
            fetchBalance();
        } catch (error) {
            console.error("Withdraw Error:", error);
            alert("Withdraw failed!");
        }
    };

    const fetchBalance = async () => {
        if (!provider) return;
        try {
            const contract = getContract(provider);
            const balance = await contract.getBalance();
            setContractBalance(ethers.formatEther(balance));
        } catch (error) {
            console.error("Fetch Balance Error:", error);
        }
    };

    useEffect(() => {
        const initOctokit = () => {
            const accessToken = typeof window !== 'undefined' ? window.localStorage.getItem("accessToken") : null;
            if (accessToken) {
                const client = new Octokit({
                    auth: accessToken,
                    baseUrl: 'https://api.github.com'
                });
                setOctokit(client);
            }
        };

        const getAccessToken = async () => {
            try {
                const code = typeof window !== 'undefined' ? sessionStorage.getItem("code") : null;
                if (code) {
                    const response = await fetch("https://ethapp-wine.vercel.app/getAccessToken?code=" + code);
                    const data = await response.json();
                    if (data.access_token) {
                        if (typeof window !== 'undefined') {
                            window.localStorage.setItem("accessToken", data.access_token);
                        }
                        setReRender(!reRender);
                    }
                }
            } catch (error) {
                console.error("Error getting access token:", error);
            }
        };

        if (typeof window !== 'undefined') {
            initOctokit();
            
            if (sessionStorage.getItem("code") && !window.localStorage.getItem("accessToken")) {
                getAccessToken();
            }

            const fetchContributeData = async () => {
                try {
                    const response = await fetch("https://ethapp-wine.vercel.app/api/contributeRequest");
                    if (response.ok) {
                        const data = await response.json();
                        setUserData(data);
                    }
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
            fetchContributeData();
        }
    }, []);

    const acceptContribution = async () => {
        try {
            const response = await fetch("https://ethapp-wine.vercel.app/api/contributeRequest", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    githubRepo: formData.repository,
                    repoOwner: formData.repoOwner,
                    contributorUsername: formData.contributorUsername,
                    prLink: formData.prLink,
                    walletAddress: formData.walletAddress,
                    accepted: formData.accepted,
                })
            });

            if (response.ok) {
                console.log("Bounty created successfully!");
            } else {
                console.error("Failed to save bounty details");
            }
        } catch (error) {
            console.error("Error accepting contribution:", error);
        }
    };

    const authenticateGitHub = async (formData: {
        repository: string;
        repoOwner: string;
        contributorUsername: string;
    }) => {
        try {
            if (!octokit) return;

            const response = await octokit.request(
                `PATCH /repos/${formData.repoOwner}/${formData.repository}/issues/${formData.contributorUsername}`,
                {
                    issue_number: formData.contributorUsername,
                    assignees: ['gursagar2003'],
                    state: 'open',
                    labels: [
                        'bug'
                    ],
                    headers: {
                        'X-GitHub-Api-Version': '2022-11-28',
                        'Content-Type': 'application/json'
                    }
                }
            );
            console.log("GitHub request successful:", response);
        } catch (error) {
            console.error("GitHub API request failed:", error);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        acceptContribution();
    };

    return (
        <>
            <Menu />
            <div className="mt-40">
                <div className="text-3xl font-bold text-center mb-4 pb-20 text-gray-300">
                    Contribution Requests
                </div>
                <div className="grid grid-cols-3 gap-10">
                    {userData.map((user, index) => (
                        <div
                            key={index}
                            className="bg-[#0a0a0a] p-10 rounded-xl mx-auto border-2 border-gray-700"
                        >
                            <div className="request-info flex flex-col gap-4 mb-6">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400 font-medium">Repository:</span>
                                    <span className="text-gray-300">{user.githubRepo}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400 font-medium">Repo Owner:</span>
                                    <span className="text-gray-300">{user.repoOwner}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400 font-medium">Contributor:</span>
                                    <span className="text-gray-300">{user.contributorUsername}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400 font-medium">Wallet Address:</span>
                                    <span className="text-gray-300">{user.walletAddress}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400 font-medium">PR Request Link:</span>
                                    <span className="text-gray-300">{user.prLink}</span>
                                </div>
                            </div>
                            <div className="flex space-x-4">
                                <button
                                    onClick={() => handleWithdraw(user.walletAddress, "0.004")}
                                    className="bg-gray-100 text-black px-4 py-2 rounded-full hover:bg-gray-700 transition-colors"
                                >
                                    Accept Contribution
                                </button>
                                <button
                                    className="bg-gray-800 text-white px-4 py-2 rounded-full hover:bg-gray-700 transition-colors"
                                >
                                    Reject Contribution
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                        <div className="bg-[#121212] rounded-lg p-6 max-w-md w-full mx-4">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold text-white">Contribute</h2>
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="text-gray-400 hover:text-gray-200"
                                >
                                    ✕
                                </button>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">
                                        Github PR Request Link
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.prLink}
                                        onChange={(e) => setFormData({ ...formData, prLink: e.target.value })}
                                        className="w-full p-2 border rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-1">
                                        Blockchain Wallet Address
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.walletAddress}
                                        onChange={(e) => setFormData({ ...formData, walletAddress: e.target.value })}
                                        className="w-full p-2 border rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default dynamic(() => Promise.resolve(YourComponent), {
    ssr: false
});