
// import './eyeBalls.css'

function EyeBalls({}) {
    let eyeBall = document.querySelector(".eyeball"),
    pupil = document.querySelector(".pupil"),
    eyeArea = eyeBall.getBoundingClientRect(),
    pupilArea = pupil.getBoundingClientRect(),
    R = eyeArea.width/2,
    r = pupilArea.width/2,
    centerX = eyeArea.left + R,
    centerY = eyeArea.top + R,
        theta = Math.atan2(centerY,centerX),
    angle = theta * 180/Math.PI + 360;

    pupil.style.transform = `translateX(${R - r +"px"}) rotate(${angle + "deg"})`;
    pupil.style.transformOrigin = `${r +"px"} center`;

// document.addEventListener("mousemove", (e)=>{
//   let x = e.clientX - centerX,
//       y = e.clientY - centerY,
//       theta = Math.atan2(y,x),
//       angle = theta*180/Math.PI + 360;
//
// }

    return (
        <>
            <svg width="100" height="100" className="eye">
                <circle cx="50" cy="50" r="50" fill="white" className="eyeball"/>
                <circle cx="50" cy="50" r="30" fill="#0D0D20" className="pupil"/>
            </svg>
        </>
    )
} export default EyeBalls;