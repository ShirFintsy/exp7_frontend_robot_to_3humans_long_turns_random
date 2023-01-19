import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import React from "react";

function HelpRequests({openWhen,onClickNext}) {
    return (
        <>
            <Modal show={openWhen}>
                <Modal.Header closeButton>
                    <Modal.Title>Attention!</Modal.Title>
                </Modal.Header>
                <Modal.Body>The robot needs help.</Modal.Body>
                <Modal.Footer>
                        <Button variant="primary" onClick={onClickNext}>
                        Next
                        </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
} export default HelpRequests;