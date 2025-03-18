'use client'
import { useState,useEffect } from 'react';
import { Octokit } from 'octokit';
import { useSearchParams } from 'next/navigation'
import hljs from 'highlight.js/lib/common';
import 'highlight.js/styles/github-dark.css';
import Menu from '../../../components/menu/page';
import Groq from "groq-sdk";

const SomeClientComponent = () => {
    const [repos, setRepos] = useState<any[]>([]);
    const [data,setrepoData]=useState<any[]>([]);
    const [octokit, setOctokit] = useState<Octokit | null>(null);
    const [finalData,setFinalData]=useState<any>();
    const searchParams = useSearchParams()
    const repoType=searchParams.get('search')
    const [aiData,setAiData]=useState<any>("");

    const groq = new Groq({ 
        apiKey: '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',
        dangerouslyAllowBrowser: true 
    });

    async function getGroqChatCompletion() {
        return groq.chat.completions.create({
          messages: [
            {
              role: "user",
              content: finalData,
            },
          ],
          model: "qwen-2.5-coder-32b",
        });
      }

    async function groqData() {
        const chatCompletion = await getGroqChatCompletion();
        setAiData(chatCompletion.choices[0]?.message?.content)
        // Print the completion returned by the LLM.
        console.log(chatCompletion.choices[0]?.message?.content || "");
    }




   



    const currentDate = new Date();
    const futureDate = new Date('2025-03-01T04:04:20Z');
    // Get the difference in milliseconds
    const timeDifference =  currentDate.getTime() - futureDate.getTime() ;

    // Convert milliseconds to weeks
    const [weeksDifference,setWeeksdifference] = useState(Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 7)));

    console.log(weeksDifference,"agsdfffwe");


    console.log(searchParams.get('search')) // Logs "search"
    const [view,setView]=useState(false)
    const [link,setLink]=useState("")
    const toggleView = () => {
        setView(!view)
    }
    const [repoContent,setRepoContent]=useState([])

    const fetchRepoContent= async() => {
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
                    const responses = await octokit.request(`GET /repos/${repoType}/pulls/${link}/files`, {
                        
                        headers: {
                            'X-GitHub-Api-Version': '2022-11-28'
                        },
                        
                    });
                    setRepoContent(responses.data.map((das:any) =>{
                        return das.contents_url
                    }));
                    console.log(responses,"ads")
                }
            }
        } catch (error) {
            console.error('GitHub API request failed:', error);
        }
    }

    const fetchrepoData= async() => {
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
                    const responses = await octokit.request(`GET /repos/${repoType}/pulls/${link}/files`, {
                        
                        headers: {
                            'X-GitHub-Api-Version': '2022-11-28'
                        },
                        
                    });
                    setrepoData(responses.data);
                    console.log(responses,"ads")
                    responses.data.map( (das:any) => {
                        return fetch(das.contents_url).then((res)=>res.json()).then((data)=>{
                            const decodedContent = atob(data.content); // Decode base64 content
                            setFinalData(decodedContent);
                        })
                    })
                    
                }
            }
        } catch (error) {
            console.error('GitHub API request failed:', error);
        }
    }
    
    

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
                    const response = await octokit.request(`GET /repos/${repoType}/pulls`, {
                        headers: {
                            'X-GitHub-Api-Version': '2022-11-28'
                        },
                        sort: 'updated',
                        per_page: 100
                    });
                    setRepos(response.data);
                    console.log(response,"ad")
                }
            }
        } catch (error) {
            console.error('GitHub API request failed:', error);
        }
    }
    useEffect(() => {
        fetchRepos();
    }, [octokit]);
    console.log(repos,"as")
    console.log(repoContent[0],"asda")
    hljs.highlightAll();
    useEffect(() => {
        
        // Initialize highlight.js
            if (finalData) {
                const codeElement = document.querySelector('code.hljs');
                if (codeElement) {
                    // Detect language and apply highlighting
                    const result = hljs.highlightAuto(finalData);
                    codeElement.innerHTML = result.value;
                    codeElement.className = `hljs ${result.language || ''}`;
            }
        }
       
    }, [finalData]); // Re-run when finalData changes
    return (
        <>
        <Menu/>
        <div className='text-4xl font-bold mt-40 text-center'>Pull Requests</div>
        {
            repos.map((repo) => (
                <div className={`my-20`}>
                <div key={repo.id} className={` mx-40 flex bg-[#131313] px-20 py-10 rounded-2xl justify-between`}>
                    <div>
                        <div className='flex '>
                            <div className='text-xl font-bold pr-4'>{repo.title}</div>
                            {
                                repo.labels.map((label:any) => (
                                <div key={label.id} style={{ 
                                        backgroundColor: `#${label.color}`,
                                        padding: '0.25rem 0.75rem',
                                        borderRadius: '1rem',
                                        color: `#ffffff`,
                                        fontSize: '0.75rem',
                                    }}>                                        
                                    {label.name}
                                    </div>                                        
                                ))
                            }
                        </div>
                        
                        <div>#{repo.number} opened {Math.floor((currentDate.getTime() - new Date(repo.updated_at).getTime()) / (1000 * 60 * 60 * 24))} days ago by {repo.user.login}</div>
                    </div>
                    
                    <div className='flex gap-6 justify-between'>
                   <div> 
                            <div className='font-bold '>Issues</div>
                            <div className='flex gap-1 items-center justify-center my-2'>
                            <svg aria-hidden="true" height="16" viewBox="0 0 16 16" version="1.1" width="16" data-view-component="true" className="octicon octicon-issue-opened v-align-middle" fill="currentColor">
                                        <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z"></path>
                                        <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0ZM1.5 8a6.5 6.5 0 1 0 13 0 6.5 6.5 0 0 0-13 0Z"></path>
                                    </svg>
                                <a href={`${repo._links.issue}`}>1</a>
                            </div>
                   </div>
                   <div className='items-center justify-center'>
                            <div className='font-bold '>Assignee</div>
                            <img src={repo.user.avatar_url} className='my-2 w-7 rounded-full items-center justify-center mx-auto'/>
                   </div>
                    
                    
                    <button onClick={
                        ()=>{
                            setLink(repo.number)
                            toggleView()
                            fetchrepoData()
                            fetchRepoContent()
                        }
                    } className={`bg-white rounded-4xl px-4 text-black`}>View Files</button>
                    </div>
                </div>
                </div>
            ))

        }


{
                view &&
                <div 
                    className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4'
                    onClick={() => setView(false)}
                >
                    <div 
                        className='bg-[#131313] p-6 rounded-lg max-w-4xl max-h-[70vh] overflow-auto'
                        onClick={(e) => e.stopPropagation()}
                    >
                        <pre>
                            <code className="hljs">
                                {finalData}
                            </code>
                        </pre>
                        <button onClick={() => {
                            groqData()
                        }} className='bg-white text-black mt-4 p-4 rounded'>
                            AI CODE REVIEW
                        </button>
                        // Modify the AI review display section
                        <div>
                            <div className='text-xl mb-4'>AI REVIEW</div>
                            <div className='space-y-4'>
                                {aiData.split('\n').reduce((acc, line, index, arr) => {
                                    if (line.startsWith('```') && !acc.inCodeBlock) {
                                        // Start of code block
                                        return {
                                            ...acc,
                                            inCodeBlock: true,
                                            codeBlock: [line]
                                        };
                                    } else if (line.startsWith('```') && acc.inCodeBlock) {
                                        // End of code block
                                        const completeCodeBlock = [...acc.codeBlock, line].join('\n');
                                        const highlightedCode = hljs.highlightAuto(completeCodeBlock).value;
                                        acc.elements.push(
                                            <pre key={index} className='bg-gray-800 p-4 rounded-lg overflow-auto'>
                                                <code className="hljs" dangerouslySetInnerHTML={{ __html: highlightedCode }} />
                                            </pre>
                                        );
                                        return {
                                            ...acc,
                                            inCodeBlock: false,
                                            codeBlock: []
                                        };
                                    } else if (acc.inCodeBlock) {
                                        // Inside code block
                                        return {
                                            ...acc,
                                            codeBlock: [...acc.codeBlock, line]
                                        };
                                    } else {
                                        // Handle other cases
                                        if (line.startsWith('- ') || line.startsWith('* ')) {
                                            acc.elements.push(
                                                <div key={index} className='flex items-start'>
                                                    <span className='mr-2'>•</span>
                                                    <span>{line.substring(2)}</span>
                                                </div>
                                            );
                                        } else if (line.trim() === '') {
                                            acc.elements.push(<br key={index} />);
                                        } else {
                                            acc.elements.push(
                                                <p key={index} className='text-gray-300'>
                                                    {line}
                                                </p>
                                            );
                                        }
                                        return acc;
                                    }
                                }, { elements: [], inCodeBlock: false, codeBlock: [] }).elements}
                            </div>
                        </div>

                    </div>
                </div>
            }

        </>
    )

  
}

export default SomeClientComponent