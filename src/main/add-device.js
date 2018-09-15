import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Button from "@material-ui/core/Button";
import * as enums from "../core/constants";
import { IPHONE_IMAGE_URI, ANDROID_IMAGE_URI } from "../core/config";
import { connect } from "react-redux";
import { addDevice } from "./actions";

const styles = theme => ({
  phoneImage: {
    width: "100%",
    height: "auto"
  },
  content: {
    marginTop: 20
  },
  formControl: {
    marginBottom: theme.spacing.unit
  },
  column: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  button: {
    width: "70%",
    margin: 10
  }
});

class AddDevice extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      platform: enums.PLATFORM.IOS
    };

    this._changePlatform = this._changePlatform.bind(this);
    this._addNewDevice = this._addNewDevice.bind(this);
  }

  _changePlatform(e) {
    this.setState({ platform: e.target.value });
  }

  _addNewDevice(e) {
    const { addDevice } = this.props;
    e.preventDefault();
    const { deviceName, devicePlatform, platformVersion } = e.target;
    addDevice({
      deviceName: deviceName.value,
      platformName: devicePlatform.value,
      platformVersion: platformVersion.value
    });
    alert("New device added");
    this.form.reset()
  }

  render() {
    const { classes } = this.props;
    const { platform } = this.state;
    return (
      <div>
        <Typography variant="title" gutterBottom>
          ADD DEVICE
        </Typography>
        <form ref={ref => (this.form = ref)} onSubmit={this._addNewDevice}>
          <Grid container spacing={8} className={classes.content}>
            <Grid item xs={4}>
              <img
                src={
                  platform === enums.PLATFORM.IOS
                    ? IPHONE_IMAGE_URI
                    : ANDROID_IMAGE_URI
                }
                className={classes.phoneImage}
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl className={classes.formControl} fullWidth>
                <InputLabel htmlFor="device-name">Device name</InputLabel>
                <Input
                  placeholder="Ex: IPhone X 64GB"
                  onChange={this._search}
                  fullWidth
                  inputProps={{
                    name: "deviceName",
                    id: "device-name"
                  }}
                  required
                />
              </FormControl>
              <FormControl className={classes.formControl} fullWidth>
                <InputLabel htmlFor="device-platform">Platform</InputLabel>
                <Select
                  value={platform}
                  onChange={this._changePlatform}
                  fullWidth
                  inputProps={{
                    name: "devicePlatform",
                    id: "device-platform"
                  }}
                >
                  <MenuItem value={enums.PLATFORM.IOS}>iOS</MenuItem>
                  <MenuItem value={enums.PLATFORM.ANDROID}>Android</MenuItem>
                </Select>
              </FormControl>
              <FormControl className={classes.formControl} fullWidth>
                <InputLabel htmlFor="platform-version">
                  Platform version
                </InputLabel>
                <Input
                  placeholder="Ex: 4.4.2"
                  onChange={this._search}
                  fullWidth
                  inputProps={{
                    name: "platformVersion",
                    id: "platform-version"
                  }}
                  required
                />
              </FormControl>
            </Grid>
            <Grid item xs={4} className={classes.column}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                type="submit"
              >
                ADD NEW DEVICE
              </Button>
              <Button
                variant="contained"
                color="default"
                className={classes.button}
                type="reset"
              >
                RESET
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

AddDevice.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(
  connect(
    () => ({}),
    dispatch => ({
      addDevice: device => dispatch(addDevice(device))
    })
  )(AddDevice)
);
