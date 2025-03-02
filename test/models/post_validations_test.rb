require "test_helper"

class PostValidationsTest < ActiveSupport::TestCase
  test "post without content is invalid" do
    post = Post.new
    assert_not post.valid?
  end

  test "post with content is valid" do
    post = Post.new(content: "test")
    assert post.valid?
  end
end
