import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ButtonGroup, Button } from 'react-bootstrap';
import { PlayArrow, Pause, Autorenew } from '@material-ui/icons';
import { resetClock } from '../store';
import theme from '../theme';

const ControlsComponent = (props) => {
  const {
    resetClockHandler, play, pause, reset,
  } = { ...props };
  const [pauseColor, setPauseColor] = useState(theme.controls.off);
  const [playColor, setPlayColor] = useState(theme.controls.off);
  const [resetColor, setResetColor] = useState(theme.controls.off);

  const playHandler = () => {
    play(); // interval
  };

  const pauseHandler = () => {
    pause(); // interval
  };

  const resetHandler = () => {
    resetClockHandler(); // store
    reset(); // interval
  };

  const mouseHandler = (evt) => {
    evt.persist();
    const color = evt.type === 'mouseenter' ? theme.controls.on : theme.controls.off;

    if (/btn-pause/.test(evt.target.className)) setPauseColor(color);
    else if (/btn-play/.test(evt.target.className)) setPlayColor(color);
    else if (/btn-reset/.test(evt.target.className)) setResetColor(color);
  };

  return (
    <ButtonGroup size="sm" className="d-flex justify-content-center mb-2">
      <Button onClick={pauseHandler} variant="link" onMouseEnter={mouseHandler} onMouseLeave={mouseHandler} className="btn-pause" id="stop">
        <Pause color={pauseColor} aria-label="pause" />
      </Button>
      <Button onClick={playHandler} variant="link" onMouseEnter={mouseHandler} onMouseLeave={mouseHandler} className="btn-play" id="start">
        <PlayArrow color={playColor} aria-label="play" />
      </Button>
      <Button onClick={resetHandler} variant="link" onMouseEnter={mouseHandler} onMouseLeave={mouseHandler} className="btn-reset" id="reset">
        <Autorenew color={resetColor} aria-label="reset" />
      </Button>
    </ButtonGroup>
  );
};

const mapStateToProps = (state) => ({
  sessionLength: state.sessionLength,
});

const mapDispatchToProps = (dispatch) => ({
  resetClockHandler: () => (dispatch(resetClock())),
});

export default connect(mapStateToProps, mapDispatchToProps)(ControlsComponent);
