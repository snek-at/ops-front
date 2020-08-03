//#region > Imports
//> React
// Contains all the functionality necessary to define React components
import React from "react";
//#endregion

//#region > Components
/** @class Custom input */
class AIInput extends React.Component {
  render() {
    const {
      type,
      title,
      description,
      name,
      placeholder,
      value,
      className,
    } = this.props;

    if (type !== "textarea") {
      return (
        <div className={className}>
          {title && <p className="mb-0 mt-3">{title}</p>}
          {description && (
            <p className="text-muted small mb-1">{description}</p>
          )}
          <input
            type={type ? type : "text"}
            name={name}
            placeholder={placeholder}
            value={value}
            onChange={(e) =>
              this.props.handleChange(
                e.target.name,
                type === "number"
                  ? !isNaN(e.target.value)
                    ? parseInt(e.target.value)
                    : e.target.value
                  : e.target.value
              )
            }
            className="form-control"
          />
        </div>
      );
    } else {
      return (
        <div className={className}>
          <p className="mb-0 mt-3">{title}</p>
          <p className="text-muted small mb-1">{description}</p>
          <textarea
            name={name}
            placeholder={placeholder}
            value={value}
            rows="4"
            onChange={(e) =>
              this.props.handleChange(e.target.name, e.target.value)
            }
            className="form-control"
          />
        </div>
      );
    }
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
