require "test_helper"

class PostsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @post = posts(:post_1)
  end

  test "#index should get index" do
    get posts_url
    assert_response :success
    assert_select "h1", text: "Posts"
  end

  test "#new should be redirected to login if not logged in" do
    get new_post_url
    assert_redirected_to new_session_path
  end

  test "#new should get new if logged in" do
    login_as(users(:sazae)) do
      get new_post_url

      assert_response :success
      assert_select "h1", text: "New Post"
    end
  end

  test "#create should be redirected to login if not logged in" do
    post posts_url, params: { post: { content: "New Post Content" } }
    assert_redirected_to new_session_path
  end

  test "#create should create post if logged in" do
    assert_difference("Post.count") do
      login_as(users(:sazae)) do
        post posts_url, params: { post: { content: "New Post Content" } }
      end
    end

    assert_redirected_to posts_url
  end
end
