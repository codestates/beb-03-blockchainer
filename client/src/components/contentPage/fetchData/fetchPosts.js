import axios from "axios";

const fetchPosts = async (page) => {
  const url = `http://ec2-3-38-101-203.ap-northeast-2.compute.amazonaws.com/page/list/${page}`;
  const getPosts = await axios.get(url);
  return getPosts;
};

export default fetchPosts;
