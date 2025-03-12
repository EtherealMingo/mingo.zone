import Request from '@/utils/request';

const server = new Request({});
const hitokotoServer = new Request({ baseURL: 'https://v1.hitokoto.cn' });
const getHitokotoSentence = (params: any) => hitokotoServer.get('', { params })

export {
  getHitokotoSentence
}