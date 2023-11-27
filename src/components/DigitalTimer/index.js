// Write your code here

import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {istimerProgress: false, timeinMin: 25, timeinSeconds: 0}

  incrementTimeElapsedInSeconds = () => {
    const {istimerProgress, timeinMin, timeinSeconds} = this.state
    const isTimerCompleted = timeinMin * 60 === timeinSeconds

    if (isTimerCompleted) {
      this.clearTimerInterval()
      this.setState({istimerProgress: false})
    }
    if (istimerProgress) {
      console.log(1)
      this.setState(prevState => ({
        timeinSeconds: prevState.timeinSeconds + 1,
      }))
    } else {
      this.clearTimerInterval()
    }
  }

  clearTimerInterval = () => {
    clearInterval(this.intervalId)
  }

  onClickPlayorPause = () => {
    const {istimerProgress, timeinMin, timeinSeconds} = this.state

    const isTimerCompleted = timeinMin * 60 === timeinSeconds

    if (isTimerCompleted) {
      this.setState({timeinSeconds: 0})
    }
    if (istimerProgress) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({istimerProgress: !prevState.istimerProgress}))
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timeinMin, timeinSeconds} = this.state
    const totalRemainingSeconds = timeinMin * 60 - timeinSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  onClickReset = () => {
    const {istimerProgress, timeinMin, timeinSeconds} = this.state

    this.setState({istimerProgress: false, timeinMin: 25, timeinSeconds: 0})

    this.clearTimerInterval()
  }

  onClickPlusBtn = () => {
    const {istimerProgress, timeinMin, timeinSeconds} = this.state
    console.log('hi')

    if (istimerProgress === false) {
      this.setState(prevState => ({timeinMin: prevState.timeinMin + 1}))
    }
  }

  onClickMinusBtn = () => {
    const {istimerProgress, timeinMin, timeinSeconds} = this.state

    if (istimerProgress === false) {
      if (parseInt(timeinMin) > 0) {
        this.setState(prevState => ({timeinMin: prevState.timeinMin - 1}))
      }
    }
  }

  render() {
    const {istimerProgress, timeinMin} = this.state

    console.log(timeinMin)

    const startOrPauseText = istimerProgress ? 'Pause' : 'Start'
    const startOrPauseAltText = istimerProgress ? 'pause icon' : 'play icon'

    const startOrPauseimg = istimerProgress
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const timeDisplayText = istimerProgress ? 'Running' : 'Paused'

    return (
      <div className="bgContainer">
        <h1>Digital Timer</h1>
        <div className="timerSection">
          <div className="TimerBg">
            <div className="timerDisplaySection">
              <h1 className="time">{this.getElapsedSecondsInTimeFormat()}</h1>
              <h4 className="action">{timeDisplayText}</h4>
            </div>
          </div>
          <div className="timerDetailsBg">
            <div className="playResetContainer">
              <div className="startContainer">
                <button
                  type="button"
                  className="btn"
                  onClick={this.onClickPlayorPause}
                >
                  <img
                    src={startOrPauseimg}
                    className="icon"
                    alt={startOrPauseAltText}
                  />
                </button>
                <h3>{startOrPauseText}</h3>
              </div>
              <div className="startContainer">
                <button
                  type="button"
                  className="btn"
                  onClick={this.onClickReset}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    className="icon"
                    alt="reset icon"
                  />
                </button>
                <h3>Reset</h3>
              </div>
            </div>
            <p>Set Timer Limit</p>
            <div className="playResetContainer">
              <button
                type="button"
                className="btn"
                onClick={this.onClickMinusBtn}
              >
                <h1>-</h1>
              </button>
              <div className="timerSetterBg">
                <h4>{timeinMin}</h4>
              </div>
              <button
                type="button"
                className="btn"
                onClick={this.onClickPlusBtn}
              >
                <h1>+</h1>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
