import axios from 'axios';
import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";

const Main = styled.main`
  margin-top: 90px;
  display: block;
`;

const Section = styled.section`
  scroll-margin-top: 70px;
  padding: 40px 0;
  overflow: hidden;
`;

const Container = styled.div`
  width: 100%;
  margin-right: auto;
  margin-left: auto;
`;

const Div = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const TitleDiv = styled.div`
  text-align: center!important;
  flex: 0 0 auto;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 50px;
  color: var(--color-black);
`;

const FormDiv = styled.div`
  box-shadow: 0 0 30px rgba(var(--color-black-rgb), 0.1);
  padding: 30px;
  background: white;
  width: 40%;
  margin-bottom: 3rem;
`;

const InputDiv = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const Input = styled.input`
  display: block;
  width: 100%;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  appearance: none;
  padding: 10px 14px;
  border-radius: 0;
  box-shadow: none;
  font-size: 15px;
`;

const MsgDiv = styled.div`
  margin-top: 1rem!important;
  margin-bottom: 1rem!important;
`;

const Message = styled.p`
  color: red;

  &.ok {
    color: #3065ba;
  }
`;

const ButtonDiv = styled.div`
  display: flex;
  width: 100%;
  margin-top: 1rem;
  justify-content: center;
`;

const Button = styled.button`
  background: #212529;
  border: 0.1rem solid transparent;
  padding: 10px 15px;
  color: #fff;
  cursor: pointer;
  border-radius: 0.3rem;
  margin-right: 1rem;
  
  &:hover {
    border: 0.1rem solid black;
    background-color: white;
    color: black;
    transition: color 0.3;
  }

  &.check {
    margin: 0.7rem 1rem;
    padding: 8px 10px;
  }
`;

const InputP = styled.p`
  color: #8f8d8d;
  padding: 0.5rem 0;
  font-size: 0.9rem;
  margin-left: 1rem;
`;

const Register = () => {
  const inputRef = useRef([]);
  const errorMsg = ['', 'Email??? ??????????????????', 'Email ????????? ????????????', 'username??? ??????????????????', '????????? ???????????????',
    'username ?????? ????????? ????????????', '????????? username?????????',
    '??????????????? ??????????????????', '????????? ???????????????', '??????????????? ???????????? ????????????', '?????? ???????????? ?????? ???????????????'];
  const invalidUsername = /[^a-z0-9]/g;
  const invalidPassword = /[+???-??????-???]/g;
  const regEmail = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;
  const [inputs, setInputs] = useState({
    email: "",
    username: "",
    password: "",
    repeatPassword: ""
  })
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState();
  /* 
    0: ?????? ??????.
    1: empty email.
    2: invalid email.
    3: empty username.
    4: invalid username.
    5: need to check username.
    6: username already exists.
    7: empty password.
    8: invalid username.
    9: incorrect repeat password.
  */

  const handleInputs = (e) => {
    const {name, value} = e.target;
    console.log(name, value);
    
    // ??????????????? username??? ???????????? ??? 
    if (name === 'username' && (isChecked === true || error === 6)) {
      setIsChecked(false);
      setError(5);
    }

    setInputs({
      ...inputs,
      [name]: value
    })
  }

  // username ?????? ??????
  const handleCheck = async () => {
    // username ????????? ??????
    if (inputs.username === "") {
      setError(3);
      inputRef.current[1].focus();
    } else if (invalidUsername.test(inputs.username) || inputs.username.length > 12 || inputs.username.length < 6) {
      setError(4);
      inputRef.current[1].focus();
    } else {
      // ???????????? ?????? ??????
      const url = "http://localhost:4000/account/checkusername";
      const payload = { username: inputs.username };
      await axios.post(url, payload)
      .then((res) => {
        console.log(res);
        // ?????? ???????????? isChecked ??????
        if (res.status === 200) {
          setIsChecked(true);
          setError();
        }
      })
      .catch((e) => {
        // ????????? username?????? error ??????
        setError(6);
      })
    }
  }

  const handleSubmit = async () => {
    console.log("clicked");

    // ????????? ??????
    if (inputs.email === "") {
      setError(1);
      inputRef.current[0].focus();
    } else if (!regEmail.test(inputs.email)) {
      setError(2);
      inputRef.current[0].focus();
    } else if (inputs.username === "") {
      setError(3);
      inputRef.current[1].focus();
    } else if (invalidUsername.test(inputs.username) || inputs.username.length > 12 || inputs.username.length < 6) {
      setError(4);
      inputRef.current[1].focus();
    } else if (isChecked === false) {
      setError(5);
    } else if (inputs.password === "") {
      setError(7);
      inputRef.current[2].focus();
    } else if (invalidPassword.test(inputs.password) || inputs.password.length < 8) {
      setError(8);
      inputRef.current[2].focus();
    } else if (inputs.password !== inputs.repeatPassword) {
      console.log(inputs.password, inputs.repeatPassword);
      setError(9);
      inputRef.current[3].focus();
    } else {
      console.log('??? ?????? ??????');
      
      // ???????????? ?????? ??????
      const url = "http://localhost:4000/account/register";
      const payload = {
        email: inputs.email,
        username: inputs.username,
        password: inputs.password
      }
      await axios.post(url, payload)
      .then((res) => {
        // ???????????? ??????
        if (res.status === 201) {
          setError(0);
        }
      })
      .catch((e) => {
        // ?????? ???????????? ????????? ?????? error ??????
        setError(10);
      })
      
    }
  }

  return (
    <Main>
      <Section>
        <Container>
          {error === 0 ?
            (<Div>
              <TitleDiv>
                <Title>???????????? ??????</Title>
              </TitleDiv>
              <Link to="/login">
                <Button type="button">??????????????? ??????</Button>
              </Link>
            </Div>) 
            : (<><Div>
                <TitleDiv>
                  <Title>????????????</Title>
                </TitleDiv>
              </Div>
              <Div>
                <FormDiv>
                  <InputDiv>
                    <h3>Email</h3>
                  </InputDiv>
                  <Input type="email" name="email" placeholder='???????????? ??????????????????'
                    onChange={handleInputs} ref={el => (inputRef.current[0] = el)}/>
                  {error === 1 ? (<MsgDiv><Message>{errorMsg[1]}</Message></MsgDiv>) : (
                    error === 2 ? (<MsgDiv><Message>{errorMsg[2]}</Message></MsgDiv>) : null
                  )}
                  <InputDiv>
                    <h3>Username</h3>
                    <InputP>???????????? 6-12?????? ??????, ??????</InputP>
                    <Button type="button" className='check' onClick={handleCheck}>?????? ??????</Button>
                  </InputDiv>
                  <Input type="text" name="username" placeholder='username??? ??????????????????'
                    onChange={handleInputs} ref={el => (inputRef.current[1] = el)}/>
                  {error === 3 ? (<MsgDiv><Message>{errorMsg[3]}</Message></MsgDiv>) : (
                    error === 4 ? (<MsgDiv><Message>{errorMsg[4]}</Message></MsgDiv>) : (
                      error === 5 ? (<MsgDiv><Message>{errorMsg[5]}</Message></MsgDiv>) : (
                        error === 6 ? (<MsgDiv><Message>{errorMsg[6]}</Message></MsgDiv>) : null
                      )
                    )
                  )}
                  {isChecked === true ? (<MsgDiv><Message className="ok">??????????????? username?????????.</Message></MsgDiv>) : null}
                  <InputDiv>
                    <h3>Password</h3>
                    <InputP>??????????????? 8??? ??????, ??????/??????/?????? ????????????</InputP>
                  </InputDiv>
                  <Input type="password" name="password" placeholder='password??? ??????????????????'
                    onChange={handleInputs} ref={el => (inputRef.current[2] = el)}/>
                  {error === 7 ? (<MsgDiv><Message>{errorMsg[7]}</Message></MsgDiv>) : (
                    error === 8 ? (<MsgDiv><Message>{errorMsg[8]}</Message></MsgDiv>) : null
                  )}
                  <InputDiv>
                    <h3>Repeat Password</h3>
                    <InputP>??????????????? ?????????????????????</InputP>
                  </InputDiv>
                  <Input type="password" name="repeatPassword" placeholder='password??? ??????????????????'
                    onChange={handleInputs} ref={el => (inputRef.current[3] = el)}/>
                  {error === 9 ? (<MsgDiv><Message>{errorMsg[9]}</Message></MsgDiv>) : (
                    error === 10 ? (<MsgDiv><Message>{errorMsg[10]}</Message></MsgDiv>) : null
                  )}
                  <ButtonDiv>
                    <Button type="button" onClick={handleSubmit}>????????????</Button>
                  </ButtonDiv>
                </FormDiv>
                </Div>
              </>)}
        </Container>
      </Section>
    </Main>
  );
}

export default Register;