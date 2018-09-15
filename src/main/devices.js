import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import Device from "./device";
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

    this.state = {
      searchKey: ""
    };

    this._search = this._search.bind(this);
    this._removeDevice = this._removeDevice.bind(this);
    this._renderDevices = this._renderDevices.bind(this);
  }

  _search(e) {
    this.setState({
      searchKey: e.target.value.toLowerCase()
    });
  }

  _removeDevice(udid) {
    const { removeDevice } = this.props;
    const willRemove = window.confirm(`Are your sure to remove this device (udid = '${udid}') ?`)
    if (willRemove)
      removeDevice(this.state.removingDeviceUdid);
  }

  _renderDevices() {
    const { devices, state, classes } = this.props;
    let filteredDevices
    switch (state) {
      case enums.DATA_STATES.LOADING:
        return <LinearProgress variant="query" />
      default:
        filteredDevices = devices
          .filter(device => {
            const { searchKey } = this.state;
            if (searchKey === "") return true;
            return (
              device.deviceName.toLowerCase().includes(searchKey) ||
              device.udid.includes(searchKey)
            );
          })
          .slice(0, 10)
    }
    return (
      filteredDevices.length > 0 ?
        <div>
          <div className={classes.control}>
            <FormGroup row style={{ flexGrow: 3 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={true}
                    value="isOnline"
                    color="primary"
                  />
                }
                label="Online"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={true}
                    value="isBooked"
                  />
                }
                label="Booked"
              />
            </FormGroup>
            <FormControl style={{ flexGrow: 1 }}>
              <Select
                value="all"
                inputProps={{
                  name: 'deviceType',
                  id: 'device-type',
                }}
              >
                <MenuItem value="all">
                  ALL DEVICES
                </MenuItem>
                <MenuItem value="private">PRIVATE DEVICES</MenuItem>
                <MenuItem value="cloud">CLOUD DEVICES</MenuItem>
                <MenuItem value="org">ORG DEVICES</MenuItem>
              </Select>
            </FormControl>
          </div>
          {
            filteredDevices.map((device, index) => (
              <Device
                key={`device-${index}`}
                device={device}
                requestRemoving={this._removeDevice}
              />
            ))
          }
        </div>
        :
        <Typography variant="notify" gutterBottom style={{ alignContent: 'center' }}>
          NO DEVICES
      </Typography>
    )
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Button variant="contained" color="secondary" className={classes.button} style={{ marginLeft: 0 }}>
          + ADD NEW DEVICE
        </Button>
        {this._renderDevices()}
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
      ...device
    }),
    dispatch => ({
      removeDevice: udid => dispatch(removeDevice(udid))
    })
  )(Devices)
);
