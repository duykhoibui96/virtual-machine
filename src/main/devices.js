import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import Device from "./device";
import CssBaseline from "@material-ui/core/CssBaseline";
import { loadDevices } from "../core/actions/device";

const styles = theme => ({
  root: {},
  buttonGroup: {
    marginBottom: 10,
    display: "flex",
    justifyContent: "flex-end"
  },
  searchField: {
    marginBottom: 20
  }
});

class Devices extends React.Component {
  constructor(props) {
    super(props);

    this._removeDevice = this._removeDevice.bind(this);
    this._selectDevice = this._selectDevice.bind(this);
  }

  componentDidMount() {
    this.props.loadDevices();
  }

  componentWillUpdate(nextProps) {
    console.log(nextProps)
  }

  _removeDevice(udid) {
    alert("This feature is not available");
  }

  _selectDevice(udid) {
    this.props.selectDevice(udid);
  }

  render() {
    const { classes, devices } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        {devices.map((device, index) => (
          <Device
            key={`device-${index}-${Date.now()}`}
            device={device}
            requestRemoving={this._removeDevice}
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
      loadDevices: () => dispatch(loadDevices())
    })
  )(Devices)
);
