import Button from "react-bootstrap/Button";
import React, {useEffect} from "react";
import useSound from "use-sound";
import './mainHelpRequestPage.css'

function MainHelpRequestPage({profilePicture, username}) {
    const [playSound] = useSound('/sounds/help_request.wav');
    useEffect(() => {
        playSound();
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
            <Button style={{"backgroundColor": "cornflowerblue", "borderColor": "cornflowerblue", "width": "60px"}}
                           className={"class-btn"}> Yes</Button>
            <Button style={{"backgroundColor": "cornflowerblue", "borderColor": "cornflowerblue", "width": "60px"}}
                           className={"class-btn"} > No</Button>
        </>
    )
} export default MainHelpRequestPage;