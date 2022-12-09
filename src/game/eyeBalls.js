
import './eyeBalls.css'

function EyeBalls() {


    // useEffect(() => {
    //     setTimeout(() => {
    //         setSide(!side);
    //         // if (side) {
    //         //
    //         // }
    //     }, 2500);
    // }, [side]);

    return (
        <div className={"all-robot"} style={{ backgroundImage: "url(/cute_robot2.jpg)", backgroundRepeat  : 'no-repeat',
       backgroundPosition: 'center', backgroundSize: 'contain', width: 700, height: 700, display: 'block'}}>
        <div className="container">
            <div className="eyes"></div>
            <div className="eyes"></div>
        </div>
        </div>
    )
} export default EyeBalls;