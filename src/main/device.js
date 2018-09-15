import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
<<<<<<< HEAD
import { connect } from "react-redux";
=======
import classnames from "classnames";
>>>>>>> bd2d8e32b2eea7b789b2307f24acfe4800b75eb1
import { IPHONE_IMAGE_URI, ANDROID_IMAGE_URI } from "../core/config";
import * as enums from "../core/constants";
import { plugDevice, unplugDevice } from "../core/actions/device";

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
  }
});

class Device extends React.Component {
  constructor(props) {
    super(props);

    this._removeDevice = this._removeDevice.bind(this);
    this._plug = this._plug.bind(this);
    this._unplug = this._unplug.bind(this);
  }

  _removeDevice() {
    const { device, requestRemoving } = this.props;
    requestRemoving(device.udid);
  }

  _plug() {
    this.props.plugDevice(this.props.device.udid);
  }

  _unplug() {
    this.props.unplugDevice(this.props.device.udid);
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
          <Grid item xs={6}>
            <h2 className={classes.deviceName}>{device.deviceName}</h2>
            <p className={classes.deviceInfo}>
              {device.platformName === enums.PLATFORM.IOS ? "iOS" : "Android"}{" "}
              {device.platformVersion}
            </p>
            <p className={classes.deviceInfo}>UDID: {device.udid}</p>
          </Grid>
          <Grid item xs={3}>
            {device.state === enums.DEVICE_STATES.PLUGGED ? (
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={this._unplug}
              >
                UNPLUG
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={this._plug}
              >
                PLUG
              </Button>
            )}
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
      plugDevice: udid => dispatch(plugDevice(udid)),
      unplugDevice: udid => dispatch(unplugDevice(udid))
    })
  )(Device)
);
