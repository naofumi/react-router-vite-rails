require "test_helper"

class PostsControllerApiTest < ActionDispatch::IntegrationTest
  setup do
    @post = posts(:first_post)
  end

  test "should get index" do
    get posts_url, as: :json

    assert_response :success
    assert response.parsed_body.size == 4
    assert response.parsed_body.dig(0, :content) == @post.content
  end

  test "should create post" do
    assert_difference("Post.count") do
      post posts_url, params: { post: { content: @post.content } }, as: :json
    end

    assert :ok, response.status
  end
end
