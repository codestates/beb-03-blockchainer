import axios from "axios";

const getPageCount = async () => {
  const url =
    "http://ec2-3-38-101-203.ap-northeast-2.compute.amazonaws.com/page/count";
  const lastPage = await axios.get(url);
  return lastPage.data.data;
};

export default getPageCount;
