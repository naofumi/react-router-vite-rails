import {describe, expect, test, vi} from 'vitest'
import { initializeTests } from '~/utilities/test_helper'; // Import the shared test setup

initializeTests();

import {clientLoader} from './home'

describe("clientLoader", () => {
  describe("when fetch is successful", () => {
    test("should return posts", async () => {
      const mockResponse = { posts: [{
          id: 1,
          content: "Hello World!",
          author: { email: "author@example.com" },
          highlighted: false,
          canEditPost: true,
          createdAt: "2022-01-01T00:00:00.000Z"
        }],
        permissions: { canCreatePost: false },
        pagination: { prevPage: 1, nextPage: 3 } }
      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: async () => { return mockResponse }
        } as Response)
      )

      const loaderData = await clientLoader({request: new Request("http://test.example.com/posts")})

      await expect(loaderData.posts[0].author.email).toEqual("author@example.com")
    })
  })

  describe("when fetch response is 403 Forbidden", async () => {
    test("should throw error", async () => {
      global.fetch = vi.fn(() =>
        Promise.resolve({
          ok: false,
          status: 403,
          statusText: "Forbidden",
          json: async () => { return {} }
        } as Response)
      )

      try {
        await clientLoader({request: new Request("http://test.example.com/posts")})
      } catch (error) {
        expect(error).toMatchObject({data: "Forbidden", init: {status: 403}})
      }
    })
  })
})
