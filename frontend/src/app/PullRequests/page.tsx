'use client'
import { useState, useEffect } from 'react';
import { Octokit } from 'octokit';
import dynamic from 'next/dynamic';

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
            {repos.map((repo) => (
                <div key={repo.id}>
                    <h3>{repo.full_name}</h3>
                    <p>{repo.description}</p>
                </div>
            ))}
        </div>
    );
};

export default dynamic(() => Promise.resolve(PrComponent), {
    ssr: false
});