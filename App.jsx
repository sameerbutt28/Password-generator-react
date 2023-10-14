import { useState, useCallback, useEffect, useRef } from "react";
const App = () => {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef =useRef(null)
  const generatePassword = useCallback(() => {
    let pass = "";
    let str = " ABCDEFGIJKLMNOPQRTUVWXZabcdefghijklmnopqrstuvxyz ";
    if (charAllowed) str += "!@#$%^&*()";
    if (numberAllowed) str += "0123456789";
    for (let i = 1; i < length; i++) {
      const index = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(index);
    }
    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);
useEffect(()=>{
generatePassword();
}, [length, numberAllowed, charAllowed])
const copyPasswordToClipboard =() =>{
  window.navigator.clipboard.writeText(password);
  passwordRef.current?.select()
}
  return (
    <div className="bg-white w-full h-screen">
      <p className=" text-3xl text-center bg-gray-400  text-gray-600 text-bold font-bold shadow-lg  ">
        Password Generator
      </p>
      <div className=" bg-gray-200 m-5 p-5 w-auto flex flex-col   shadow-2xl ">
        <div className="flex flex-row p-5 m-5 justify-center">
          <input
            type="text"
            value={password}
            placeholder="password"
            className="p-3 w-50 outline-none"
            readOnly
            //we will use reference in the future
            ref={passwordRef}
          />
          <button 
          onClick={copyPasswordToClipboard}
          className="bg-blue-700 text-white p-3 shrink-0">Copy</button>
        </div>
        <div className="flex flex-row justify-center">
          <div>
            <input
              type="range"
              min={6}
              max={30}
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(e.target.value)}
            />
            <label htmlFor="length">Length: {length} </label>
          </div>
          <div className="ml-5">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="number"> Numbers </label>
          </div>
          <div className="ml-5">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="character"> Character </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
