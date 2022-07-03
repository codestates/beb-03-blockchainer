import axios from "axios";

// 모든 NFT 데이터 가져오기
const fetchAllNfts = async () => {
  const url =
    "http://ec2-3-38-101-203.ap-northeast-2.compute.amazonaws.com/nft/allnfts";
  const res = await axios.get(url);
  return res.data.data;
};

export default fetchAllNfts;
