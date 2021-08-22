import { Component } from "react";
import { Link, Redirect } from "react-router-dom";

class ErrorBoundary extends Component {
  state = { hasError: false, redirect: false };

  // detect that an error exists
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  // Set up a way to catch the error
  componentDidCatch(error, info) {
    /* log this to an error monitoring service: Sentry, Azure Monitor, New Relic, TrackJS */
    console.error("ErrorBoundary caught an error: ", error, info);
    setTimeout(this.setState({ redirect: true }), 5000);
  }

  //   doesn't work because ComponentDidUpdate won't run on the first render.
  //   componentDidUpdate(){
  //       this.timedRedirect(this.setState((prev) => {return {...prev, redirect: true}}))
  //       console.log('update')
  //   }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    } else if (this.state.hasError) {
      return (
        <h2>
          This listing has an error. <Link to="/">Click here</Link> to go back
          to the home page or wait five seconds.
        </h2>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
