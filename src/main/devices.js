import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import Device from "./device";
import CssBaseline from "@material-ui/core/CssBaseline";
import { updateStatus } from "../core/actions/device";

const styles = theme => ({
  root: {},
  buttonGroup: {
    marginBottom: 10,
    display: "flex",
    justifyContent: "flex-end"
  },
  searchField: {
    marginBottom: 20
  },
  button: {
    margin: theme.spacing.unit * 2
  },
  control: {
    marginVertical: theme.spacing.unit * 2,
    display: "flex",
    justifyContent: "space-between",
  }
});

class Devices extends React.Component {
  render() {
    const { classes, devices, updateStatus } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        {devices.map((device, index) => (
          <Device
            key={`device-${index}-${Date.now()}`}
            device={device}
            updateStatus={updateStatus}
          />
        ))}
      </div>
    );
  }
}

Devices.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(
  connect(
    ({ device }) => ({
      devices: device
    }),
    dispatch => ({
      updateStatus: (udid, status) => dispatch(updateStatus(udid, status))
    })
  )(Devices)
);
