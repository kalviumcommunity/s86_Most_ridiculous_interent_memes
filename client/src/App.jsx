import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import MemeCard from "./components/MemeCard";
import LandingPage from "./components/LandingPage";
BrowserRouter

function App(){
  return(

    <>
    <BrowserRouter>
    <Routes>
      <Route path="/memes" element={<MemeCard/>}/>
      <Route path="/" element={<LandingPage/>}/>


    </Routes>
    
    </BrowserRouter>
    
    </>
  )
}

export default App;
