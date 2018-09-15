import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import * as enums from "../core/constants";

const styles = theme => ({
  timestamp: {
    color: "green"
  },
  log: {
    color: "white"
  },
  error: {
    color: "red"
  },
  warning: {
    color: "orange"
  },
  root: {
    fontSize: 12
  }
});

function Log(props) {
  const { classes, log } = props;
  const logStyle =
    log.type === enums.LOG_TYPES.LOG
      ? classes.log
      : log.type === enums.LOG_TYPES.ERROR
        ? classes.error
        : classes.warning;

  return (
    <p className={classes.root}>
      <b className={classes.timestamp}>{log.timestamp}</b>&nbsp; 
      <span className={logStyle}>{log.log}</span>
    </p>
  );
}

Log.propTypes = {
  classes: PropTypes.object.isRequired,
  log: PropTypes.object.isRequired
};

export default withStyles(styles)(Log);
