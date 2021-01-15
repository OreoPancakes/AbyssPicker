import React from "react";
import PropTypes from "prop-types";

import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

import CharacterButton from "./CharacterButton";

import characters from "../config/characterInfo";

class ResultsPanel extends React.Component {
  renderBody() {
    let pickOrBanText = this.props.results.inPickMode ? "Picked" : "Banned";
    return (
      <Container>
        <Row>
          <h4>{`${pickOrBanText} Characters`}</h4>
        </Row>
        <Row>
          {this.props.results.finalSelectedCharacters.map((charName) => {
            let info = characters[charName];
            return (
              <div key={charName} className="p-2">
                <div>
                  <CharacterButton
                    name={charName}
                    charInfo={info}
                    onClick={() => {}}
                  />
                </div>
              </div>
            );
          })}
        </Row>
        <Row>
          <h5>Text</h5>
        </Row>
        <Row>{this.props.results.finalSelectedCharacters.join(", ")}</Row>
      </Container>
    );
  }

  render() {
    return (
      <Modal show={true} onHide={this.props.onClose}>
        <Modal.Header>
          <Modal.Title>
            <h2>Results</h2>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.renderBody()}</Modal.Body>
        <Modal.Footer>
          <Button
            className="btn btn-secondary"
            block
            onClick={this.props.onClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

ResultsPanel.propTypes = {
  onClose: PropTypes.func.isRequired,
  results: PropTypes.shape({
    inPickMode: PropTypes.bool,
    finalSelectedCharacters: PropTypes.arrayOf(PropTypes.string),
  }),
};

export default ResultsPanel;
