import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'

function Footer() {
  return (
    <footer className=" text-light"
              style={{
                backgroundColor: "  #000",
              }}>
            
        <Container>
            <Row>
                <Col className= "text-center py-3">Copyright &copy; 1HealthHub</Col>
            </Row>
        </Container>
    </footer>
  )
}

export default Footer
