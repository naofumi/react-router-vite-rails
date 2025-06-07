require "test_helper"

class PostValidationsTest < ActiveSupport::TestCase
  def setup
    @author = User.new
  end

  test "post without content is invalid" do
    post = @author.posts.build
    assert_not post.valid?
  end

  test "post with content is valid" do
    post = @author.posts.build(content: "test")
    assert post.valid?
  end
end
