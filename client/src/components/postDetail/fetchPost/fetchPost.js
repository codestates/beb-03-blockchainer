import axios from "axios";

const fetchPost = async (id) => {
  const getPost = await axios.get(
    `http://ec2-3-38-101-203.ap-northeast-2.compute.amazonaws.com/page/content/${id}`
  );
  return getPost;
};

export default fetchPost;
