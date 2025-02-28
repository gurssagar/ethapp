'use client'
import {useEffect} from "react";
import {useState} from "react";
import {Octokit} from "octokit";
const CLIENT_ID="Ov23liYe2P4o4RO7y4No"
export default function SignIn() {
    // TODO: Implement sign in logic
    function  loginwithGithub(){
        window.location.assign("https://www.github.com/login/oauth/authorize?client_id=" + CLIENT_ID);
    }
    
    const[reRender, setReRender] = useState(false);
    const[userData,setData]=useState();
    const [details,setDetails]=useState(false);
    
        useEffect(() => {
            const queryString = window.location.search;
            const urlSearchParams = new URLSearchParams(queryString);
            const codeParams=urlSearchParams.get("code");
            localStorage.setItem("code", codeParams);
            console.log(codeParams);
            let storedData=localStorage.getItem("access_token");
            if(codeParams && (storedData===null)){
                async function getAccessToken(){
                    await fetch("https://ethapp-wine.vercel.app/getAccessToken?code="+codeParams,{
                        method:"GET"
                    }).then(response => {
                        return response.json()})
                        .then((data) => {
                            console.log(data);
                            if(data.access_token){
                                localStorage.setItem("accessToken",data.access_token);
                                setReRender(!reRender);
                            }
                        });
    
                    await fetch("https://ethapp-wine.vercel.app/getUserData",{
                        method:"GET",
                        headers:{
                            "Authorization":"Bearer "+localStorage.getItem("accessToken")
                        }
                    }).then(response => response.json())
                        .then((data)=>{
                            setData(data);
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
        <>
         <button className="rounded-full  dark:text-black px-4  py-2 bg-gray-100 dark:bg-white "
                                        onClick={loginwithGithub}>
                                    Login With Github
                                </button>
        </>
       

        
    )
}