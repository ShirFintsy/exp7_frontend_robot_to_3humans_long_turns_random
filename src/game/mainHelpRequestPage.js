import Button from "react-bootstrap/Button";
import React, {useEffect, useState} from "react";
import './mainHelpRequestPage.css'
import EyeBalls from "./eyeBalls";
import {ImageList, ImageListItem, ImageListItemBar} from "@mui/material";

function MainHelpRequestPage({profilePicture, username, onClickYes, onClickNo}) {
    const [popButtons, setPop] = useState(false);
    let srcImage = null;
    if (profilePicture === "default") { //todo: change with real images
        srcImage = "profile_pictures/default.jpg";
    } else if (profilePicture === "woman1") {
        srcImage = "profile_pictures/woman1.webp";
    } else {
        srcImage = "profile_pictures/man1.jpeg";
    }

    const itemData = [
  {
    img: 'man.gif',
    name: 'Alex',
    user: '',
  },{
    img: srcImage,
    name: username,
    user: '(Me)',
  }
    ];

    useEffect( () => {
        setTimeout(() => {
            setPop(true); // the sound finished and the buttons will pop
        }, 5000);
    }, []);
    return (
        // <div style={{ backgroundImage: "url(/man_and_robot.png)" }}>
        <div >
            <div id={"robot-eyes"} style={{"border": 'double', "margin": '10px'}}>
                <EyeBalls/>
                {/*<img alt={"eye-robot-image"} src={"radio-bot-animated.gif"}/>*/}
            </div>
            <div className={"list-of-names"}>
            <ImageList sx={{ width: '100%', height: '100%'}}>
                {itemData.map((item) => (
                    <ImageListItem key={item.img}>
                        <img src={`${item.img}?w=248&fit=crop&auto=format`}
                             style={{borderRadius: '50%'}}
                             srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`} alt={item.name} loading="lazy"/>
                        <ImageListItemBar title={item.name} subtitle={<span>{item.user}</span>} position="below"/>
                    </ImageListItem>
                ))}
            </ImageList>
            </div>
            { popButtons ?
                <div className={"buttons"}>
                    <Button style={{"backgroundColor": "darksalmon", "borderColor": "darksalmon", "width": "200px"}}
                           className={"class-btn"} onClick={onClickYes}> I will be happy to help the robot</Button>
            <Button style={{"backgroundColor": "darksalmon", "borderColor": "darksalmon", "width": "200px"}}
                           className={"class-btn"} onClick={onClickNo}> I'm not interested in helping the robot</Button>
                </div>:
            <></> }

        </div>
    )
} export default MainHelpRequestPage;