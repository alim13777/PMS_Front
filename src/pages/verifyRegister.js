import React, {useEffect} from 'react';
import SignInFrame from "../components/signInSideFrame";
import apiClient from "../services/api";

export default function VerifyRegister(props) {

    useEffect(() => {
        // fetch('http://localhost:8000/api/email/verify')
        //     .then(response => response.json())
        //     .then(res => {
        //         console.log("verify res",res)
        //     })
        //     .catch((err) => {
        //         console.log("verify err",err)
        //     });
        // async function fetchData() {
        // apiClient.get('/sanctum/csrf-cookie')
        //     .then(response => {
                 apiClient.get('/api/email/verify',{params:{userId:1}})
                    .then(res=>{
                        console.log("verify res")
                    }).catch(err=>{
                        console.log("verify err")
                    });
            // });
        // }
        // fetchData()
    }, []);

    return(
        <SignInFrame title={""}>
            verify
        </SignInFrame>
    )
}