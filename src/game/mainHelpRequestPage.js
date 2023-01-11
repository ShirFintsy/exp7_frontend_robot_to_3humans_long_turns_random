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
        srcImage = "profile_pictures/woman1.png";
    } else if (profilePicture === "woman2") {
        srcImage = "profile_pictures/woman2.png";
    } else if (profilePicture === "woman3") {
        srcImage = "profile_pictures/woman3.png";
    } else if (profilePicture === "woman4") {
        srcImage = "profile_pictures/woman4.png";
    } else if (profilePicture === "man1") {
        srcImage = "profile_pictures/man1.png";
    } else if (profilePicture === "man2") {
        srcImage = "profile_pictures/man2.png";
    } else { //man3
        srcImage = "profile_pictures/woman3.png";
    }

    const itemData = [
  {
    img: 'man.gif',
    name: 'Alex',
    user: '',
  },{
    img: 'kate_img.webp',
    name: 'Kate',
    user: '',
  }, {
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
                <p className={"request-text"}> I can't identify my picture. Can one of you help me?</p>
                <EyeBalls/>
            </div>
            <div className={"list-of-names"}>
            <ImageList sx={{ width: '100%', height: '100%'}} style={{display: 'flex'}}>
                {itemData.map((item) => (
                    <ImageListItem style={{marginLeft: '60px', marginRight: '60px', width: '30%'}} key={item.img}>
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
                    <Button style={{"backgroundColor": "darksalmon", "borderColor": "darksalmon", "width": "100px"}}
                           className={"class-btn"} onClick={onClickYes}> I'll help</Button>
            <Button style={{"backgroundColor": "darksalmon", "borderColor": "darksalmon", "width": "100px"}}
                           className={"class-btn"} onClick={onClickNo}> No, sorry</Button>
                </div>:
            <></> }

        </div>
    )
} export default MainHelpRequestPage;