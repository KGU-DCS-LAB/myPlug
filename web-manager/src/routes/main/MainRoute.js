import React, { useState } from 'react';
import IndexView from "../../views/main/IndexView";
import MainView from "../../views/main/MainView";

function useMainStatus(boo) {
    const [main, setMain]=useState(boo); 
    return main;
  }

const MainRoute = () => {
    const main = useMainStatus(false);
    return (
        main?<MainView/>:<IndexView main={main}/>
    );
}
  
  export default MainRoute;
  