
import './eyeBalls.css'
import {createRef, useEffect, useState} from "react";
import Button from "react-bootstrap/Button";

function EyeBalls() {
    const [eyeMovement, changeMove] = useState(false);

    const eye = createRef();
    const clicker = () => {
        const look = eye.current;
        look.classList.toggle('after-look');
    }

    useEffect(() => {
        setTimeout(() => {
            changeMove(!eyeMovement);
            //clicker();
        }, 1000);
    },[eyeMovement]);
    // useEffect(() => {
    //     const look = eye.current;
    //     // if (eyeMovement) {
    //     //     look.classList.toggle('after-look')
    //     // }
    //     look.classList.toggle('after-look');
    //     setTimeout(() => {
    //         changeMove(!eyeMovement);
    //     }, 2000);
    // }, [eyeMovement]);

    return (
        <div className={"all-robot"} style={{ backgroundImage: "url(/eyes_of_the_robot.jpeg)", backgroundRepeat  : 'no-repeat',
       backgroundPosition: 'center 0%', backgroundSize: 'contain', width: '100%', height: '450px', display: 'block'}}>
        <div className="container">
            <div ref={eye} className="eyes"></div>
            <div className="eyes"></div>
        </div>
            {/*<Button onClick={()=> clicker()}> </Button>*/}
        </div>
    )
} export default EyeBalls;