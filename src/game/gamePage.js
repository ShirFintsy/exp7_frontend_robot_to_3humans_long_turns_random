import './gamePage.css'
import TheQuiz from './theQuiz';
import Button from 'react-bootstrap/Button';
import React, {useContext, useState, useEffect} from 'react';
import {SessionContext, WebSocketContext} from "../utils/sessions";
import {Link} from "react-router-dom";
import useSound from "use-sound";
import {throwOutFromExperiment} from "../utils/generalUtils";
import HelpRequests from "./helpRequests";
import MainHelpRequestPage from "./mainHelpRequestPage";
import NotifyNoHelp from "./notifyNohelp";


function GamePage() {
    const [isCompleteGame, setCompleteGame] = useState(false);
    const [imageSrc, setImageSrc] = useState(null);
    const [imageTag, setImageTag] = useState(null);
    const [botImageSrc, setBotImageSrc] = useState(null);
    const [score, setScore] = useState(0);
    const [waitForImage, setWaitForImage] = useState(false);
    const [needsHelp, setHelpRequest] = useState(false);
    const [robotQuiz, setQuiz] = useState(false);
    const [robotRunning, setRobot] = useState("Robot is currently classifying pictures");
    const [clickedYes, addClickYes] = useState(0);
    const [robotImgSrc, setImgSrc] = useState("robot_with_eyes.jpg");
    const [AlexImgSrc, setAlexImgSrc] = useState("Alex_and_Dave.png")
    const [loading, setLoading] = useState(false);
    const [loadingActivity, setLoadingAct] = useState("");
    const [robotAct, setRobotAct] = useState("Switching to robot's task");
    const [firstLoading, setFirst] = useState(0);
    const [humanRunning, setHuman] = useState("Alex and Dave are classifying pictures");
    const [AlexHelp, setAlexHelp] = useState(false);
    const [helpArray, setHelpArray] = useState([]);
    const [clickedNext, setClickedNext] = useState(false);
    const [name, setName] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [currentHelpNum, nextHelpNum] = useState(0);
    const [noHelpFromNoOne, setNoHelpFromNoOne] = useState(false);
    const [answeredYes, setAnsweredYes] = useState(false);
    const [counter, setCounter] = useState(0);
    const [finishedTime, setFinishedTime] = useState(0);
    const [answeredNo, setAnsweredNo] = useState([]);

    /**
     * Send a help request after getting 60 or 85 classifications or notify when game ended
     */
    useEffect(() => {
        // Change the page to pop up notification about help
        if (score === 29 ||  score === 45 || score === 61) {
            setHelpRequest(true);
            nextHelpNum(currentHelpNum + 1); // count the help request number
        }
        // if (score%3 === 1) { //debug
        //     setHelpRequest(true);
        // }

        // send to finish function
        if(score === 70){
            onCompleteGame();
        }

  }, [score]);

    /**
     * Calculate the text in the loading page
     */
    useEffect(() => {
        let seconds;
        if (firstLoading === 1) { seconds = 15; } // the switching to the user task will take 15 seconds
        else if (firstLoading === 2) { seconds = 20; } // the switching back will take 20 seconds
        if (loading) {
            for (let i=0; i<seconds; i++)
            setTimeout(() => setLoadingAct((seconds - i).toString()), 1000 * (i + 1));
        }
        // Reset the text after loading page finished:
        setTimeout(() => {
            if (firstLoading === 1){
                setRobotAct("Switching back to your task");
                setLoadingAct("");
            }
            else if (firstLoading === 2){
                setRobotAct("Switching to the robot's task");
                setLoadingAct("");
            }
        }, (seconds + 1) * 1000);
    }, [firstLoading])

    /**
     * Check if the user does not help the robot, and if so then it notify him about it- set the value "noHelpFromNoOne"
     * to true so that the notify pop up will show.
     */
    useEffect(() => {
        if (answeredYes === false && counter !== 0) {
            openNoHelpModel();
        }
        setAnsweredYes(false);
        setCounter(counter + 1);
    }, [finishedTime]);

    const [play_right_sound] = useSound('/sounds/right.mp3');
    const [play_wrong_sound] = useSound('/sounds/wrong.mp3');
    const [playHelpRequest] = useSound('/sounds/help_request.mp3');

     let timer = null;

    const websocket = useContext(WebSocketContext);
    const {session, setSession} = useContext(SessionContext);
    if (session === undefined) {
        alert("Refreshing of a page caused session lost");
        throwOutFromExperiment();
    }
    const playerName = session ? session.name : undefined;

    /**
     * Notify the server about starting the game in current user.
     */
    useEffect(() => websocket.send(JSON.stringify({"action": "start-game", "session": session})),
        [websocket, session]);

    /**
     * Notify the server when current user click "yes" on the help request.
     */
    useEffect(() => {
        websocket.send(JSON.stringify({"action": "update-click-counter", "yes": clickedYes, "session": session}));
    }, [clickedYes, websocket, session]);


    /**
     * Get an image for the game from server
     * @param event - the info from server
     */
    websocket.onmessage = function (event) {
        const data = JSON.parse(event.data);
        // Image for the current user game:
        if(data.type === "get-image") {
            setImageSrc("data:image/png;base64, " + data.image);
            setImageTag(data.tag);
        }
        // Image for the other user game (after clicked "yes" for help):
        else if(data.type === "get-bot-image") {
            setBotImageSrc("data:image/png;base64, " + data.image);
        } else if (data.type === "username") {
            setName(data.name);
            setProfileImage(data.profile);
        }
    }

    /**
     * Notify the server about the end of the game in current user.
     */
    const onCompleteGame = () => {
        websocket.send(JSON.stringify({"action": "complete-game", "help-array": helpArray,
            "no-answer-array": answeredNo,"session": session}));
        setCompleteGame(true);
    };

    /**
     * Changes in left screen after the user classify other user's image, and starting again the delay part - loading page
     * back to current user's task.
     * @returns {Promise<unknown>}
     */
    const afterHelp = () => {
        return new Promise(() => {
            setRobot("Thank You!")
            setTimeout(() => setRobot("Robot is currently classifying pictures"), 21000);
            setLoading(true);
            setFirst(2);
            setTimeout(() => {setLoading(false)}, 21000);
        })
    }

    const openNoHelpModel = () => {
        setTimeout(()=> {
            setNoHelpFromNoOne(true);
        }, 1500);
    }

     /**
     * When click on tag button (cat or dog)
     * @param playerTag - "cat" or "dog" tag
     * @param event - other user quiz or current user quiz
     * @returns {Promise<void>}
     */
    const onTagButton = async (playerTag, event) => {
        if (event === "robot") {
            setQuiz(false);
            await afterHelp();
            return;
        }
        if (playerTag === imageTag) {
            setScore(score + 1);
            play_right_sound();
        } else {
            play_wrong_sound();
        }
        setWaitForImage(true);
        websocket.send(JSON.stringify({"action": "get-new-image", "session": session}));
        timer = setTimeout(() => setWaitForImage(false), 20000);
    }

    /**
     * Changes in left screen when user clicked "yes" on help request, and starting the delay part - loading page to
     * other user's task.
     */
    const onHelpAnswer = () => {
        setAnsweredYes(true);
        if (score === 29) {setHelpArray(oldArray => [...oldArray, 1]);}
        if (score === 45) {setHelpArray(oldArray => [...oldArray, 2]);}
        if (score === 61) {setHelpArray(oldArray => [...oldArray, 3]);}

        setQuiz(true);
        setClickedNext(false); // close the requset page
        setRobot("");
        setImgSrc("robot_with_eyes.jpeg");
        setHuman("Alex and Dave are classifying pictures");
        addClickYes(clickedYes + 1);
        setLoading(true);
        setFirst(1);
        setTimeout(() => {setLoading(false)}, 16000);
         // Notify the server we need to get the other user image.
        websocket.send(JSON.stringify({"action": "get-bot-image", "session": session}));
    }

    /**
     * Changes in left screen when user clicked "no" on help request.
     */
     const handleCloseNext = () => {
         setTimeout(() => {
             playHelpRequest();
         }, 900)

        setHelpRequest(false);
        setClickedNext(true);
        setTimeout(() => {
            setFinishedTime(finishedTime + 1);
            handleCloseRequest();
        }, [27000])
        setImgSrc("thinking.gif");
        setRobot("The robot needs help...");
        setHuman("Alex and Dave are also stopped")
    }

    const handleCloseRequest = () => {
        setClickedNext(false);
        setRobot("");
        setImgSrc("robot_with_eyes.jpg");
        setHuman("Alex and Dave are classifying pictures")
    }
    /**
     * Handle the case where the user clicked the "no" button in the help request page
     */
    const handleNoRequest = () => {
        setAnsweredYes(true);
        openNoHelpModel();
        if (score === 29) {setAnsweredNo(oldArray => [...oldArray, 1]);}
        if (score === 45) {setAnsweredNo(oldArray => [...oldArray, 2]);}
        if (score === 61) {setAnsweredNo(oldArray => [...oldArray, 3]);}
        setClickedNext(false);
        setRobot("");
        setImgSrc("robot_with_eyes.jpg");
        setHuman("Alex and Dave are classifying pictures")
    }

    const handleCloseNotify = () => {
        //setAnsweredYes(0);
        setNoHelpFromNoOne(false);
    }

    return (
        <div className={"content"}>
                <div className={"main-content"}>
                    {!isCompleteGame ?
                        <div className={"cls-page"}>
                            <div className={"cls-page-col-2"}>
                                <div className={"score-div"}>Correct classification: {score}</div>
                                <div className={"answers-left"}>{70 - score} pictures left</div>
                                <div className={"participants-view-div"}>
                                    <div className={"virtual-player-status-div"}>
                                        {/* The model is the popup for the help request*/}
                                        <HelpRequests openWhen={needsHelp} onClickNext={handleCloseNext}/>
                                        <NotifyNoHelp openWhen={noHelpFromNoOne} onClickNext={handleCloseNotify}/>
                                    </div>
                                    {/* The left-down side of the screen, presenting the other user gif and his current
                                     state */}
                                    <div className={AlexHelp ? "block" : "match-parent"}>
                                        <div className={"robot-text"}> {robotRunning} </div>
                                        <img src={robotImgSrc} alt={"robot-pic"} className={"robot-pic"}/>
                                        <div className={AlexHelp ? null : "participants-view-div"}></div>
                                        <div className={"Alex-part"}>
                                            <img src={AlexImgSrc} alt={"Alex-pic"} className={"Alex-pic"}/>
                                                    <div className={"human-text"}>{humanRunning}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/*the main side of the window */}
                            <div className={"cls-page-col-1"}>
                                {loading ?
                                    <div className="loader-container">
                                        <div className={"list"}>
                                            <ul className={"list-spinner"}><div className="spinner"></div></ul>
                                            <ul>{robotAct}</ul>
                                            <ul className={"list-text"}>{loadingActivity}</ul>
                                        </div>
                                    </div> :
                                <div>
                                    { clickedNext ?
                                        <MainHelpRequestPage profilePicture={profileImage} username={name}
                                                             onClickYes={() => onHelpAnswer()}
                                                             onClickNo={() => handleNoRequest()}/>:
                                        <>{ robotQuiz ?
                                        <TheQuiz quizType={true} onTagButtonCat={() => onTagButton("", "robot")}
                                             onTagButtonDog={() => onTagButton("", "robot")} imgSrc={botImageSrc}/> :
                                        <div>
                                            <TheQuiz quizType={false} onTagButtonCat={() => onTagButton('Cat', "user")}
                                                 onTagButtonDog={() => onTagButton('Dog', "user")} imgSrc={imageSrc}/>
                                        </div>

                                    }</>
                                    }

                                </div>}
                        </div> {/* The end game screen */}
                        </div> :
                            <div>
                                <div className={"complete-game-div"}><strong>Thank you! <br/>You've completed 70 correct
                                    classifications.</strong><br/> Please continue to the feedback stage in order
                                    to successfully finish this Hit. <br/>
                                    <div><Link to={'/feedback'}><Button onClick={onCompleteGame}
                                                                        style={{
                                                                    "backgroundColor": "#1ab394",
                                                                    "borderColor": "#1ab394"
                                                                }}>Next</Button></Link>
                                    </div>
                                </div>
                            </div>}
                </div>
        </div>
    )
}
    export default GamePage;
