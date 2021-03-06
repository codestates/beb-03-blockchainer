import { useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import styled from 'styled-components';

const LoginInformationContainer = styled.section`
    flex: 1 1 0;
    text-align: left;
    margin: 1rem 1rem 1rem 3rem;
`;

const LoginText = styled.p`
    font-size: 2rem;
`

const Button = styled.button`
  background: #212529;
  border: 0.1rem solid transparent;
  padding: 10px 15px;
  color: #fff;
  cursor: pointer;
  border-radius: 1rem;
  margin: 0.5rem 1rem;
  font-size: 1.5rem;
  height: 4rem;
  &:hover {
    border: 0.1rem solid black;
    background-color: white;
    color: black;
    transition: color 0.3;
  }
`;

const ButtonDiv = styled.div`
    display: flex;
`

const LoginInformation = () => {
    const history = useHistory();
    const userName = useSelector(state => state.token.username);

    return (
    <LoginInformationContainer>
        {userName.length > 0 ?
            <div>
                <LoginText>{userName}님, 안녕하세요!</LoginText>
                <ButtonDiv>
                    <Button onClick={() => history.push("/mypage")}>Mypage</Button>
                    <Button onClick={() => history.push("/write")}>글작성</Button>
                </ButtonDiv>
            </div>
            :
            <div>
                <LoginText>로그인이 필요합니다.</LoginText>
                <ButtonDiv>
                    <Button onClick={() => history.push("/register")}>회원가입</Button>
                </ButtonDiv>                
            </div>}
    </LoginInformationContainer>);
}

export default LoginInformation;