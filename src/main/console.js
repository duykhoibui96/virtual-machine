import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import Log from "./log"

const styles = theme => ({
  root: {
    flexGrow: 1,
    padding: theme.spacing.unit,
    boxShadow: "0px 0px 2px 0px rgba(0,0,0,0.5)",
    overflowY: "scroll",
    backgroundColor: "black",
    height: 700
  }
});

function Console(props) {
    const { classes, logs } = props;
    return (
      <div className={classes.root}>
        {logs.map((log, index) => <Log key={'log-' + index} log={log} />)}
      </div>
    );
}

Console.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(
  connect(({ log }) => ({
    logs: log
  }))(Console)
);
