import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import classnames from "classnames";
import { IPHONE_IMAGE_URI, ANDROID_IMAGE_URI } from "../core/config";
import * as enums from "../core/constants";
import { updateStatus } from "../core/actions/device";

const styles = theme => ({
  root: {
    backgroundColor: "white",
    flexGrow: 1,
    padding: theme.spacing.unit * 2,
    boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.5)",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#D4CBCB"
    }
  },
  phoneImage: {
    width: 150,
    height: 170
  },
  button: {
    margin: theme.spacing.unit,
    width: "70%"
  },
  remove: {
    backgroundColor: "#C62828",
    color: "white",
    "&:hover": {
      color: "white",
      backgroundColor: "#B71C1C"
    }
  },
  column: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  center: {
    alignSelf: "center"
  },
  noMargin: {
    margin: 0
  },
  deviceName: {
    margin: 0,
    fontWeight: "bold"
  },
  deviceInfo: {
    margin: 0,
    marginTop: 10,
    color: "rgba(0,0,0,0.7)",
    display: "block"
  },
  status: {
    color: "gray"
  }
});

class Device extends React.Component {
  constructor(props) {
    super(props);

    this._removeDevice = this._removeDevice.bind(this);
    this._updateStatus = this._updateStatus.bind(this);
    this._getText = this._getText.bind(this);
  }

  _removeDevice() {
    const { device, requestRemoving } = this.props;
    requestRemoving(device.udid);
  }

  _updateStatus() {
    const { device, plugDevice, unplugDevice } = this.props;
    switch (device.state) {
      case enums.DEVICE_STATES.UNPLUGGED:
        plugDevice(device.udid);
        break;
      case enums.DEVICE_STATES.ACTIVATED:
        unplugDevice(device.udid);
        break;
    }
  }

  _getText() {
    const { device } = this.props;
    switch (device.state) {
      case enums.DEVICE_STATES.UNPLUGGING:
        return "UNPLUGGING ...";
      case enums.DEVICE_STATES.ACTIVATING:
        return "PLUGGING ...";
      case enums.DEVICE_STATES.UNPLUGGED:
        return "PLUG";
      case enums.DEVICE_STATES.ACTIVATED:
        return "UNPLUG";
    }
  }

  render() {
    const { classes, device } = this.props;
    return (
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={3}>
            <img
              src={
                device.platformName === enums.PLATFORM.IOS
                  ? IPHONE_IMAGE_URI
                  : ANDROID_IMAGE_URI
              }
              className={classes.phoneImage}
            />
          </Grid>
          <Grid item xs={5}>
            <h2 className={classes.deviceName}>{device.deviceName}</h2>
            <p className={classes.deviceInfo}>
              {device.platformName === enums.PLATFORM.IOS ? "iOS" : "Android"}{" "}
              {device.platformVersion}
            </p>
            <p className={classes.deviceInfo}>UDID: {device.udid}</p>
          </Grid>
          <Grid item xs={4} style={{ textAlign: "center" }}>
            <Button
              variant="contained"
              color={
                device.state === enums.DEVICE_STATES.ACTIVATED
                  ? "secondary"
                  : "primary"
              }
              disabled={
                device.state === enums.DEVICE_STATES.UNPLUGGING ||
                device.state === enums.DEVICE_STATES.ACTIVATING
              }
              className={classes.button}
              onClick={this._updateStatus}
            >
              {this._getText()}
            </Button>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Device.propTypes = {
  classes: PropTypes.object.isRequired,
  device: PropTypes.object.isRequired,
  requestRemoving: PropTypes.func.isRequired
};

export default withStyles(styles)(
  connect(
    null,
    dispatch => ({
      plugDevice: udid =>
        dispatch(updateStatus(udid, enums.DEVICE_STATES.ACTIVATING)),
      unplugDevice: udid =>
        dispatch(updateStatus(udid, enums.DEVICE_STATES.UNPLUGGING))
    })
  )(Device)
);
