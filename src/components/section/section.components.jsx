import { Fragment, useEffect, useState } from "react"


const Section =()=>{
    const number=[0,1,2,3,4,5,6,7,8,9];
    const str=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
    const strGen=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    const symbol=['!','@','#','$','%','^','&','*','_','-','+','='];

    const [inputValue,setInputValue]=useState("");
    const [passwordList,setPasswordList]=useState(()=>{
        const savedList=localStorage.getItem('passwordList');
        if(savedList){
            return JSON.parse(savedList);
        }else{
            return []
        }
    });
    

    const generatePassword=()=>{
        console.log('password generate');
        handleChanceValue(Math.random);
        
    }
    const handleChanceValue=(e)=>{
        setInputValue(e);
    }
    
    useEffect(()=>{
        if(inputValue){
            localStorage.setItem('passwordList',JSON.stringify(inputValue));
        }
        console.log('');
    },[inputValue])


    return(
        <Fragment>
            <div className="passwordGenerator-container max-h-460px max-w-1500px border-2 p-5 rounded-md shadow-lg bg-white">
                <div className="justify-center items-center text-center text-white font-bold text-3xl mb-3 pb-3 border-b border-gray-500">
                    <h1 className="text-sky-500">Password Generator</h1>
                </div>
                <div className="flex">
                    <div className="password-generate-page mr-3">
                        <div>
                            <div>
                                <input type="text"  onChange={handleChanceValue} value={inputValue}   placeholder="Password Generate" className="password-generator-input bg-gray-200 rounded-l-lg py-2 px-4" disabled/>
                                <button type="button" className="generate-button font-bold bg-sky-600 text-white hover:bg-sky-700 rounded-r-lg py-2 px-4 inline-flex" onClick={generatePassword}>Generate</button>
                            </div>
                            <div className="flex">
                                <input type="range" value='50' className="password-length w-full"/>
                                <h1 className="ml-3">8</h1>
                            </div>
                        </div>
                        <div className="checbox-page">
                            <div className="checkox-buttons grid grid-cols-2 gap-3">
                                <div>
                                    <input type="checkbox" value={number}/>
                                    <label>Numbers [ 1,2,3,... ]</label>
                                </div>
                                <div>
                                    <input type="checkbox" value={str}/>
                                    <label>Alpha [ a,b,c,... ]</label>
                                </div>
                                <div>
                                    <input type="checkbox" value={strGen}/>
                                    <label>AlphaGens [ A,B,C,... ]</label>
                                </div>
                                <div>
                                    <input type="checkbox" value={symbol}/>
                                    <label>Symbols [ .,?,_,... ]</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="password-save-page bg-gray-300">
                        <div className="password-saves">
                            <div>
                                <h1 className="bg-sky-500 fixed sticky">Password Saves</h1>
                            </div>
                            <div className="saves-password text-center">
                                <ul>
                                    <li>Password 1</li>
                                    <li>Password 2</li> 
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Section