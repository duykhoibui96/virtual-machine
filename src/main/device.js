import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { IPHONE_IMAGE_URI, ANDROID_IMAGE_URI } from "../core/config";
import * as enums from "../core/constants";

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

    this._getText = this._getText.bind(this);
    this._updateStatus = this._updateStatus.bind(this);
  }

  _updateStatus() {
    const { device, updateStatus } = this.props;
    let status = enums.DEVICE_STATES.ACTIVATING;
    if (device.state === enums.DEVICE_STATES.ACTIVATED) {
      status = enums.DEVICE_STATES.DEACTIVATING;
    }
    updateStatus(device.udid, status);
  }

  _getText() {
    const { device } = this.props;
    switch (device.state) {
      case enums.DEVICE_STATES.DEACTIVATING:
        return "DEACTIVATING ...";
      case enums.DEVICE_STATES.ACTIVATING:
        return "ACTIVATING ...";
      case enums.DEVICE_STATES.DEACTIVATED:
        return "ACTIVATE";
      case enums.DEVICE_STATES.ACTIVATED:
        return "DEACTIVATE";
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
                device.state === enums.DEVICE_STATES.DEACTIVATING ||
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
  device: PropTypes.object.isRequired
};

export default withStyles(styles)(Device);
