//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import { MDBInput } from "mdbreact";
//#endregion

//#region > Components
/** @class Custom input */
class AIInput extends React.Component {
  render() {
    const { label, name, checked, className } = this.props;

    return (
      <MDBInput
        label={label}
        type="checkbox"
        id={name}
        containerClass={className}
        checked={checked}
        onChange={(e) => this.props.handleChange(e.target.checked)}
      />
    );
  }
}
//#endregion

//#region > Exports
export default AIInput;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Simon Prast
 */
