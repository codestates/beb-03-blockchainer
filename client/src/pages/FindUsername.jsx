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
`;

const ButtonDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const Button = styled.button`
  background: #212529;
  border: 0;
  padding: 10px 30px;
  color: #fff;
  transition: 0.4s;
  cursor: pointer;
`;

const Ul = styled.ul`
  padding: 20px 0 35px;
  text-align: center;
  list-style: none;
  margin-top: 3rem;
`;

const Li = styled.li`
  display: inline-block;
  position: relative;

  ::after{
    content: "|";
    align-items: center;
    color: grey;
  }

  :last-child::after{
    content: "";
  }
`;

const A = styled.a`
  display: inline-block;
  font-size: 1rem;
  line-height: 17px;
  text-decoration: none;
  color: #888;
  margin: 0 1rem;
`;

const Board = styled.div`
  width: 100%;
  border-radius: 2rem!important;
  border: solid 1px #e6e6e6;
  background-color: white;
  padding: 1rem 2rem;
  margin-top: 2rem;
`;

const FindUsername = () => {
  const emailRef = useRef(null);
  const regEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/;
  const errorMsg = ['', 'Email을 입력해주세요.', 'Email 형식이 아닙니다.', '회원 정보가 존재하지 않습니다.']
  const [inputs, setInputs] = useState({
    email: "",
    username: "test1234",
    createdAt: "2022.04.20"
  });
  const [error, setError] = useState("");

  const handleEmail = (e) => {
    setInputs({
      ...inputs,
      email: e.target.value
    });
  }

  const handleClick = () => {
    if (inputs.email === "") {
      emailRef.current.focus();
      setError(1);
    } else if (!regEmail.test(inputs.email)) {
      emailRef.current.focus();
      setError(2);
    } else {
      // // 백엔드로 요청 전송
      // const url = "http://localhost:4000/account/findusername";
      // const payload = { email: email };
      // axios.post(url, payload)
      // .then((res) => {
      //   // 존재하지 않는 회원일 때
      //   setError(3);

      //   // 아이디 찾기 성공 - username, createdAt 설정
      //   setInputs({
      //     ...inputs,
      //     username: "",
      //     createdAt: ""
      //   })
      //   setError(0);
      // })
      

      setError(0);
    }
  }

  return (
    <Main>
      <Section>
        <Container>
          <Div>
            <TitleDiv>
              <Title>아이디 찾기</Title>
            </TitleDiv>
          </Div>
          <Div>
            <FormDiv>
              <h3>Email</h3>
              <Input type="email" name="email" placeholder="가입한 email을 입력해주세요" onChange={handleEmail} ref={emailRef}/>
              <MsgDiv>
                {error === 1 ? (<Message>{errorMsg[1]}</Message>): (
                  error === 2 ? (<Message>{errorMsg[2]}</Message>) : (
                    error === 3 ? (<Message>{errorMsg[3]}</Message>) : null
                  )
                )}
              </MsgDiv>
              <ButtonDiv>
                <Button type="button" onClick={handleClick}>아이디 찾기</Button>
              </ButtonDiv>
              {error === 0 ?
                (<Board>
                  <h4>회원가입 정보</h4>
                  <p>Email: {inputs.email}</p>
                  <p>Username: {inputs.username}</p>
                  <p>회원가입 날짜: {inputs.createdAt}</p>
                </Board>) : null}
              <Ul>
                <Li>
                  <Link to="/login">
                    <A href="" >로그인</A>
                  </Link>
                </Li>
                <Li>
                  <Link to="/findpassword">
                    <A href="" >비밀번호 찾기</A>
                  </Link>
                </Li>
                <Li>
                  <Link to="/register">
                    <A href="" >회원가입</A>
                  </Link>
                </Li>
              </Ul>
            </FormDiv>
          </Div>
        </Container>
      </Section>;
    </Main>
  );
}

export default FindUsername;