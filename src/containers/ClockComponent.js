import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import useInterval from '../utils/useInterval';
import theme from '../theme';

import ControlsComponent from './ControlsComponent';
import SessionComponent from './SessionComponent';
import BreakComponent from './BreakComponent';
import TimeComponent from '../components/TimeComponent';
import './ClockComponent.scss';

const ClockComponent = (props) => {
  const { breakLength, sessionLength } = { ...props };
  const {
    count, play, pause, reset, isSession, change,
  } = useInterval(1000, sessionLength, breakLength);

  return (
    <Container className="clock-container" style={{ width: '350px' }}>
      <Col className="my-4 pt-4 pb-2 rounded-lg border border-secondary" style={{ backgroundColor: theme.componentBg }}>
        <Row className="justify-content-center">
          <BreakComponent change={change} isSession={isSession} />
          <SessionComponent change={change} isSession={isSession} />
        </Row>
        <TimeComponent count={count} isSession={isSession} />
        <ControlsComponent play={play} pause={pause} reset={reset} />
      </Col>
    </Container>

  );
};

const mapStateToProps = (state) => (state);

export default connect(mapStateToProps)(ClockComponent);
