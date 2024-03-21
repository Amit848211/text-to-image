import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';


function App() {
  
     const[image,setimage]=useState("")
     const[inputValue,setinputValue]=useState('')
      
     useEffect(()=>{
      const timerOut=setTimeout(()=>{
        async function fetchImage (){
          const response = await fetch(
            "https://api-inference.huggingface.co/models/prompthero/openjourney-v4",
            {
              headers: { Authorization: "Bearer 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" },
              method: "POST",
              body: JSON.stringify(inputValue),
            }
          );
          const Data=await response.blob()
          //  
          const objUrl=URL.createObjectURL(Data)
          setimage(objUrl)
        }
        fetchImage()
      },500)
      return ()=>clearTimeout(timerOut);
        
     },[inputValue])

     console.log(inputValue);
    

    

  return (
    < >
      <div className="w-[100vw] h-[100vh] bg-[url('../src/image/Desert-Nights.webp')] flex flex-col items-center pt-20 pb-10">
         <div className="w-[30%] h-[32%] flex flex-col items-center gap-5 rounded-3xl">
           <h1 className="text-2xl text-orange-500 font-semibold font-mono">Text To Image Generator</h1>
           <div className="flex gap-4">
           <input type='text'
           placeholder='image name'
           className="w-48 h-8 border-[2px] rounded-lg border-orange-400 pl-2 "
           onChange={(e)=>{setinputValue(e.target.value);
                   
           }}
           
           ></input>
          
           </div>
           

         </div>
        
         {image &&(
         <div className="w-[30%] h-[50%]">
         
           <img src={image} alt='' className="w-full h-full object-cover rounded-lg"  ></img>
           
         
            
         </div>
         )}
      </div>
    </>
  );
}

export default App;
