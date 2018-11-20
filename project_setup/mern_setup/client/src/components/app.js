import React from 'react';
import '../assets/css/app.css';
import logo from '../assets/images/logo.svg';
import Test from './test';
import Navbar from './nav_bar';
import Profile from './profile';
import Sets from './sets';
import Flashcards from './flashcards';
import InputDefinition from './inputDefinition';
import { Route } from 'react-router-dom';
import displayData from './displayData'
import editSets from './editSets'



const App = () => (
    <div>
        {/* <div className="app">
            <Test/>
            <Button/>
        </div>
        </div> */}
        <Navbar/>
        <Route exact path = "/" component = {Profile}/>
        <Route path = "/sets" component = {Sets}/>
        <Route path = "/flashcards" component = {Flashcards}/>
        <Route path = "/displayData" component= {displayData}/>
        <Route path = "/editSets" component={editSets}/>
        <Route path = "/createflashcards" component = {InputDefinition}/>
    </div>
);

export default App;


