import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import Device from "./device";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import ConfirmDialog from "../core/components/confirm";
import { removeDevice } from "../core/services/device";

const styles = theme => ({
  root: {
    borderRadius: 10
  },
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

    this.state = {
      searchKey: "",
      removingDeviceUdid: null,
      isConfirmingRemoving: false
    };

    this._search = this._search.bind(this);
    this._preRemoveDevice = this._preRemoveDevice.bind(this);
    this._removeDevice = this._removeDevice.bind(this);
    this._cancelRemoveDevice = this._cancelRemoveDevice.bind(this);
  }

  _search(e) {
    this.setState({
      searchKey: e.target.value.toLowerCase()
    });
  }

  _openConfirmationDialog() {
    this.setState({
      isConfirmingRemoving: true
    });
  }

  _closeConfirmatioDialog() {
    this.setState({
      isConfirmingRemoving: false
    });
  }

  _preRemoveDevice(udid) {
    this.setState({
      removingDeviceUdid: udid
    });
    this._openConfirmationDialog();
  }

  _removeDevice() {
    const { removeDevice } = this.props;
    this._closeConfirmatioDialog();
    removeDevice(this.state.removingDeviceUdid);
    setTimeout(
      () =>
        this.setState({
          removingDeviceUdid: null
        }),
      100
    );
  }

  _cancelRemoveDevice() {
    this._closeConfirmatioDialog();
    setTimeout(
      () =>
        this.setState({
          removingDeviceUdid: null
        }),
      100
    );
  }

  render() {
    const { classes, devices } = this.props;
    return (
      <div className={classes.root}>
        <ConfirmDialog
          mainText="Removing device"
          extraText={`Device with udid '${
            this.state.removingDeviceUdid
          }' will be removed. Continue?`}
          open={this.state.isConfirmingRemoving}
          handleCloseWithAgree={this._removeDevice}
          handleCloseWithDisagree={this._cancelRemoveDevice}
        />
        <Typography variant="title" gutterBottom>
          DEVICE LIST
        </Typography>
        <CssBaseline />
        <Input
          className={classes.searchField}
          fullWidth
          placeholder="Search your phone"
          onChange={this._search}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
        {devices
          .filter(device => {
            const { searchKey } = this.state;
            if (searchKey === "") return true;
            return (
              device.deviceName.toLowerCase().includes(searchKey) ||
              device.udid.includes(searchKey)
            );
          })
          .map((device, index) => (
            <Device
              key={`device-${index}`}
              device={device}
              requestRemoving={this._preRemoveDevice}
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
    state => ({
      devices: state.device.devices
    }),
    dispatch => ({
      removeDevice: udid => dispatch(removeDevice(udid))
    })
  )(Devices)
);
