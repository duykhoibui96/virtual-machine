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
    boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.5)"
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
  }

  _removeDevice() {
    const { device, requestRemoving } = this.props;
    requestRemoving(device.udid);
  }

  render() {
    const { classes, device } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={8}>
          <Grid item xs={2}>
            <img
              src={
                device.platformName === enums.PLATFORM.IOS
                  ? IPHONE_IMAGE_URI
                  : ANDROID_IMAGE_URI
              }
              className={classes.phoneImage}
            />
          </Grid>
          <Grid item xs={7}>
            <h2 className={classes.deviceName}>{device.deviceName}</h2>
            <p className={classes.deviceInfo}>
              {device.platformName === enums.PLATFORM.IOS ? "iOS" : "Android"}{" "}
              {device.platformVersion}
            </p>
            <p className={classes.deviceInfo}>UDID: {device.udid}</p>
          </Grid>
          <Grid item xs={3} className={classes.column}>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
            >
              PLUG IN
            </Button>
            <Button
              variant="contained"
              onClick={this._removeDevice}
              className={[classes.button, classes.remove]}
            >
              REMOVE
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

export default withStyles(styles)(Device);
