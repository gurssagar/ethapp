"use client";
import React, {useEffect, useState} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWeb3 } from "@/components/context/Web3Context";
import { getContract } from "@/utils/contract";
import { ethers } from "ethers";
import { Label } from "@/components/ui/label";;
import {toast} from "react-toastify";
import Spline from '@splinetool/react-spline';
import dynamic from "next/dynamic";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DefaultSession } from "next-auth";
import {Octokit} from "octokit";
import Menu from "../../components/menu/page";

interface Repo {
    id: number;
    name: string;
    full_name: string;
    html_url: string;
}

interface Issue {
    id: number;
    title: string;
    number: number;
    html_url: string;
}

interface ExtendedSession extends DefaultSession {
    user: {
        address: string;
        username?: string;
    } & DefaultSession["user"];
}



const  Page = () => {
    //web3 start
    const { provider, signer, account } = useWeb3();
    const [depositAmount, setDepositAmount] = useState("");
    const [withdrawAmount, setWithdrawAmount] = useState("");
    const [recipient, setRecipient] = useState("");
    const [contractBalance, setContractBalance] = useState("0");
    //Web3 Deposit 

    const [octokit, setOctokit] = useState<Octokit | null>(null);
    const [repos, setRepos] = useState<any>([]);
    const [issues, setIssues] = useState<Issue[]>([]);
    
    console.log(repos,"bb")
    
    

    useEffect(() => {
        const authenticateGitHub = async () => {
            try {
                const accessToken = window.localStorage.getItem("accessToken");

                if (accessToken) {
                    const octokit = new Octokit({
                        auth: accessToken
                    });
                    setOctokit(octokit);

                    const response = await octokit.request('GET /user/repos', {
                        headers: {
                            'X-GitHub-Api-Version': '2022-11-28'
                        },
                        sort: 'updated',
                        per_page: 100
                    });
                    setRepos(response.data);

                    // Update issues if a repo is already selected
                    // Update issues if a repo is already selected
                if (formData.githubRepo) {
                const [owner, repo] = formData.githubRepo.split('/');
                const { data: issuesList } = await octokit.rest.issues.listForRepo({
                    owner,
                    repo,
                    state: 'open'
                });
                    // ... rest of your code
                }
                }
            } catch (error) {
                console.error('GitHub authentication failed:', error);
            }
        };

        authenticateGitHub();
    }, []); // Empty dependency array means this runs once on mount


    const [formData, setFormData] = useState({
        githubRepoOwner:"",
        title: "",
        oneLiner: "",
        description: "",
        githubRepo: "",
        githubIssue: "",
        difficulty: "",
        rewardAmount: 0,
        paymentToken: "",
        isLive: false,
    });
    useEffect(() => {
        const fetchIssues = async () => {
            if (formData.githubRepo) {
                try {
                    const response = await fetch(
                        `https://api.github.com/repos/${formData.githubRepo}/issues`
                    );
                    const data = await response.json();
                    setIssues(data);
                } catch (error) {
                    console.error("Error fetching issues:", error);
                }
            }
        };

        fetchIssues();
    }, [formData.githubRepo]);
    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | string,
        selectName?: string
) => {
        if (typeof e === "string" && selectName) {
            setFormData((prevData) => ({
                ...prevData,
                [selectName]: e,
            }));
        } else if (typeof e === "object" && "target" in e) {
            const { name, value } = e.target;
            setFormData((prevData) => ({
                ...prevData,
                [name]: name === "rewardAmount" ? Number(value) : value,
            }));
        }
    };

    useEffect(() => {
        if (repos.length > 0) {
            setFormData((prev) => ({
                ...prev,
                githubRepoOwner : repos[0].owner.login || null // Access the login of the first repo
            }));
        
        }
        
    }, [repos]);
    console.log("hello",formData)


    const handleDeposit = async () => {
        if (!signer) return alert("Connect your wallet first!");
        try {
          const contract = getContract(signer);
          const tx = await contract.deposit({ value: ethers.parseEther(depositAmount) });
          await tx.wait();
          alert(`Deposited ${depositAmount} ETH`);
          fetchBalance();
        } catch (error) {
          console.error("Deposit Error:", error);
          alert("Deposit failed!");
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

      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!signer) return alert("Connect your wallet first!");

        try {
            // Handle deposit first
            const contract = getContract(signer);
            const tx = await contract.deposit({ value: ethers.parseEther(formData.rewardAmount.toString()) });
            await tx.wait();
            toast.success("Deposit successful!");
            fetchBalance();

            // Then handle form submission
            if (window.localStorage.getItem("accessToken")) {
                const response = await fetch("https://ethapp-wine.vercel.app/api/bounties", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        ...formData,
 // Include deposit amount in the request
                    }),
                });

                if (response.ok) {
                    console.log("Bounty created successfully!");
                } else {
                    console.log("Failed to save bounty details");
                }
            } else {
                console.error("User session not found");
            }
        } catch (error) {
            console.error("Error processing bounty or transaction:", error);
            toast.error("An error occurred while creating the bounty or processing the transaction.");
        }
    };

   

    return (
        <>
        <Menu/>
        <div className="mt-40 mx-40 p-4 sm:p-6 space-y-6 ">
        <h1 className="text-3xl pb-8 lg:pb-10 lg:text-6xl font-semibold text-center mt-6 bg-clip-text   ">
                        Create a Bounty
        </h1>
            <div className="flex justify-end flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8">
                <div className="mx-auto w-1/2 ">
                    
                    <form className="space-y-4" onSubmit={handleSubmit}>

                        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                            <div className="w-full sm:w-1/2 space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    name="title"
                                    placeholder="E.g. Fix image upload"
                                    value={formData.title}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="w-full sm:w-1/2 space-y-2">
                                <Label htmlFor="one-liner">One-liner</Label>
                                <Input
                                    id="one-liner"
                                    name="oneLiner"
                                    placeholder="E.g. Fix image upload of xyz page"
                                    value={formData.oneLiner}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                name="description"
                                placeholder="Detailed Description of the Bounty"
                                className="min-h-[100px]"
                                value={formData.description}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="difficulty">Difficulty</Label>
                            <Select
                                onValueChange={(value) => handleChange(value, "difficulty")}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select difficulty"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Easy">Easy</SelectItem>
                                    <SelectItem value="Medium">Medium</SelectItem>
                                    <SelectItem value="Hard">Hard</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="paymentToken">Payment Token</Label>
                            <Input
                                id="paymentToken"
                                name="paymentToken"
                                placeholder="Enter payment token"
                                value={formData.paymentToken}
                                onChange={handleChange}
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">

                            <div className="w-full sm:w-1/3 space-y-2">
                                <Label htmlFor="reward-amount">Reward</Label>
                                <Input
                                    id="reward-amount"
                                    name="rewardAmount"
                                    placeholder="E.g. 0.1"
                                    value={formData.rewardAmount}
                                    onChange={handleChange}
                                    type="number"
                                />
                            </div>
                            <div className="space-y-2 w-1/3">
                                <Label htmlFor="githubRepo">GitHub Repository</Label>
                                <Select
                                    onValueChange={(value) => handleChange(value, "githubRepo")}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a repository"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        {repos.map((repo) => (
                                            <SelectItem key={repo.id} value={repo.full_name}>
                                               {repo.html_url}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2 w-1/3">
    <Label htmlFor="githubIssue">GitHub Issue</Label>
    {issues.length > 0 
        ? (
            <Select
                onValueChange={(value) => handleChange(value, "githubIssue")}
            >
                <SelectTrigger>
                    <SelectValue placeholder="Select an issue"/>
                </SelectTrigger>
                <SelectContent>
                    {issues.map((issue) => (
                        <SelectItem key={issue.id} value={issue.number.toString()}>
                            {issue.html_url}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        )
        : (
            <div>No issues found</div>
        )}
</div>
                        </div>
                        <Button type="submit" className="w-full mt-8" size="lg">
                            Create Bounty
                        </Button>
                    </form>
                </div>
                <div className="w-1/2 justify-end">
                <Spline
        scene="https://prod.spline.design/IBIzGylSkd97KXf7/scene.splinecode" 
      />
                </div>
            </div>
        </div>
        </>
    );
}

export default dynamic(() => Promise.resolve(Page), {
    ssr: false
});
