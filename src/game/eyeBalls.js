
import './COPYeyeBalls.css'
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
       backgroundPosition: 'center 0%', backgroundSize: 'contain', width: '100%', height: '350px', display: 'block'}}>
        <div className="basic">
            <div className="left-eye">
                <div className={"eyeball"}></div>
            </div>
            <div className="right-eye">
                <div className={"eyeball"}></div>
            </div>
        </div>
        </div>
    )
} export default EyeBalls;