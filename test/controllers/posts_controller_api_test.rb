require "test_helper"

class PostsControllerApiTest < ActionDispatch::IntegrationTest
  setup do
    @post = posts(:post_1)
  end

  test "should get index" do
    get posts_url, as: :json

    assert_response :success
    assert_equal 10, response.parsed_body.dig(:posts).size
    assert_equal %w[id content author highlighted canEditPost createdAt].sort,
                 response.parsed_body.dig(:posts, 0).keys.sort
  end

  test "#create should redirect to login if not logged in" do
    post posts_url, params: { post: { content: "New post content" } }, as: :json

    assert_response(:unauthorized)
  end

  test "#create should create new Post and return 201 if valid and if logged in" do
    login_as(users(:sazae)) do
      assert_difference("Post.count", 1) do
        post posts_url, params: { post: { content: "New post content" } }, as: :json
      end
    end

    assert_response(:created)
  end

  test "#create should not create new Post and return 422 if invalid and if logged in" do
    login_as(users(:sazae)) do
      assert_difference("Post.count", 0) do
        post posts_url, params: { post: { content: "" } }, as: :json
      end
    end

    assert_response(:unprocessable_entity)
    assert_equal({ "content"=>[ "can't be blank" ] }, response.parsed_body)
  end
end
