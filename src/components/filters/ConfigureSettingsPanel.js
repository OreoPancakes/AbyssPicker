import React from "react";
import PropTypes from "prop-types";

import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

import IncludedCharModal from "../IncludedCharModal";

class ConfigureSettingsPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedChars: new Set(this.props.selectedChars),
      isIncludedCharModalOpen: false,
    };
  }

  openIncludedCharModal = () => {
    this.setState({ isIncludedCharModalOpen: true });
  };

  saveIncludedCharModal = (newIncludedChars) => {
    this.setState(
      {
        isIncludedCharModalOpen: false,
      },
      () => this.props.updateIncludedChars(newIncludedChars)
    );
  };

  closeIncludedCharModal = () => {
    this.setState({ isIncludedCharModalOpen: false });
  };

  renderIncludedCharModal() {
    return (
      <IncludedCharModal
        show={this.state.isIncludedCharModalOpen}
        selectedChars={this.props.includedChars}
        handleSave={this.saveIncludedCharModal}
        handleCancel={this.closeIncludedCharModal}
      ></IncludedCharModal>
    );
  }

  render() {
    let banButtonVariant = this.props.inPickMode ? "secondary" : "warning";
    let pickButtonVariant = this.props.inPickMode ? "warning" : "secondary";

    let numIncluded = this.props.includedChars.length;
    return (
      <div>
        <Container>
          <Form>
            <Form.Group as={Row}>
              <Form.Label column={2}>
                Click on characters on the right to exclude/include them in the
                pick or ban.
              </Form.Label>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column={2}>Pick or Ban?</Form.Label>
              <ButtonGroup size="lg" toggle={true} className="pr-3">
                <Button
                  className={`btn btn-${banButtonVariant}`}
                  onClick={() => this.props.setUsePickMode(false)}
                >
                  Ban
                </Button>
                <Button
                  className={`btn btn-${pickButtonVariant}`}
                  onClick={() => this.props.setUsePickMode(true)}
                >
                  Pick
                </Button>
              </ButtonGroup>
            </Form.Group>
            <Form.Group as={Row} className="pr-3">
              <Form.Label column={2}>Auto-Include Characters</Form.Label>
              <Button
                className={`btn btn-warning`}
                onClick={this.openIncludedCharModal}
              >
                {`${numIncluded} selected`}
              </Button>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column={2}>Number of Characters</Form.Label>
              <Col>
                <Form.Control
                  type="number"
                  placeholder="#"
                  value={this.props.numChars}
                  onChange={({ target: { value } }) =>
                    this.props.handleNumCharChange(value)
                  }
                />
              </Col>
            </Form.Group>
          </Form>
        </Container>
        {this.state.isIncludedCharModalOpen && this.renderIncludedCharModal()}
      </div>
    );
  }
}

ConfigureSettingsPanel.propTypes = {
  includedChars: PropTypes.arrayOf(PropTypes.string),
  inPickMode: PropTypes.bool.isRequired,
  setUsePickMode: PropTypes.func.isRequired,
  handleNumCharChange: PropTypes.func.isRequired,
  updateIncludedChars: PropTypes.func.isRequired,
};

export default ConfigureSettingsPanel;
