//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import { MDBSwitch } from "mdbreact";
//#endregion

//#region > Components
/** @class Custom toggle button */
class AIToggle extends React.Component {
  render() {
    const {
      title,
      description,
      name,
      labelLeft,
      labelRight,
      checked,
    } = this.props;

    return (
      <>
        <p className="mb-0 mt-3">{title}</p>
        <p className="text-muted small mb-1">{description}</p>
        <MDBSwitch
          name={name}
          labelLeft={labelLeft}
          labelRight={labelRight}
          checked={checked}
          onChange={() => this.props.change(name)}
        />
      </>
    );
  }
}
//#endregion

//#region > Exports
export default AIToggle;
//#endregion

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2020 Simon Prast
 */
