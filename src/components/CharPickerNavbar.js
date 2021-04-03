import React from "react";

import Image from "react-bootstrap/Image";
import Navbar from "react-bootstrap/Navbar";

class CharacterPicker extends React.Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>
          <Image
            src="favicon.ico"
            width="30"
            height="30"
            className="mr-2 d-inline-block align-top"
            roundedCircle={true}
          />
          OreoPancakes's Abyss Character Picker
        </Navbar.Brand>
      </Navbar>
    );
  }
}

export default CharacterPicker;
