
import './eyeBalls.css'
import {createRef, useEffect, useState} from "react";
import Button from "react-bootstrap/Button";

function EyeBalls() {
    const [eyeMovement, changeMove] = useState(false);

    const eye = createRef();
    const clicker = () => {
        const look = eye.current;
        let angel = -25
        // while (1) {
        look.classList.toggle('after-look');
        // look.style.transform = `translateY(${angel}%)`;
        // look.style.transform += `translateX(${angel}%)`;
            angel -= 3



    }

    // useEffect(() => {
    //     setTimeout(() => {
    //         //changeMove(!eyeMovement);
    //         clicker();
    //     }, 2000);
    // },[eyeMovement]);


    return (
        <div className={"all-robot"} style={{ backgroundImage: "url(/eyes_of_the_robot.jpeg)", backgroundRepeat  : 'no-repeat',
       backgroundPosition: 'center 0%', backgroundSize: 'contain', width: '100%', height: '450px', display: 'block'}}>
            <div className={"eyes"}>
            <div className="right-eye">
                <div className="circle"></div>
            </div>
            <div className="left-eye">
                <div className="circle"></div>
            </div>
            </div>

        {/*<div className="container">*/}
        {/*    <div ref={eye} className="eyes"></div>*/}
        {/*    <div className="eyes"></div>*/}
        {/*</div>*/}
            {/*<Button onClick={()=> clicker()}> </Button>*/}
        </div>
    )
} export default EyeBalls;