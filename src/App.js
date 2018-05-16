import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
  root: {
    width: "90%",
    marginTop: "10%",
    marginLeft: "auto",
    marginRight: "auto",
    body: 0,
    padding: 0,
    flexGrow: 1,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class App extends Component {

  state = {
    from: 0,
    to: 0,
    open: false,
    message: "",
    result: ""
  };



 handleClose = (event, reason) => {
   if (reason === 'clickaway') {
     return;
   }

   this.setState({ open: false });
 };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleClick = event => {
    if(this.state.from === 0 && this.state.to === 0){
      this.setState({ message: "From and to cannot be 0.", open: true });
    }else if(this.state.from > this.state.to){
      this.setState({ message: "From value is cannot greater than to value", open: true });
    }else if(this.state.to > 10000){
      this.setState({ message: "Max value of To is 10000", open: true });
    }else{
      this.printPrima();
    }

  }

  printPrima = () => {
    let start = this.state.from;
    let to = this.state.to;
    var result = "";
    for(var i=start; i<=to; i++){
      if(this.checkPrima(i)){
        result += i;
        result += ", ";
      }
    }

    this.setState({ result });

  }

  checkPrima = number => {
       if(number === 1){
           return true;
       }
       var i = 2;
       while(i < number){
           if(number % i === 0){
               return false;
           }
           i++;
       }
       return true;
   }


  render() {
    const { classes } = this.props;
    return (
     <div className={classes.root}>
       <Grid container spacing={24}>
         <Grid item xs={12} sm={6}>
           <Paper className={classes.paper}>
           <TextField
             type="number"
             id="from"
             label="From"
             name="from"
             className={classes.textField}
             value={this.state.from}
             onChange={ this.handleChange }
             margin="normal"
           />
           </Paper>
         </Grid>
         <Grid item xs={12} sm={6}>
           <Paper className={classes.paper}>
           <TextField
              type="number"
              id="to"
              label="To"
              className={classes.textField}
              value={ this.state.to }
              name="to"
              onChange={ this.handleChange }
              margin="normal"
            />
           </Paper>
         </Grid>
         <Grid item xs={12}>
           <Paper className={classes.paper}>
            <Button variant="outlined" className={classes.button} onClick={ this.handleClick }>
              Get Prima Number
            </Button>
            <Typography variant="body1" gutterBottom align="center">
              {this.state.result }
            </Typography>
           </Paper>
         </Grid>

       </Grid>

       <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={this.state.open}
        autoHideDuration={6000}
        onClose={this.handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{ this.state.message }</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={classes.close}
            onClick={this.handleClose}
          >
            <CloseIcon />
          </IconButton>,
        ]}
      />
     </div>
    );
    }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
