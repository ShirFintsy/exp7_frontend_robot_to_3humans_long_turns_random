import Button from "react-bootstrap/Button";
import React, {useEffect, useRef} from "react";
import useSound from "use-sound";
import './mainHelpRequestPage.css'

function MainHelpRequestPage({profilePicture, username, onClickYes, onClickNo}) {
    // var soundSource = React.createRef();
    const audioSrc = useRef(null);
    // const audio = document.getElementById('audio')
        useEffect(() => {
        setTimeout(() => {
            audioSrc.current.pause();
            }, 4000);
        // playSound();
    }, []);
    return (
        <>
            <audio id="audio" loop autoPlay>
                <source src="/sounds/help_request.mp3" type="audio/mpeg" ref={audioSrc}></source>
            </audio>

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
                           className={"class-btn"} onClick={onClickYes}> Yes</Button>
            <Button style={{"backgroundColor": "cornflowerblue", "borderColor": "cornflowerblue", "width": "60px"}}
                           className={"class-btn"} > No</Button>
        </>
    )
} export default MainHelpRequestPage;