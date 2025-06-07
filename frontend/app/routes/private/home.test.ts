import {describe, expect, test} from 'vitest'
import {clientLoader} from './home'

describe("clientLoader", () => {
  test("should return null", async () => {
    await expect(clientLoader({params: {}})).resolves.toBeNull()
  })
})
