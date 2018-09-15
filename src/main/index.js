import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";
import Devices from "./devices";
import logo from "../logo.svg";
import Console from "./console";

const styles = theme => ({
  root: {
    flexGrow: 1,
    height: "100%",
    zIndex: 1,
    overflow: "hidden",
    position: "relative"
  },
  logo: {
    width: 50,
    height: 50
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: "black"
  },
  contentContainer: {
    marginTop: theme.spacing.unit * 8,
    padding: theme.spacing.unit * 2
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    minWidth: 0, // So the Typography noWrap works,
    display: "flex"
  },
  group: {
    flexGrow: 1,
    padding: 10
  },
  title: {
    marginBottom: theme.spacing.unit,
    fontWeight: "bold",
    padding: theme.spacing.unit
  },
  control: {
    display: "flex",
    justifyContent: "flex-end"
  },
  toggleButton: {
    padding: theme.spacing.unit,
    minHeight: 0
  }
});

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      appiumProxyOn: false,
      selectedDeviceUDID: null
    };

    this._toggleAppiumProxy = this._toggleAppiumProxy.bind(this);
  }

  _toggleAppiumProxy() {
    this.setState({ appiumProxyOn: !this.state.appiumProxyOn });
  }

  render() {
    const { classes } = this.props;
    const { selectedDeviceUDID } = this.state;
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
        <main className={classes.contentContainer}>
          {/* <div className={classes.control}>
            <Typography variant="title" className={classes.title}>
              APPIUM PROXY
            </Typography>
            <Switch
              checked={this.state.appiumProxyOn}
              onChange={this._toggleAppiumProxy}
              value="checkedA"
            />
          </div> */}
          <div className={classes.content}>
            <div className={classes.group}>
              <Typography variant="title" className={classes.title}>
                DEVICES
              </Typography>
              <Devices />
            </div>
            <div className={classes.group} style={{ display: "flex" }}>
              <Console />
            </div>
          </div>
        </main>
      </div>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Main);
