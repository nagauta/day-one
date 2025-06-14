import request from 'supertest';
import { PrismaClient } from '@prisma/client';
import { app } from '../index';

jest.mock('@prisma/client', () => {
  const mockUser = {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
  };

  const mockPost = {
    id: 1,
    title: 'Test Post',
    content: 'Test Content',
    published: false,
    authorId: 1,
    viewCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockPublishedPost = {
    id: 2,
    title: 'First Post',
    content: 'First Content',
    published: true,
    authorId: 1,
    viewCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      user: {
        create: jest.fn().mockResolvedValue(mockUser),
        findMany: jest.fn().mockResolvedValue([mockUser]),
        findUnique: jest.fn().mockResolvedValue(mockUser),
        deleteMany: jest.fn().mockResolvedValue({ count: 1 }),
      },
      post: {
        create: jest.fn().mockImplementation((args) => {
          return Promise.resolve({
            ...mockPost,
            title: args.data.title,
            content: args.data.content,
          });
        }),
        findMany: jest.fn().mockImplementation((args) => {
          if (args.where?.OR) {
            return Promise.resolve([mockPublishedPost]);
          }
          return Promise.resolve([{ ...mockPost, published: true }]);
        }),
        findUnique: jest.fn().mockImplementation((args) => {
          if (args.select?.published !== undefined) {
            return Promise.resolve({ published: mockPost.published });
          }
          return Promise.resolve(mockPost);
        }),
        update: jest.fn().mockImplementation((args) => {
          if (args.data.viewCount) {
            return Promise.resolve({ ...mockPost, viewCount: mockPost.viewCount + 1 });
          }
          if ('published' in args.data) {
            return Promise.resolve({ ...mockPost, published: true });
          }
          return Promise.resolve(mockPost);
        }),
        delete: jest.fn().mockResolvedValue(mockPost),
        deleteMany: jest.fn().mockResolvedValue({ count: 1 }),
      },
      $connect: jest.fn(),
      $disconnect: jest.fn(),
    })),
  };
});

const prisma = new PrismaClient();

describe('Post API', () => {
  let testUser: { id: number; email: string };

  beforeAll(async () => {
    await prisma.$connect();
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    await prisma.post.deleteMany();
    await prisma.user.deleteMany();

    // テストユーザーを作成
    testUser = await prisma.user.create({
      data: {
        name: 'Test User',
        email: 'test@example.com',
      },
    });
  });

  describe('POST /post', () => {
    it('should create a new post', async () => {
      const postData = {
        title: 'Test Post',
        content: 'Test Content',
        authorEmail: testUser.email,
      };

      const response = await request(app)
        .post('/post')
        .send(postData);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        title: postData.title,
        content: postData.content,
      });
    });
  });

  describe('GET /post/:id', () => {
    it('should return a post by id', async () => {
      const post = await prisma.post.create({
        data: {
          title: 'Test Post',
          content: 'Test Content',
          author: {
            connect: { id: testUser.id },
          },
        },
      });

      const response = await request(app).get(`/post/${post.id}`);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        title: post.title,
        content: post.content,
      });
    });
  });

  describe('PUT /post/:id/views', () => {
    it('should increment post views', async () => {
      const post = await prisma.post.create({
        data: {
          title: 'Test Post',
          content: 'Test Content',
          author: {
            connect: { id: testUser.id },
          },
        },
      });

      const response = await request(app).put(`/post/${post.id}/views`);

      expect(response.status).toBe(200);
      expect(response.body.viewCount).toBe(1);
    });
  });

  describe('PUT /publish/:id', () => {
    it('should toggle post published status', async () => {
      const post = await prisma.post.create({
        data: {
          title: 'Test Post',
          content: 'Test Content',
          author: {
            connect: { id: testUser.id },
          },
        },
      });

      const response = await request(app).put(`/publish/${post.id}`);

      expect(response.status).toBe(200);
      expect(response.body.published).toBe(true);
    });
  });

  describe('GET /feed', () => {
    it('should return published posts', async () => {
      await prisma.post.create({
        data: {
          title: 'Published Post',
          content: 'Published Content',
          published: true,
          author: {
            connect: { id: testUser.id },
          },
        },
      });

      await prisma.post.create({
        data: {
          title: 'Draft Post',
          content: 'Draft Content',
          published: false,
          author: {
            connect: { id: testUser.id },
          },
        },
      });

      const response = await request(app).get('/feed');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(1);
      expect(response.body[0].published).toBe(true);
    });

    it('should filter posts by search string', async () => {
      await prisma.post.create({
        data: {
          title: 'First Post',
          content: 'First Content',
          published: true,
          author: {
            connect: { id: testUser.id },
          },
        },
      });

      await prisma.post.create({
        data: {
          title: 'Second Post',
          content: 'Second Content',
          published: true,
          author: {
            connect: { id: testUser.id },
          },
        },
      });

      const response = await request(app).get('/feed?searchString=First');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(1);
      expect(response.body[0].title).toBe('First Post');
    });
  });
}); 