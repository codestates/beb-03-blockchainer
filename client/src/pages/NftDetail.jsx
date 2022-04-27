import { useParams, useLocation } from 'react-router-dom';
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-right: auto;
  margin-left: auto;
`;

const Div = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;

  &.detail {
    display: flex;
    width: 80%;
    border: 1px solid lightgray;
    padding: 0.2rem 0.2rem;
    flex-wrap : wrap;
  }

  &.desc {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    margin-left: 3rem;
    width: 40%;
  }

  &.props {
    flex-wrap: wrap;
    justify-content: flex-start;
  }
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

const Detail = styled.div`
  display: flex;
  width: 100%;
  padding: 1rem 1rem;
  flex-wrap : wrap;
  justify-content: center;
`;

const Image = styled.img`
  width: 30rem;
  height: 33rem;
  padding: 3rem 3rem;
  border: 1px solid lightgray;
  border-radius: 0.5rem;
  margin-left: 1.5rem;
`;

const DescDiv = styled.div`
  margin: 1rem 0rem;
  border: 1px solid lightgray;
  border-radius: 0.5rem;
  width: 100%;
  padding: 1rem 1rem 2rem 1rem;
  text-align: center;

  &.props {
    width: 29%;
    margin: 1rem 1rem;
    border: 1px solid gray;
  }
`;

const P = styled.p`
  &.name {
    font-size: 2rem;
    font-weight: bold;
    margin: 0.5rem 0;
  }

  &.owner {
    color: gray;
  }
  
  &.desc_price {
    text-align: center;
    font-size: 1.3rem;
  }

  &.desc_description {
    font-size: 1.3rem;
  }

  &.props_type {
    font-size: 1.3rem;
    color: gray;
    font-weight: bold;
  }

  &.props_value {
    font-size: 1.3rem;
    font-weight: bold;
  }
`;

const Button = styled.button`
  background: #212529;
  border: 0.1rem solid transparent;
  padding: 10px 15px;
  color: #fff;
  cursor: pointer;
  border-radius: 0.3rem;
  margin-left: 1rem;
  
  &:hover {
    border: 0.1rem solid black;
    background-color: white;
    color: black;
    transition: color 0.3;
  }
`;

const Properties = styled.div`
  display: flex;
  border: 1px solid lightgray;
  border-radius: 0.5rem;
  margin: 2rem 2rem;
  padding: 1rem 1rem;
  width: 85%;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

const NftDetail = () => {
  const nftId = useParams();
  const location = useLocation();
  const nft = location.state.nft;
  const metadata = location.state.metadata;
  return (
    <Main>
      {console.log(nftId)}
      {console.log(location.state)}
      <Section>
        <Container>
          <Div>
            <TitleDiv>
              <Title>NFT</Title>
            </TitleDiv>
          </Div>
          <Div className='detail'>
            <Detail>
              <Image src={metadata.image} />
              <Div className='desc'>
                <P className='name'>{metadata.name}</P>
                <P className='owner'>owned by BlockChainer</P>
                <DescDiv>
                  <h2>Current Price</h2>
                  <P className='desc_price'>{nft.price} BCT</P>
                  <span>
                    <Button type='button'>Buy now</Button>
                    <Button type='button'>make offer</Button>
                  </span>
                </DescDiv>
                <DescDiv>
                  <h2>Description</h2>
                  <P className='desc_description'>{metadata.description}</P>
                </DescDiv>
              </Div>
            </Detail>
            <Properties>
              <h2>Properties</h2>
              <Div className='props'>
                {metadata.attributes.map((el) => {
                  return (
                    <DescDiv className='props'>
                      <P className='props_type'>{el.type}</P>
                      <P className='props_value'>{el.value}</P>
                    </DescDiv>
                  )
                })}
              </Div>
              
            </Properties>
          </Div>
        </Container>
      </Section>
    </Main>
  );
};

export default NftDetail;