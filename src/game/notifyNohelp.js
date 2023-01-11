import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import React from "react";

function NotifyNoHelp({openWhen,onClickNext}) {
    return (
        <>
            <Modal show={openWhen}>
                <Modal.Header closeButton>
                    <Modal.Title>Notice!</Modal.Title>
                </Modal.Header>
                <Modal.Body>The robot received no help, neither from you nor from Alex or Kate.</Modal.Body>
                <Modal.Footer>
                        <Button variant="primary" onClick={onClickNext}>
                        Next
                        </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
} export default NotifyNoHelp;