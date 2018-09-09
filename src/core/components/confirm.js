import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import withMobileDialog from "@material-ui/core/withMobileDialog";

const styles = theme => ({});

class ConfirmDialog extends React.Component {
  constructor(props) {
    super(props);

    this._handleCloseWithAgree = this._handleCloseWithAgree.bind(this);
    this._handleCloseWithDisagree = this._handleCloseWithDisagree.bind(this);
  }

  _handleCloseWithAgree() {
    this.props.handleCloseWithAgree();
  }

  _handleCloseWithDisagree() {
    this.props.handleCloseWithDisagree();
  }

  render() {
    const { open, mainText, extraText } = this.props;
    return (
      <div>
        <Dialog
          open={open}
          onClose={this._handleCloseWithDisagree}
          aria-labelledby="confirm-dialog"
        >
          <DialogTitle id="confirm-dialog">{mainText}</DialogTitle>
          <DialogContent>
            <DialogContentText>{extraText}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={this._handleCloseWithDisagree} color="primary">
              Disagree
            </Button>
            <Button
              onClick={this._handleCloseWithAgree}
              color="primary"
              autoFocus
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ConfirmDialog.propTypes = {
  classes: PropTypes.object.isRequired,
  mainText: PropTypes.string.isRequired,
  extraText: PropTypes.string,
  open: PropTypes.bool.isRequired,
  handleCloseWithAgree: PropTypes.func.isRequired,
  handleCloseWithDisagree: PropTypes.func.isRequired
};

export default withMobileDialog()(withStyles(styles)(ConfirmDialog));
