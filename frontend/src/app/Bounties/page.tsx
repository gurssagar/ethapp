'use client'
import Menu from "../../components/menu/page";
import { useState, useEffect } from 'react';

export default function Bounties() {
    const [bounties, setBounties] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [assignedBounties, setAssignedBounties] = useState<boolean>(false);
    useEffect(() => {
        const getBounties = async () => {
            try {
                const response = await fetch("http://localhost:4000/api/bounties");
                if (!response.ok) {
                    throw new Error('Failed to fetch bounties');
                }
                const data = await response.json();
                setBounties(data);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        getBounties();
    }, []);

    function handlesetBounties(bounties: any[]) {
        setBounties(!assignedBounties);
    }
    return (
        <>
            <Menu />
            <div className="h-screen">
                <h1 className="text-center text-2xl font-bold my-4">Bounties</h1>
                {loading ? (
                    <div className="text-center">Loading...</div>
                ) : error ? (
                    <div className="text-center text-red-500">{error}</div>
                ) : (
                    <div className="mx-8 my-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {bounties.map((bounty) => (
                            <div key={bounty.title} className="my-4 border-2 p-4 rounded-3xl bg-gray-900 mx-8" >
                                <h1 className="text-xl font-semibold">{bounty.title}</h1>
                                <p className="text-gray-300">{bounty.description}</p>
                                <p className="text-yellow-500">{bounty.paymentToken} {bounty.rewardAmount}</p>
                               <div className="flex justify-between">
                                <div className="mt-4">
                                    <a href={bounty.githubRepo} target="_blank" rel="noopener noreferrer">
                                        <button className="bg-gray-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
                                            Get Repo
                                        </button>
                                    </a>
                                    <a href={bounty.githubIssue} target="_blank" rel="noopener noreferrer">
                                        <button className=" hover:bg-blue-700 text-white font-bold py-2 px-4 rounded bg-gray-600">
                                            Issue Repo
                                        </button>
                                    </a>
                                </div>
                                <div className="mt-4">
                                    <button onClick={assignedBounties} className=" hover:bg-blue-700 text-white font-bold py-2 px-4 rounded bg-gray-600">
                                        Claim Bounty
                                    </button>
                                </div>
                               </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}