import request from 'supertest';
import { PrismaClient } from '@prisma/client';
import express from 'express';
import { app } from '../index';

jest.mock('@prisma/client', () => {
  const mockUser = {
    id: 1,
    name: 'Test User',
    email: 'test@example.com',
  };

  const mockPost = {
    id: 1,
    title: 'Draft Post',
    content: 'Draft Content',
    published: false,
    authorId: 1,
    viewCount: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockUsers = [
    mockUser,
    {
      id: 2,
      name: 'Test User 2',
      email: 'test2@example.com',
    }
  ];

  return {
    PrismaClient: jest.fn().mockImplementation(() => ({
      user: {
        create: jest.fn().mockResolvedValue(mockUser),
        findMany: jest.fn().mockResolvedValue(mockUsers),
        findUnique: jest.fn().mockReturnValue({
          posts: jest.fn().mockResolvedValue([mockPost])
        }),
        deleteMany: jest.fn().mockResolvedValue({ count: 1 }),
      },
      post: {
        create: jest.fn().mockResolvedValue(mockPost),
        findMany: jest.fn().mockResolvedValue([mockPost]),
        findUnique: jest.fn().mockResolvedValue(mockPost),
        update: jest.fn().mockImplementation((args) => {
          if (args.data.viewCount) {
            return Promise.resolve({ ...mockPost, viewCount: mockPost.viewCount + 1 });
          }
          if ('published' in args.data) {
            return Promise.resolve({ ...mockPost, published: !mockPost.published });
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

describe('User API', () => {
  beforeAll(async () => {
    // テスト用のデータベースをセットアップ
    await prisma.$connect();
  });

  afterAll(async () => {
    // テスト後にデータベース接続を閉じる
    await prisma.$disconnect();
  });

  beforeEach(async () => {
    // 各テストの前にデータベースをクリーンアップ
    await prisma.post.deleteMany();
    await prisma.user.deleteMany();
  });

  describe('POST /signup', () => {
    it('should create a new user', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
      };

      const response = await request(app)
        .post('/signup')
        .send(userData);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        name: userData.name,
        email: userData.email,
      });
    });

    it('should create a user with posts', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        posts: [
          {
            title: 'Test Post',
            content: 'Test Content',
          },
        ],
      };

      const response = await request(app)
        .post('/signup')
        .send(userData);

      expect(response.status).toBe(200);
      expect(response.body).toMatchObject({
        name: userData.name,
        email: userData.email,
      });
    });
  });

  describe('GET /users', () => {
    it('should return all users', async () => {
      // テストユーザーを作成
      await prisma.user.create({
        data: {
          name: 'Test User 1',
          email: 'test1@example.com',
        },
      });

      await prisma.user.create({
        data: {
          name: 'Test User 2',
          email: 'test2@example.com',
        },
      });

      const response = await request(app).get('/users');

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(2);
    });
  });

  describe('GET /user/:id/drafts', () => {
    it('should return user drafts', async () => {
      // テストユーザーと下書き記事を作成
      const user = await prisma.user.create({
        data: {
          name: 'Test User',
          email: 'test@example.com',
          posts: {
            create: [
              {
                title: 'Draft Post',
                content: 'Draft Content',
                published: false,
              },
            ],
          },
        },
      });

      const response = await request(app).get(`/user/${user.id}/drafts`);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(1);
      expect(response.body[0].published).toBe(false);
    });
  });
}); 