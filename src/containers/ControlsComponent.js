import React, { useState } from 'react';
import { connect } from 'react-redux';
import { ButtonGroup, Button } from 'react-bootstrap';
import { PlayArrow, Pause, Autorenew } from '@material-ui/icons';


import { resetClock } from '../store';


const ControlsComponent = (props) => {
  // console.log({ ...props });
  const {
    resetClockHandler, play, pause, reset,
  } = { ...props };
  const [pauseColor, setPauseColor] = useState('disabled');
  const [playColor, setPlayColor] = useState('disabled');
  const [resetColor, setResetColor] = useState('disabled');

  const playHandler = () => {
    play(); // interval
  };

  const pauseHandler = () => {
    pause(); // interval
  };

  const resetHandler = () => {
    resetClockHandler(); // store
    reset(true); // interval
  };

  const mouseHandler = (evt) => {
    evt.persist();
    const color = evt.type === 'mouseenter' ? 'action' : 'disabled';

    if (/btn-pause/.test(evt.target.className)) setPauseColor(color);
    else if (/btn-play/.test(evt.target.className)) setPlayColor(color);
    else if (/btn-reset/.test(evt.target.className)) setResetColor(color);
  };

  return (
    <ButtonGroup size="sm" className="d-flex justify-content-center mb-2">
      <Button onClick={pauseHandler} variant="link" onMouseEnter={mouseHandler} onMouseLeave={mouseHandler} className="btn-pause">
        <Pause color={pauseColor} aria-label="pause" />
      </Button>
      <Button onClick={playHandler} variant="link" onMouseEnter={mouseHandler} onMouseLeave={mouseHandler} className="btn-play">
        <PlayArrow color={playColor} aria-label="play" />
      </Button>
      <Button onClick={resetHandler} variant="link" onMouseEnter={mouseHandler} onMouseLeave={mouseHandler} className="btn-reset">
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
