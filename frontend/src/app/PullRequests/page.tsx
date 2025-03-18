'use client'
import { useState, useEffect ,useContext} from 'react';
import { Octokit } from 'octokit';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const PrComponent = () => {
    const [repos, setRepos] = useState<any[]>([]);
    const [octokit, setOctokit] = useState<Octokit | null>(null);

    const fetchRepos = async () => {
        try {
            if (typeof window !== 'undefined') {
                const accessToken = window.localStorage.getItem("accessToken");
                console.log(accessToken)
                if (accessToken && !octokit) {
                    const client = new Octokit({
                        auth: accessToken
                    });
                    setOctokit(client);
                }

                if (octokit) {
                    const response = await octokit.request('GET /user/repos', {
                        headers: {
                            'X-GitHub-Api-Version': '2022-11-28'
                        },
                        sort: 'updated',
                        per_page: 100
                    });
                    setRepos(response.data);

                }
            }
        } catch (error) {
            console.error('GitHub API request failed:', error);
        }
    };

    useEffect(() => {
        fetchRepos();
    }, [octokit]);
    console.log(repos)

    return (
        <div>
            <div className='grid grid-cols-3 px-4 py-10'>
            {repos.map((repo) => (
                <div key={repo.id} className="bg-gray-900 rounded-xl py-6 px-6 mx-20 my-10 ">
                    <h3>{repo.full_name}</h3>
                    <button className='bg-white text-black py-2 px-4 mt-5'>View Code</button>
                    <Link href={{pathname: `/PullRequests/${repo.id}`,query: {search: repo.full_name}}}>{repo.full_name}</Link>

                </div>
            ))}
            </div>
        </div>
    );
};

export default dynamic(() => Promise.resolve(PrComponent), {
    ssr: false
});