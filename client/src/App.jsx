import React from "react";
import { BrowserRouter,Routes,Route } from "react-router-dom";
import MemeCard from "./components/MemeCard";
import LandingPage from "./components/LandingPage";
import AddEntityForm from './components/AddEntityForm';
import Auth from './components/Auth';
BrowserRouter

function App(){
  return(

    <>
    <BrowserRouter>
    <Routes>
      

<Route path="/add-entity" element={<AddEntityForm />} />

      <Route path="/memes" element={<MemeCard/>}/>
      <Route path="/" element={<LandingPage/>}/>
       <Route path="/filter-by-user" element={<MemeFilterByUser />} /> {/* New route */}

<Route path="/auth" element={<Auth />} />
    </Routes>
    
    </BrowserRouter>
    
    </>
  )
}

export default App;
