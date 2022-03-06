import React from 'react';
import {Home} from "./pages/Home";
import {Auth} from './pages/Auth';
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
