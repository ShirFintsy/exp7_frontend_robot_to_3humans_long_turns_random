import Button from "react-bootstrap/Button";
import React, {useEffect, useRef} from "react";
import useSound from "use-sound";
import './mainHelpRequestPage.css'

function MainHelpRequestPage({profilePicture, username, onClickYes, onClickNo}) {
    let popButtons = false;
    useEffect( () => {
        setTimeout(() => {
            popButtons = true; // the sound finished and the buttons will pop
        }, 4000);
    }, []);
    return (
        <>
            <div id={"robot-eyes"}>
                <img alt={"eye-robot-image"} src={"radio-bot-animated.gif"}/>
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