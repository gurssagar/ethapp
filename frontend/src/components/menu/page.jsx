// @ts-nocheck
'use client'
import {useEffect} from "react";
import {useState} from "react";
import {Octokit} from "octokit";
import { useRouter } from 'next/navigation';
import { useTheme } from "next-themes";
import ConnectWallet from "../ConnectWallet";
import dynamic from "next/dynamic";
import ContractInteraction from "../ContractInteraction";
import { signIn } from "next-auth/react"


const  Menu= () => {
    const CLIENT_ID='Ov23liYe2P4o4RO7y4No';
    const { setTheme } = useTheme()
    const router = useRouter()
    function  loginwithGithub(){
        window.location.assign("https://www.github.com/login/oauth/authorize?client_id=" + CLIENT_ID);
    }
    const [bg,setBg]=useState("systemDefault");;
        
    function handleThemeChange() {
    window.localStorage.setItem("theme", "dark");
    document.documentElement.classList.remove("light");
    document.documentElement.classList.add("dark");
    }

    function changeToLight(){
    window.localStorage.setItem("theme", "light");
    document.documentElement.classList.remove("dark");
    document.documentElement.classList.add("light");
    }
    const[reRender, setReRender] = useState(false);
    const[userData,setData]=useState();
    const [details,setDetails]=useState(false);
    useEffect(() => {
        const queryString = window.location.search;
        const urlSearchParams = new URLSearchParams(queryString);
        const codeParams=urlSearchParams.get("code");
        console.log(codeParams);
        if(sessionStorage.getItem("code")){
        
        }
        else{
            sessionStorage.setItem("code",codeParams);
        }
        let storedData=window.localStorage.getItem("access_token");
        if(sessionStorage.getItem("code") && (storedData===null)){
            async function getAccessToken(){
                await fetch("https://ethapp-wine.vercel.app/getAccessToken?code="+codeParams,{
                    method:"GET"
                }).then(response => {
                    return response.json()})
                    .then((data) => {
                        console.log(data);
                        if(data.access_token){
                            window.localStorage.setItem("accessToken",data.access_token);
                            setReRender(!reRender);
                        }
                    });

                await fetch("https://ethapp-wine.vercel.app/getUserData",{
                    method:"GET",
                    headers:{
                        "Authorization":"Bearer "+window.localStorage.getItem("accessToken")
                    }
                }).then(response => response.json())
                    .then((data)=>{
                        setData(data);
                        console.log(data);
                    });
            }
            getAccessToken()
        }
    }, []);

    //List Repos





    //Show User Details
    const toggleDetails = () => {
        setDetails(!details);
    };
    console.log(userData)
    return (
        <div className="fixed top-10 left-0 right-0 z-50 w-max-[50%] mx-40">
            <div className=" flex justify-between py-4 px-10 bg-black dark:bg-transparent  dark:backdrop-blur-[10px] rounded-full">
                <div>
                    <img src="/image(1).webp" alt="logo" className="h-10 object-contain "/>
                </div>
                <div className="flex space-x-4">
                    <button className="text-white " onClick={() => router.push('/')}>Home</button>
                    {
                        window.localStorage.getItem("accessToken")?
                        <>
                            <button className="text-white " onClick={() => router.push('/AddBounties')}>AddBounties</button>
                            <button className="text-white " onClick={() => router.push('/ViewBounties')}>ViewBounties</button>
                            <button className="text-white " onClick={() => router.push('/Requests')}>Requests</button>
                            <button className="text-white " onClick={() => router.push('/MyRepo')}>My Repo</button>
                            <button className="text-white " onClick={() => router.push('/Acceptpr')}>Accept PR</button>

                                                  </>
                        :
                        <>
                        </>
                    }
                </div>
                
                <div className='flex space-x-4'>
                    
                    {
                        window.localStorage.getItem("accessToken") ?
                            <div className="flex space-x-8 my-auto">
                             <ConnectWallet/> 
                            <div className='flex '>


                                <div>{userData ?
                                    <div className="space-x-4 flex">
                                        <img src={userData.avatar_url} onMouseOver={toggleDetails} alt="Profile"
                                             className=" w-10 h-10 rounded-full"/>
                                        <div>
                                            {details ?
                                                <div
                                                    className=" text-white w-[200px] fixed top-28 right-80 bg-black border-2 dark:bg-gray-900 rounded-2xl p-4  z-50">
                                                    <h2 className="text-[16px] font-bold">{userData.name}</h2>
                                                    <p >{userData.bio}</p>
                                                    <p >Followers: {userData.followers}</p>
                                                    <p >Following: {userData.following}</p>
                                                    <p >Public Repos: {userData.public_repos}</p>


                                                    
                                                </div> : null}
                                        </div>


                                    </div> :
                                    <></>}
                                </div>
                                <button className="rounded-full  dark:text-black px-4  py-2 bg-gray-100 dark:bg-white "
                                                            onClick={() => {
                                                                window.localStorage.removeItem("accessToken");
                                                                sessionStorage.removeItem("code");
                                                                const toggleDetails = () => {
                                                                    setDetails(!details);
                                                                };
                                                                setReRender(!reRender);

                                                            }}>
                                                        Sign Out
                                </button>
                            
                            
                            </div> 
                            
                            </div>: <>
                           
                                <button className="rounded-full  dark:text-black px-4  py-2 bg-gray-100 dark:bg-white "
                                        onClick={loginwithGithub}>
                                    Login With Github
                                </button>
                            </>
                    }
                    <div>
                    <div>
                    {
    window.localStorage.getItem("theme") === "dark" ?
        <button className="rounded-full  dark:text-black px-4 py-2 bg-gray-100 dark:bg-white"
        onClick={() => setTheme("light")}>
            Light Mode
        </button>
        :
        <button className="rounded-full  dark:text-black px-4 py-2 bg-gray-100 dark:bg-white"
        onClick={() => setTheme("dark")}>
            Dark Mode
        </button>
}
                    
                    </div>
                    </div>

                </div>

            </div>

        </div>
    );
}


export default dynamic(() => Promise.resolve(Menu), {
  ssr: false
});