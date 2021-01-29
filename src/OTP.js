import React,{useState,useRef,useEffect,createRef} from 'react'
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import  Button  from 'react-bootstrap/Button';
function OTP(props) {
    const [otp, setOtp] = useState({1:"",2:"",3:"",4:"",5:"",6:""});
    const [refFocus, setRefFocus] = useState([]);
    useEffect(() => {
        setRefFocus(elRefs => (
          Array(6).fill().map((_, i) => elRefs[i] || createRef())
        ));
      }, []);
    const onChangeHandler = (event) =>{
      console.log(event);
        let tempOtp = otp;
        
        const num = Number(event.target.name);
        if(event.keyCode===8){
          tempOtp[num] = "";
          setOtp({...tempOtp});
          if(num>1){
            // console.log(num,refFocus[num]);
            // console.log(refFocus);
            refFocus[num-2].current && refFocus[num-2].current.focus();
          }

        }else{
          const o = event.key;
        // console.log(event);
        if(Number.isNaN(Number(o))){
          return;
        }
        console.log({o});
        tempOtp[num] = o;
        
       
        if(num<6){

          refFocus[num].current && refFocus[num].current.focus();
        }

        }
        
        props.onChangeOtp(otp)
    }
    useEffect(()=>{
      refFocus[0] && refFocus[0].current && refFocus[0].current.focus();
    },[refFocus])
    
    return (
        <div>
            <Row className="justify-content-center">
            <Col xs={12} md={6} lg={5}>
              <h2 className="mb-3">Enter OTP</h2>
              <Form className="form" onSubmit={props.onSubmitOtp}>
              <Form.Group id="formgroup" >
                  {[...refFocus.keys()].map((i,idx)=>{
                      return (
                        <Form.Control key={idx}
                        className="otp"
                          id={`otp${idx+1}`}
                          type="number"
                          value={otp[idx+1]}
                          ref ={refFocus[i]}
                          name={idx+1}
                          placeholder={"  OTP".charAt(idx)}
                          onKeyDown={onChangeHandler}
                        />
                       
                      )
                  })}
                   </Form.Group>
                
                <Button variant="primary" button="Submit" type="submit" onClick={props.onSubmitOtp}> Continue </Button>
              </Form>
            </Col>
          </Row>
        </div>
    )
}

export default OTP
