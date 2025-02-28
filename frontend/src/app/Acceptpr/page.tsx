'use client'
import Menu from "@/components/menu/page";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Octokit } from "octokit";
import { useWeb3 } from "../../components/context/Web3Context";
import { getContract } from "../../utils/contract";
import { ethers } from "ethers";

const YourComponent = () => {
    const [reRender, setReRender] = useState(false);
    const [userData, setUserData] = useState<any[]>([]);
    const [octokit, setOctokit] = useState<Octokit | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [prLink, setPRLink] = useState('');
    const [walletAddress, setWalletAddress] = useState('');
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
        // Initialize Octokit client
        const initOctokit = () => {
            const accessToken = localStorage.getItem("accessToken");
            if (accessToken) {
                const client = new Octokit({
                    auth: accessToken,
                    baseUrl: 'https://api.github.com'
                });
                setOctokit(client);
            }
        };
        initOctokit();

        const queryString = window.location.search;
        let storedData = localStorage.getItem("access_token");
        
        if (sessionStorage.getItem("code") && (storedData === null)) {
            async function getAccessToken() {
                try {
                    const response = await fetch("https://ethapp-wine.vercel.app/getAccessToken?code=" + sessionStorage.getItem("code"));
                    const data = await response.json();
                    if (data.access_token) {
                        localStorage.setItem("accessToken", data.access_token);
                        setReRender(!reRender);
                    }
                } catch (error) {
                    console.error("Error getting access token:", error);
                }
            }
            getAccessToken();
        }

        async function fetchContributeData() {
            try {
                const response = await fetch(`https://ethapp-wine.vercel.app/api/contributeRequest`);
                if (response.ok) {
                    const data = await response.json();
                    setUserData(data);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchContributeData();
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
                <div className="text-3xl font-bold text-center mb-4 pb-20">
                    Contribution Requests
                </div>
                <div className="grid grid-cols-3 gap-y-10">
                    {userData.map((user, index) => (
                        <>
                        <div>
                        {showModal && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                    <div className="bg-white dark:bg-gray-900 rounded-lg p-6 max-w-md w-full mx-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Contribute</h2>
                            <button 
                                onClick={() => setShowModal(false)}
                                className="text-gray-500 hover:text-gray-700"
                            >
                                ✕
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Github PR Request Link
                                </label>
                                <input
                                    type="text"
                                    value={formData.prLink}
                                    onChange={(e) => setFormData({ ...formData, prLink: e.target.value })}
                                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    BlockChain Wallet Address
                                </label>
                                <input
                                    type="text"
                                    value={formData.walletAddress}
                                    onChange={(e) => setRecipient(e.target.value)}
                                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">
                                    Withdrawl Amount
                                </label>
                                <input
                                    type="text"
                                    value={formData.walletAddress}
                                    onChange={(e) => setWithdrawAmount(e.target.value)}
                                    className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                            <div className="flex justify-between items-center">
                                    <span className="text-gray-700 font-medium dark:text-white">Repository:</span>
                                    <input
                                        type="text"
                                        name="githubRepo"
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
                        <div key={index} className="bg-[#121212] p-10 rounded-xl mx-auto">
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

                                <div className="flex justify-between items-center">
                                    <span className="text-gray-700 font-medium dark:text-white">WalletAddress</span>
                                    <input
                                        type="text"
                                        name="WalletAddress"
                                        className="text-gray-600 dark:text-white"
                                        value={user.walletAddress}
                                        readOnly
                                    />
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-700 font-medium dark:text-white">PR Request Link</span>
                                    <input
                                        type="text"
                                        name="prLink"
                                        className="text-gray-600 dark:text-white"
                                        value={user.prLink}
                                        readOnly
                                    />
                                </div>
                                
                                
                                <div className="flex gap-4">
                                    
                                    <button
                                        onClick={() => {
                                            handleWithdraw("0x43A071fa2103F24Bbcd7aD3215b5Ed226484473c","0.004")
                                        }}
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                                    >
                                        Accept Contribution Request
                                    </button>
                                </div>
                            </div>
                        </div>
                        </>
                    ))}
                </div>
            </div>

            
        </>
    );
};

export default YourComponent;