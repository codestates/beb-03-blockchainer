import axios from "axios";

const fetchMyInfo = async (username) => {
  const url = `http://ec2-3-38-101-203.ap-northeast-2.compute.amazonaws.com/mypage/userinfo/${username}`;
  const info = await axios.get(url);
  return info.data.data;
};

const fetchMyPosts = async (username) => {
  const url = `http://ec2-3-38-101-203.ap-northeast-2.compute.amazonaws.com/mypage/post/${username}`;
  const posts = await axios.get(url);
  return posts.data.data;
};

const fetchMyComments = async (username) => {
  const url = `http://ec2-3-38-101-203.ap-northeast-2.compute.amazonaws.com/mypage/comment/${username}`;
  const comments = await axios.get(url);
  return comments.data.data;
};

const fetchMyNfts = async (username) => {
  const url = `http://ec2-3-38-101-203.ap-northeast-2.compute.amazonaws.com/mypage/nftlist/${username}`;
  const nfts = await axios.get(url);
  return nfts.data.data;
};

export { fetchMyInfo, fetchMyPosts, fetchMyComments, fetchMyNfts };
