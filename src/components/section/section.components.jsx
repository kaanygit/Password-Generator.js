import { Fragment, useEffect, useRef, useState } from "react"


const Section =()=>{
    const number=[0,1,2,3,4,5,6,7,8,9];
    const str=['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
    const strGen=['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    const symbol=['!','@','#','$','%','^','&','*','_','-','+','='];
    
    const rangeRef=useRef();
    const checkboxRefs = [
        useRef(),
        useRef(),
        useRef(),
        useRef()
    ];

    const [activeItemId, setActiveItemId] = useState(null);
    const [checkedItems, setCheckedItems] = useState([]);
    const [inputValue,setInputValue]=useState("");
    const [rangeInputBox,setRangeInputBox]=useState(10);

    const [passwordList, setPasswordList] = useState([]);
    const [passwordLocalStorage,setPasswordLocalStorage]=useState(()=>{
        const savedList=localStorage.getItem('passwordList');
        if(savedList){
            return JSON.parse(savedList);
        }else{
            return []
        }
    });
    
    const handleCheckboxChange=()=>{
        const checkedItems = checkboxRefs
        .filter(ref => ref.current.checked)
        .map(ref => ref.current.value);
  
      setCheckedItems(checkedItems);
      console.log(checkedItems);
    }

    const generatePassword=()=>{
        console.log('password generate');
        setPasswordList(passwordLocalStorage=>[...passwordLocalStorage,passwordList]);
        const mergedList = checkedItems.join(',').split(',');
        const randomItems=[];
        for(let i=0;i<rangeInputBox;i++){
            const randomIndex=Math.floor(Math.random()*mergedList.length);
            const randomItem=mergedList[randomIndex];
            randomItems.push(randomItem);
            
            if(!randomItems.includes(randomItem)){
                randomItems.push(randomItem);
            }
        }
        const result=randomItems.join('');
        console.log(result);

        const newPassword = {
            id: Date.now(),
            password: result
          };
          setPasswordLocalStorage(prevPasswordLocalStorage => [...prevPasswordLocalStorage, newPassword]);
        

        handleChanceValue(result);
    }
    const handleChanceValue=(event)=>{
        setInputValue(event);
    }
    
    const handleRangeChange = (e) => {
        const value = parseInt(e.target.value);
        setRangeInputBox(value);
    };

    const passwordCopy=(password)=>{
        if(navigator.clipboard && navigator.clipboard.writeText){
            navigator.clipboard.writeText(password)
            .then(()=>{
                console.log('kopyalandi',password);
                setActiveItemId(null);
            })
            .catch((error)=>{
                console.log('kopyalama hatası',password);
            })
        }else{
            console.error('Panoya erişim desteklenmiyor')
        }
    };


    const handleItemClick=(itemId)=>{
        setActiveItemId(itemId);
    };

    const deleteLocalStorage=(id)=>{
        setPasswordLocalStorage(prevPasswordLocalStorage => {
            const updatedList = prevPasswordLocalStorage.filter(item => item.id !== id);
            localStorage.setItem('passwordList', JSON.stringify(updatedList));
            console.log('silme başarılı');
            return updatedList;
          });
        setActiveItemId(null);
    }



    useEffect(()=>{
        if (passwordLocalStorage.length > 0) {
            localStorage.setItem('passwordList', JSON.stringify(passwordLocalStorage));
          }
    },[passwordLocalStorage])

    console.log(passwordLocalStorage);


    return(
        <Fragment>
            <div className="passwordGenerator-container max-h-468px max-w-1500px  border-2 p-5 rounded-md shadow-lg bg-white">
                <div className="justify-center items-center text-center text-white font-bold text-3xl mb-3 pb-3 border-b border-gray-500">
                    <h1 className="text-sky-500">Password Generator</h1>
                </div>
                <div className="flex h-36">
                    <div className="password-generate-page mr-3 ">
                        <div>
                            <div>
                                <input type="text"  onChange={handleChanceValue} value={inputValue}  placeholder="Password Generate" className="password-generator-input bg-gray-200 rounded-l-lg py-2 px-4" disabled/>
                                <button type="button" className="generate-button font-bold bg-sky-600 text-white hover:bg-sky-700 rounded-r-lg py-2 px-4 inline-flex" onClick={generatePassword}>Generate</button>
                            </div>
                            <div className="flex">
                                <input type="range" ref={rangeRef} defaultValue='10' onChange={handleRangeChange}  min='1' max='20'  className="password-length w-full"/>
                                <h1 className="ml-3">{rangeInputBox}</h1>
                            </div>
                        </div>
                        <div className="checbox-page">
                            <div className="checkox-buttons grid grid-cols-2 gap-3">
                                <div>
                                    <input type="checkbox" ref={checkboxRefs[0]} value={number} onChange={handleCheckboxChange} key='numInput'/>
                                    <label>Numbers [ 1,2,3,... ]</label>
                                </div>
                                <div>
                                    <input type="checkbox" ref={checkboxRefs[1]} value={str} onChange={handleCheckboxChange} key='alphaInput' />
                                    <label>Alpha [ a,b,c,... ]</label>
                                </div>
                                <div>
                                    <input type="checkbox" ref={checkboxRefs[2]} value={strGen} onChange={handleCheckboxChange} key='alphaGensInput'/>
                                    <label>AlphaGens [ A,B,C,... ]</label>
                                </div>
                                <div>
                                    <input type="checkbox" ref={checkboxRefs[3]} value={symbol} onChange={handleCheckboxChange} key='symInput' />
                                    <label>Symbols [ .,?,_,... ]</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="password-save-page bg-gray-300 overflow-auto w-28 scrollbar-hide">
                        <div className="password-saves">
                            <div>
                                <h1 className="bg-sky-500 sticky fixed text-white">Password Saves</h1>
                            </div>
                            <div className="saves-password text-center">
                                <ul>
                                    {passwordLocalStorage.map(passwordSave => (
                                        <span key={passwordSave.id}>
                                            <li className={`mt-3 cursor-pointer ${activeItemId === passwordSave.id ? 'active' : ''}`} onClick={() => handleItemClick(passwordSave.id)}>{passwordSave.password}</li>
                                            {activeItemId === passwordSave.id && (
                                                <span className="block bg-gray-500 flex">
                                                    <button onClick={() => passwordCopy(passwordSave.password)} className="pr-1 bg-sky-500 hover:bg-sky-600 text-xs py-1 px-1 w-full">Copy</button>
                                                    <button onClick={()=>deleteLocalStorage(passwordSave.id)} className="pl-1 bg-red-500 hover:bg-red-600 text-xs py-1 px-1 w-full ">Delete</button>
                                                </span>
                                            )}
                                        </span>
                                    ))}
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