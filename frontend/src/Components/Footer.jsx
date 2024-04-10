import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
     <footer className="footer" style={{ marginTop: '30px' }}>
      <Container>
        <Row>
          <Col>
            <p className="mb-0">Hello, I'm the footer</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;