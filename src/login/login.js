import {useContext} from "react";
import {SessionContext, WebSocketContext} from "../utils/sessions";
import {useHistory} from "react-router-dom";
import * as Survey from "survey-react";
import {parse} from "querystring";
import "./login.css";

function Login(props) {
  const {_, setSession} = useContext(SessionContext);
  const websocket = useContext(WebSocketContext);
  const history = useHistory();
  const urlParams = parse(props.location.search.substring(1));

  const onComplete = (survey, options) => {
    const session = {"prolific_pid": urlParams.PROLIFIC_PID, "name": survey.data.name}
    setSession(session);
    const info = Object.assign({}, survey.data,
      {"study_id": urlParams.STUDY_ID, "session_id": urlParams.SESSION_ID})
    websocket.send(JSON.stringify({"action": "participant-info", "session": session, "info": info}));
    history.push("/");
  }

  const json = {
    questions: [
      {
        type: "text",
        name: "name",
        title: "nickname",
        hasNone: false,
        isRequired: true
      }, {
        type: "radiogroup",
        name: "gender",
        title: "Gender",
        isRequired: true,
        hasNone: false,
        choices: ["Female", "Male"]
      }, {
        name: "age",
        type: "text",
        inputType: "number",
        min: 18,
        title: "Your age:",
        isRequired: true,
      }, {
        type: "imagepicker",
        name: "user picture",
        title: "Choose your profile picture",
        isRequired: true,
        choices: [
          {
            "value": "default",
            "imageLink": "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg",
          }, {
            "value": "woman1",
            "imageLink": "https://avatoon.me/wp-content/uploads/2021/09/Cartoon-Pic-Ideas-for-DP-Profile11.png",
          }, {
            "value": "man1",
            "imageLink": "https://avatoon.me/wp-content/uploads/2021/09/Cartoon-Pic-Ideas-for-DP-Profile-01.png",
          }, {
            "value":"man2",
            "imageLink":"https://avatoon.me/wp-content/uploads/2021/09/Cartoon-Pic-Ideas-for-DP-Profile-02-768x768.png"
          }, {
            "value":"man3",
            "imageLink":"https://avatoon.me/wp-content/uploads/2021/09/Cartoon-Pic-Ideas-for-DP-Profile-10.png"
          }, {
            "value":"woman2",
            "imageLink":"https://avatoon.me/wp-content/uploads/2021/09/Cartoon-Pic-Ideas-for-DP-Profile08.png"
          }, {
            "value":"woman3",
            "imageLink":"https://avatoon.me/wp-content/uploads/2021/09/Cartoon-Pic-Ideas-for-DP-Profile12.png"
          }, {
            "value":"woman4",
            "imageLink":"https://avatoon.me/wp-content/uploads/2021/09/Cartoon-Pic-Ideas-for-DP-Profile15.png"
          }
        ],
      }
    ]
  };

  return (
    <div className={"login-page-div"}>
      <h1 className={"app-heading-h1"}>Welcome to our experiment!</h1>
      <Survey.Survey json={json} onComplete={onComplete}/>
    </div>
  )
}

export default Login;