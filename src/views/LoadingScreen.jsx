import { useEffect, useRef } from "react";

function LoadingScreen(/*{ isLoading, Component }*/) {

    // useEffect(() => {
    //     if (isLoading) document.body.classList.add("loading")
    //     else document.body.classList.remove("loading")
    // }, [isLoading])

    return (
        <>
            {/* <div className={`loading-screen ${isLoading ? 'loading' : 'finished'}`}> */}
            <div className={"loading-screen"} >
                <div className="loading-screen__skeleton"></div>
                <div className="loading-screen__skeleton"></div>
            </div>
            {/* 
            {isLoading ? <></> : <Component />} */}
        </>
    )
}

export default LoadingScreen;