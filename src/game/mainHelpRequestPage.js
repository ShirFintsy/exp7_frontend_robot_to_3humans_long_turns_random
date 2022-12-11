import Button from "react-bootstrap/Button";
import React, {useEffect, useState} from "react";
import './mainHelpRequestPage.css'
import EyeBalls from "./eyeBalls";

function MainHelpRequestPage({profilePicture, username, onClickYes, onClickNo}) {
    const [popButtons, setPop] = useState(false);
    let srcImage = null;
    if (profilePicture === "default") { //todo: change with real images
        srcImage = "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg";
    } else if (profilePicture === "woman1") {
        srcImage = "https://img.freepik.com/premium-vector/woman-profile-cartoon_18591-58480.jpg?w=2000";
    } else {
        srcImage = "https://thumbs.dreamstime.com/b/man-profile-cartoon-smiling-round-icon-vector-illustration-graphic-design-135443422.jpg";
    }

    useEffect( () => {
        setTimeout(() => {
            setPop(true); // the sound finished and the buttons will pop
        }, 5000);
    }, []);
    return (
        // <div style={{ backgroundImage: "url(/man_and_robot.png)" }}>
        <div>
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
                    <img className={"images"} alt={"user"} src={srcImage}/>
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

        </div>
    )
} export default MainHelpRequestPage;