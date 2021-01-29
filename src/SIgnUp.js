import React, { useState, useRef } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button, InputGroup } from "react-bootstrap";
import OTP from "./OTP";
import "./Auth.css";
import firebase from "./firebase";

function SignUp(props) {
  const [state, setState] = useState({
    mobile: "",
    otp: {},
    name: "",
    email: "",
  });
  const [show, setShow] = useState({
    mobileVerifed: false,
    optConfirmed: false,
    showOtp: false,
  });

  const onChangeOtp = (otp) => {
    setState({ ...state, otp });
  };
  const onSubmitOtp = (e) => {
    e.preventDefault();
    let otpInput = Object.values(state.otp).join("");
    let optConfirm = window.confirmationResult;
    console.log(otpInput);
    optConfirm
      .confirm(otpInput)
      .then(function (result) {
        let user = result.user;
        setShow({ ...show, otpConfirmed: true });
      })
      .catch(function (error) {
        console.log(error);
        alert("Incorrect OTP");
        setShow({ ...show, otpConfirmed: false });
      });
  };
  const signup = (e) => {
    e.preventDefault();
    fetch("https://rocky-beyond-21056.herokuapp.com/signup",{
        method:"POST",
        body:JSON.stringify(state),
        headers:{
            "content-type":"application/json",
        }

    }).then(r=>r.json()).then(r=>{
        if(r.success){
          props.loggedIn(true);
        }else{
            console.log(r);
        }
    }).catch(er=>{
        console.log(er);
    })
  };
  const setUpRecaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "recaptcha-container",
      {
        size: "invisible",
        callback: function (response) {
          console.log("Captcha Resolved");
          onSignInSubmit();
        },
        defaultCountry: "IN",
      }
    );
  };
  const onSignInSubmit = (e) => {
    e.preventDefault();
    setUpRecaptcha();
    let phoneNumber = "+91" + state.mobile;
    console.log(phoneNumber);
    let appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then(function (confirmationResult) {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        // console.log(confirmationResult);
        console.log("OTP is sent");
        setShow({ ...show, showOtp: true });
      })
      .catch(function (error) {
        console.log(error);
        setShow({ ...show, showOtp: false });
      });
  };

  const verifyMobile = (mobile) => {
    var phoneno = /^\d{10}$/;
    if (mobile.match(phoneno)) {
      setShow({ ...show, mobileVerifed: true });
    }
    else{
        setShow({ ...show, mobileVerifed: false });

    }
  };

  return (
    <div>
      <Container fluid="sm" className="mt-3">
        <Row className="justify-content-center">
          <Col xs={12} md={6} lg={5}>
            <h2 className="mb-3">SignUp</h2>
            <Form className="form" onSubmit={onSignInSubmit}>
              <div id="recaptcha-container"></div>

              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroup-sizing-sm">
                    +91
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="number"
                  name="mobile"
                //   autoComplete="@name"
                  value={state["mobile"]}
                  disabled={show.showOtp}
                  placeholder="Mobile Number"
                  onChange={(event) => {
                    setState({
                      ...state,
                      [event.target.name]: event.target.value,
                    });
                    verifyMobile(event.target.value);
                  }}
                  required
                />
              </InputGroup>
              <Button
                variant="primary"
                button="Submit"
                disabled={!show.mobileVerifed}
                type="submit"
              >
                Send Otp
              </Button>
            </Form>
          </Col>
        </Row>
        {show.showOtp && (
          <>
            <OTP onChangeOtp={onChangeOtp} onSubmitOtp={onSubmitOtp} />
            {show.otpConfirmed && (
              <Row className="justify-content-center">
              <Col xs={12} md={6} lg={5}>

                <Form className="form2" onSubmit={signup}>
                <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroup-sizing-sm">
                    Name
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                   type="text"
                   name="name"
                   autoComplete="@name"
                   value={state.name}
                   placeholder="Your Name"
                   onChange={(event) => {
                     setState({
                       ...state,
                       [event.target.name]: event.target.value,
                     });
                   }}
                   required
                />
              </InputGroup>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="inputGroup-sizing-sm">
                  email@
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                      type="email"
                      name="email"
                      autoComplete="@email"
                      value={state.email}
                      placeholder="Mobile Number"
                      onChange={(event) => {
                        setState({
                          ...state,
                          [event.target.name]: event.target.value,
                        });
                      }}
                      required
                    />
              </InputGroup>
                
                
                  <Button
                    variant="primary"
                    button="Submit"
                    disabled={!show.mobileVerifed}
                    type="submit"
                    
                  >
                    Signup
                  </Button>
                </Form>
                </Col>
              </Row>
            )}
          </>
        )}
      </Container>
    </div>
  );
}

export default SignUp;
