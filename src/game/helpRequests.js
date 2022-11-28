import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import React from "react";

function HelpRequests({openWhen,onClickNext}) {
    // let secondModelType = true; // normal - real help from user
    // if (helpNumber === 1) {
    //     secondModelType = false; // fake help on first request
    // }
    // const firstHelpModel = "I can't identify my image. Alex and " + name +", can one of you help me?";
    // const secHelpModel = "Would you like to interrupt your task to help the robot?";
    // const helpedAlready = "Alex already answer the robot's request. Thank you anyway..."
    return (
        <>
            <Modal show={openWhen}>
                <Modal.Header closeButton>
                    <Modal.Title>The robot needs help</Modal.Title>
                </Modal.Header>
                {/*<Modal.Body>{firstModel ? firstHelpModel :*/}
                {/*    <> {secondModelType ? secHelpModel : helpedAlready}</>}</Modal.Body>*/}
                <Modal.Footer>
                        <Button variant="primary" onClick={onClickNext}>
                        Next
                        </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
} export default HelpRequests;