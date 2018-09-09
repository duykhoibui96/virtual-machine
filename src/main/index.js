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

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: "100%",
    zIndex: 1,
    overflow: "hidden",
    position: "relative",
    display: "flex"
  },
  logo: {
    width: 50,
    height: 50
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "black"
  },
  drawerPaper: {
    position: "relative",
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0 // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar
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
        <AppBar position="absolute" className={classes.appBar}>
          <Toolbar>
            <img src={logo} className={classes.logo} alt="logo" />
            <Typography variant="title" color="inherit" noWrap>
              VIRTUAL DEVICE LAB
            </Typography>
            {/* <IconButton aria-haspopup="true" color="inherit">
              <AccountCircle />
            </IconButton> */}
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.toolbar} />
          <List>
            <ListItem button onClick={this._switchToDeviceList}>
              <ListItemIcon>
                <ListIcon />
              </ListItemIcon>
              <ListItemText inset primary="DEVICES" />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button onClick={this._switchToAddDevice}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText inset primary="ADD DEVICE" />
            </ListItem>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {view === enums.VIEW.DEVICES ? <Devices /> : <AddDevice />}
        </main>
      </div>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Main);
