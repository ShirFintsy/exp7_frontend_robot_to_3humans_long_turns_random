import Button from "react-bootstrap/Button";
import './theQuiz.css';

function TheQuiz({quizType, imgSrc, onTagButtonCat, onTagButtonDog}) {

    return(
       <div className={quizType ? "robot-quiz" : null}>
           {quizType ?
               <h1>The Robot Quiz</h1> :
               <></>
           }
           <h2>Please classify the following image</h2>
           <div>
               <img className={"img-to-cls"} src={imgSrc} alt="pet"/>
               <div>
                   <Button style={{"backgroundColor": "sandybrown", "borderColor": "sandybrown"}}
                           className={"class-btn"} onClick={onTagButtonCat}>Cat</Button>
                   <Button style={{"backgroundColor": "cornflowerblue", "borderColor": "cornflowerblue"}}
                           className={"class-btn"} onClick={onTagButtonDog}>Dog</Button>
               </div>
           </div>
       </div>
    )
}
export default TheQuiz;