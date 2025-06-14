import request from 'supertest';
import { app } from '../index';

describe('API Endpoints', () => {
  describe('POST /signup', () => {
    it('should create a new user', async () => {
      const userData = {
        name: 'Test User',
        email: `test${Date.now()}@example.com`,
      };

      const response = await request(app)
        .post('/signup')
        .send(userData);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
      expect(response.body.name).toBe(userData.name);
      expect(response.body.email).toBe(userData.email);
    });
  });

  describe('GET /users', () => {
    it('should return all users', async () => {
      const response = await request(app).get('/users');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });

  describe('POST /post', () => {
    it('should create a new post', async () => {
      const postData = {
        title: 'Test Post',
        content: 'Test Content',
        authorEmail: 'test@example.com',
      };

      const response = await request(app)
        .post('/post')
        .send(postData);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toBe(postData.title);
      expect(response.body.content).toBe(postData.content);
    });
  });

  describe('GET /post/:id', () => {
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

 });

  describe('GET /feed', () => {
    it('should return published posts', async () => {
      const response = await request(app).get('/feed');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });

    it('should filter posts by search string', async () => {
      const response = await request(app)
        .get('/feed')
        .query({ searchString: 'test' });

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
}); 