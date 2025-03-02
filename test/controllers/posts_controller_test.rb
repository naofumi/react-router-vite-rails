require "test_helper"

class PostsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @post = posts(:first_post)
  end

  test "should get index" do
    get posts_url
    assert_response :success
    assert_select "h1", text: "Posts"
  end

  test "should get new" do
    get new_post_url
    assert_response :success
    assert_select "h1", text: "New Post"
  end

  test "should create post" do
    assert_difference("Post.count") do
      post posts_url, params: { post: { content: @post.content } }
    end

    assert_redirected_to posts_url
  end
end
