import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListIcon from "@material-ui/icons/ArtTrack";
import AddIcon from "@material-ui/icons/Add";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import AddDevice from "./add-device";
import Devices from "./devices";
import logo from "../logo.svg";
import * as enums from "../core/constants";
import { connect } from "react-redux";
import { loadDevices } from "./actions";

const drawerWidth = '100%';

const styles = theme => ({
  appBar: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    backgroundColor: 'black',
    color: 'white'
  },
  logo: {
    width: 50,
    height: 50
  },
  content: {
    padding: theme.spacing.unit * 3
  }
});

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      view: enums.VIEW.DEVICES
    };

    this._switchToDeviceList = this._switchToDeviceList.bind(this)
    this._switchToAddDevice = this._switchToAddDevice.bind(this)
  }

  componentDidMount() {
    this.props.loadDevices()
  }

  _switchToDeviceList() {
    this.setState({ view: enums.VIEW.DEVICES })
  }

  _switchToAddDevice() {
    this.setState({ view: enums.VIEW.ADD_DEVICE })
  }

  render() {
    const { classes } = this.props;
    const { view } = this.state;
    return (
      <div className={classes.root}>
        <AppBar position="static" color="default" className={classes.appBar}>
          <Toolbar>
            <img src={logo} className={classes.logo} />
            <Typography variant="headline" color="inherit">
              DEVICE LAB MANAGEMENT
          </Typography>
          </Toolbar>
        </AppBar>
        <main className={classes.content}>
          <Devices />
        </main>
      </div>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(connect(
  () => ({}),
  dispatch => ({
    loadDevices: () => dispatch(loadDevices())
  }))(Main)
);
