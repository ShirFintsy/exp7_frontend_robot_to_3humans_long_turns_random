import Button from "react-bootstrap/Button";
import React, {useEffect, useState} from "react";
import './mainHelpRequestPage.css'
import EyeBalls from "./eyeBalls";
import {ImageList, ImageListItem, ImageListItemBar} from "@mui/material";

function MainHelpRequestPage({profilePicture, username, onClickYes, onClickNo}) {
    const [popButtons, setPop] = useState(false);
    let srcImage = null;
    if (profilePicture === "default") { //todo: change with real images
        srcImage = "https://t3.ftcdn.nbyet/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg";
    } else if (profilePicture === "woman1") {
        //srcImage = "https://img.freepik.com/premium-vector/woman-profile-cartoon_18591-58480.jpg?w=2000";
        srcImage = "profile_pictures/woman1.webp";
    } else {
        //srcImage = "https://thumbs.dreamstime.com/b/man-profile-cartoon-smiling-round-icon-vector-illustration-graphic-design-135443422.jpg";
        srcImage = "profile_pictures/man1.jpeg"
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
            <div id={"robot-eyes"} style={{"border": 'double', "margin": '20px'}}>
                <EyeBalls/>
                {/*<img alt={"eye-robot-image"} src={"radio-bot-animated.gif"}/>*/}
            </div>
            <div className={"list-of-names"}>
            <ImageList sx={{ width: '100%', height: '100%'}}>
                {itemData.map((item) => (
                    <ImageListItem key={item.img}>
                        <img src={`${item.img}?w=248&fit=crop&auto=format`}
                             srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`} alt={item.name} loading="lazy"/>
                        <ImageListItemBar title={item.name} subtitle={<span>{item.user}</span>} position="below"/>
                    </ImageListItem>
                ))}
            </ImageList>
            </div>
            {/*<ul id={"profile-pics"}>*/}
            {/*    <li style={{"display": "inline"}}>*/}
            {/*        Alex*/}
            {/*        <img className={"images"} alt={"Alex"} src={"man.gif"}/>*/}
            {/*    </li>*/}
            {/*    <li style={{"display": "inline"}}>*/}
            {/*        {username}*/}
            {/*        <img className={"images"} alt={"user"} src={srcImage}/>*/}
            {/*    </li>*/}
            {/*</ul>*/}
            { popButtons ?
                <div className={"buttons"}>
                    <Button style={{"backgroundColor": "cornflowerblue", "borderColor": "cornflowerblue", "width": "60px"}}
                           className={"class-btn"} onClick={onClickYes}> Yes</Button>
            <Button style={{"backgroundColor": "cornflowerblue", "borderColor": "cornflowerblue", "width": "60px"}}
                           className={"class-btn"} onClick={onClickNo}> No</Button>
                </div>:
            <></> }

        </div>
    )
} export default MainHelpRequestPage;