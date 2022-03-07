import React from 'react';
import {Home} from "./pages/home/Home";
import {Auth} from './pages/auth/Auth';
import {Route, Routes} from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/login" element={<Auth/>}/>
                <Route path="/" element={<Home/>}/>
            </Routes>
        </div>
    );
}

export default App;
