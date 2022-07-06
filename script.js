import accurateInterval from "https://cdn.skypack.dev/accurate-interval@1.0.9";


class ClockSelector extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { id: this.props.name }, /*#__PURE__*/
      React.createElement("div", { id: this.props.name + "-label" }, this.props.name.charAt(0).toUpperCase() + this.props.name.slice(1), " Length"), /*#__PURE__*/
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("button", {
        id: this.props.name + "-decrement",
        onClick: this.props.click,
        value: this.props.name + "-decrement" }, /*#__PURE__*/

      React.createElement("i", { className: "fa-solid fa-arrow-down fa-3x" })), /*#__PURE__*/

      React.createElement("button", {
        id: this.props.name + "-increment",
        onClick: this.props.click,
        value: this.props.name + "-increment" }, /*#__PURE__*/

      React.createElement("i", { className: "fa-solid fa-arrow-up fa-3x" }))), /*#__PURE__*/


      React.createElement("div", { id: this.props.name + "-length" }, this.props.value)));


  }}


class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      break: 5,
      session: 25,
      stopped: 'stopped',
      displayLabel: 'Session',
      displayTime: 25 * 60,
      intervalID: accurateInterval(() => ({}), 1) };

    this.handleIncrementDecrement = this.handleIncrementDecrement.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.countDown = this.countDown.bind(this);
    this.formatTime = this.formatTime.bind(this);
    this.handleReset = this.handleReset.bind(this);
  }

  handleIncrementDecrement(e) {
    if (this.state.stopped === 'stopped') {
      switch (e.target.value) {
        case "break-decrement":
          if (this.state.break > 1 && this.state.displayLabel == "Break") {
            this.setState({ break: this.state.break - 1, displayTime: this.state.break * 60 - 60 });
          } else if (this.state.break > 1) {
            this.setState({ break: this.state.break - 1 });
          }
          break;
        case "break-increment":
          this.setState(state => state.break < 60 && state.displayLabel == "Break" ? { break: state.break + 1, displayTime: state.break * 60 + 60 } : state.break < 60 ? { break: state.break + 1 } : {});
          break;
        case "session-decrement":
          this.setState(state => state.session > 1 && state.displayLabel == "Session" ? { session: state.session - 1, displayTime: state.session * 60 - 60 } : state.session > 1 ? { session: state.session - 1 } : {});
          break;
        case "session-increment":
          this.setState(state => state.session < 60 && state.displayLabel == "Session" ? { session: state.session + 1, displayTime: state.session * 60 + 60 } : state.session < 60 ? { session: state.session + 1 } : {});
          break;}

    }
  }
  handleStart() {
    if (this.state.stopped === "stopped") {
      this.setState({
        intervalID: accurateInterval(() => {
          this.countDown();
        }, 1000),
        stopped: "running" });

    } else {
      this.setState({ stopped: "stopped" });
      this.state.intervalID.clear();
    }
  }

  countDown() {
    this.setState({ displayTime: this.state.displayTime - 1 });
    if (this.state.displayTime === 0) {
      document.getElementById("beep").play();
    }
    if (this.state.displayTime < 0) {
      this.state.intervalID.clear();
      if (this.state.displayLabel === "Session") {
        this.setState({
          intervalID: accurateInterval(() => {
            this.countDown();
          }, 1000),
          displayTime: this.state.break * 60, displayLabel: "Break" });

      } else {
        this.setState({
          intervalID: accurateInterval(() => {
            this.countDown();
          }, 1000),
          displayTime: this.state.session * 60, displayLabel: "Session" });

      }
    }
  }

  formatTime() {
    let m = Math.floor(this.state.displayTime / 60);
    let s = this.state.displayTime % 60;
    return ("0" + m).slice(-2) + ":" + ("0" + s).slice(-2);
  }
  handleReset() {
    this.setState({
      break: 5,
      session: 25,
      stopped: "stopped",
      displayLabel: "Session",
      displayTime: 25 * 60,
      intervalID: accurateInterval(() => ({}), 1) });


    this.state.intervalID.clear();

    document.getElementById("beep").pause();
    document.getElementById("beep").currentTime = 0;
  }
  render() {
    return /*#__PURE__*/(
      React.createElement("div", { className: "d-flex flex-column justify-content-center align-items-center h-100 w-100" }, /*#__PURE__*/
      React.createElement("div", { id: "selectors" }, /*#__PURE__*/
      React.createElement(ClockSelector, {
        name: "session",
        value: this.state.session,
        click: this.handleIncrementDecrement }), /*#__PURE__*/

      React.createElement(ClockSelector, {
        name: "break",
        value: this.state.break,
        click: this.handleIncrementDecrement })), /*#__PURE__*/



      React.createElement("div", { id: "timer-label" }, this.state.displayLabel), /*#__PURE__*/
      React.createElement("div", { id: "time-left" }, this.formatTime()), /*#__PURE__*/

      React.createElement("div", { id: "ssr" }, /*#__PURE__*/
      React.createElement("button", { id: "start_stop", className: "btn", onClick: this.handleStart }, "Start/Stop"), /*#__PURE__*/


      React.createElement("button", { id: "reset", className: "btn", onClick: this.handleReset }, "Reset")), /*#__PURE__*/




      React.createElement("audio", {
        id: "beep",
        src: "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav" })));



  }}



ReactDOM.render( /*#__PURE__*/React.createElement(Timer, null), document.getElementById('root'));