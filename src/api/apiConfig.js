import axios from '@/utils/axios';

const query = (url, params) => axios.post(url, params).then(res => res.data).catch(() => 'isError');

export default {
  query
};
