import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import Device from "./device";
<<<<<<< HEAD
import CssBaseline from "@material-ui/core/CssBaseline";
import { loadDevices } from "../core/actions/device";

const styles = theme => ({
  root: {},
=======
import Typography from "@material-ui/core/Typography";
import LinearProgress from '@material-ui/core/LinearProgress';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import { removeDevice } from "./actions";
import * as enums from "../core/constants"

const styles = theme => ({
  root: {
    borderRadius: 10,
    height: '100%'
  },
>>>>>>> bd2d8e32b2eea7b789b2307f24acfe4800b75eb1
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
