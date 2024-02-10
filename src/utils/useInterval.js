import {
  useState, useEffect, useRef, useCallback,
} from 'react';
import UIfx from 'uifx';
import soundfx from '../assets/reso_cowbell_single_shot_waw.mp3';

const INTERVAL_STATUS = {
  play: 'play',
  pause: 'pause',
  looping: 'looping',
  reset: 'reset',
  change: 'change',
};

const newSoundFx = new UIfx(soundfx);

export default (delay, sessionLength, breakLength) => {
  const [count, setCount] = useState(sessionLength);
  const [intervalStatus, setIntervalStatus] = useState(INTERVAL_STATUS.reset);
  const [isSession, setIsSession] = useState(true);
  const intervalRef = useRef(null);

  const pause = useCallback(
    () => {
      if (intervalRef.current === null) return;

      clearInterval(intervalRef.current);
      intervalRef.current = null;
      setIntervalStatus(INTERVAL_STATUS.pause);
    },
    [],
  );

  const play = useCallback(
    () => {
      if (intervalRef.current !== null) return;

      setIntervalStatus(INTERVAL_STATUS.play);
      let c = count;
      intervalRef.current = setInterval(() => {
        c -= 1;
        setCount(c);

        if (c === 0) {
          pause();
          newSoundFx.play();
          setCount(isSession ? breakLength : sessionLength);
          setIsSession(!isSession);
          setIntervalStatus(INTERVAL_STATUS.looping);
        }
      }, delay);
    },
    [delay, sessionLength, breakLength, pause, isSession, count],
  );

  const change = () => {
    pause();
    setIsSession(true);
    setIntervalStatus(INTERVAL_STATUS.change);
  };

  const reset = () => {
    pause();
    setIsSession(true);
    setIntervalStatus(INTERVAL_STATUS.reset);
  };

  useEffect(() => {
    if (intervalStatus === INTERVAL_STATUS.reset
      || intervalStatus === INTERVAL_STATUS.change) {
      setCount(sessionLength);
    } else if (intervalStatus === INTERVAL_STATUS.looping) {
      play(); // looping
    }
  }, [intervalStatus, sessionLength]);

  return {
    count, play, pause, reset, isSession, change,
  };
};
