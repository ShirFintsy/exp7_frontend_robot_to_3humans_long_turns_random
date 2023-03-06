
import './eyeBalls.css'
import {createRef, useEffect, useState} from "react";
import Button from "react-bootstrap/Button";

function EyeBalls() {
    const [change, changeMove] = useState(false);
    const [firstTime, setFirst] = useState(true);

    // const eye = createRef();
    // const clicker = () => {
    //     const look = eye.current;
    //     let angel = -25
    //     // while (1) {
    //     look.classList.toggle('after-look');
    //     // look.style.transform = `translateY(${angel}%)`;
    //     // look.style.transform += `translateX(${angel}%)`;
    //         angel -= 3
    // }

    useEffect(() => {
        let angels = [];
        for (let i = 0; i < 3; i++){
            let r = Math.floor(Math.random() * 10) % 3
            switch (r){
                case 0: angels[i] = 40; break;
                case 1: angels[i] = 90; break;
                case 2: angels[i] = 140; break
            }
        }
        let angel11 = angels[0];
        let angel12 = angels[0];
        let angel21 = angels[1];
        let angel22 = angels[1];
        let angel31 = angels[2];
        let angel32 = angels[2];
        if (angel11 === 140){
            angel12 = -140;
        }
        if (angel21 === 140){
            angel22 = -140;
        }
        if (angel31 === 140){
            angel32 = -140;
        }
        console.log("angel1:", angel11);
        console.log("angel2:", angel21);
        console.log("angel3:", angel31);
        document.documentElement.style.setProperty('--angel11', angel11.toString() + "deg");
        document.documentElement.style.setProperty('--angel21', angel21.toString() + "deg");
        document.documentElement.style.setProperty('--angel31', angel31.toString() + "deg");
        document.documentElement.style.setProperty('--angel12', angel12.toString() + "deg");
        document.documentElement.style.setProperty('--angel22', angel22.toString() + "deg");
        document.documentElement.style.setProperty('--angel32', angel32.toString() + "deg");
        if (firstTime) {
            setTimeout(()=>{}, 2000);
            setFirst(false);
        }
        setTimeout(()=> {
            changeMove(!change)
        }, 10000);
    }, [change]);

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