import Button from "react-bootstrap/Button";
import React, {useEffect, useRef, useState} from "react";
import useSound from "use-sound";
import './mainHelpRequestPage.css'
import EyeBalls from "./eyeBalls";

function MainHelpRequestPage({profilePicture, username, onClickYes, onClickNo}) {
    const [popButtons, setPop] = useState(false);
    useEffect( () => {
        setTimeout(() => {
            setPop(true); // the sound finished and the buttons will pop
        }, 5000);
    }, []);
    return (
        <>
            <div id={"robot-eyes"}>
                <EyeBalls/>
                {/*<img alt={"eye-robot-image"} src={"radio-bot-animated.gif"}/>*/}
            </div>
            <ul id={"profile-pics"}>
                <li style={{"display": "inline"}}>
                    Alex
                    <img className={"images"} alt={"Alex"} src={"man.gif"}/>
                </li>
                <li style={{"display": "inline"}}>
                    {username}
                    <img className={"images"} alt={"user"} src={profilePicture}/>
                </li>
            </ul>
            { popButtons ?
                <>
                    <Button style={{"backgroundColor": "cornflowerblue", "borderColor": "cornflowerblue", "width": "60px"}}
                           className={"class-btn"} onClick={onClickYes}> Yes</Button>
            <Button style={{"backgroundColor": "cornflowerblue", "borderColor": "cornflowerblue", "width": "60px"}}
                           className={"class-btn"} onClick={onClickNo}> No</Button>
                </>:
            <></> }

        </>
    )
} export default MainHelpRequestPage;