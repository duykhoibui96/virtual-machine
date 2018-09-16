import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import Log from "./log";
import Button from "@material-ui/core/Button";
import SaveIcon from "@material-ui/icons/Save";
import DeleteIcon from "@material-ui/icons/Delete";
import classNames from "classnames";
import { clearLog } from "../core/actions/log";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  console: {
    padding: theme.spacing.unit,
    boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.5)",
    overflowY: "scroll",
    backgroundColor: "black",
    height: 600
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "flex-end"
  },
  button: {
    margin: theme.spacing.unit,
    fontWeight: "bold"
  },
  icon: {
    marginRight: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  }
});

class Console extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.logs.length > prevProps.logs.length) {
      const { console: consoleScreen } = this;
      const scrollHeight = consoleScreen.scrollHeight;
      const height = consoleScreen.clientHeight;
      const maxScrollTop = scrollHeight - height;
      consoleScreen.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
  }
  render() {
    const { classes, logs, clearLog } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.buttonGroup}>
          <Button variant="contained" size="small" className={classes.button}>
            <SaveIcon className={classNames(classes.icon, classes.iconSmall)} />
            Save
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={clearLog}
          >
            <DeleteIcon className={classes.icon} />
            Clear
          </Button>
        </div>
        <div className={classes.console} ref={ref => (this.console = ref)}>
          {logs.map((log, index) => (
            <Log key={"log-" + index} log={log} />
          ))}
        </div>
      </div>
    );
  }
}

Console.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(
  connect(
    ({ log }) => ({
      logs: log
    }),
    dispatch => ({
      clearLog: () => dispatch(clearLog())
    })
  )(Console)
);
