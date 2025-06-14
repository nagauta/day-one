import request from 'supertest';
import { app } from '../index';

describe('API Endpoints', () => {
  describe('GET /post/:id', () => {
    jest.useFakeTimers();
    // 下記で報告されている回避策を使うことで回避できる
    // https://github.com/prisma/prisma/issues/7424#issuecomment-1383207020
    // jest.useFakeTimers({ doNotFake: ['nextTick'] });
    
    it('should return a specific post', async () => {
      // まず新しい投稿を作成
      const postData = {
        title: 'Test Post for Get',
        content: 'Test Content for Get',
        authorEmail: 'test@example.com',
      };

      const createResponse = await request(app)
        .post('/post')
        .send(postData);

      const postId = createResponse.body.id;

      // 作成した投稿を取得
      const getResponse = await request(app)
        .get(`/post/${postId}`);

      expect(getResponse.status).toBe(200);
      expect(getResponse.body).toHaveProperty('id');
      expect(getResponse.body.title).toBe(postData.title);
      expect(getResponse.body.content).toBe(postData.content);
    });

 });;
}); 