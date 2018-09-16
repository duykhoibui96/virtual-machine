import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Switch from "@material-ui/core/Switch";
import Devices from "./devices";
import logo from "../logo.svg";
import Console from "./console";
import { loadDevices } from "../core/actions/device";
import { connect } from "react-redux";

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
    backgroundColor: "black",
    color: 'white',
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  contentContainer: {
    padding: theme.spacing.unit * 2
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    minWidth: 0, // So the Typography noWrap works,
  },
  group: {
    flexGrow: 1,
    padding: 10,
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

  componentDidMount() {
    this.props.loadDevices()
  }

  _toggleAppiumProxy() {
    this.setState({ appiumProxyOn: !this.state.appiumProxyOn });
  }

  render() {
    const { classes } = this.props;
    const { selectedDeviceUDID } = this.state;
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
          <Grid container className={classes.content}>
            <Grid item xs={6} className={classes.group}>
              <Typography variant="title" className={classes.title}>
                DEVICES
              </Typography>
              <Devices />
            </Grid>
            <Grid item xs={6} className={classes.group} style={{ display: "flex" }}>
              <Console />
            </Grid>
          </Grid>
        </main>
      </div>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(
  connect(
    () => ({}),
    dispatch => ({
      loadDevices: () => dispatch(loadDevices())
    })
  )(Main)
);
