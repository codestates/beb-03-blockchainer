import axios from "axios";

const buyNft = async (nftId, username) => {
  const url =
    "http://ec2-3-38-101-203.ap-northeast-2.compute.amazonaws.com/nft/getnft";
  const payload = {
    id: nftId,
    username: username,
  };
  const res = await axios.post(url, payload);
  console.log(res);
  return res;
};

export default buyNft;
