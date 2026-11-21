require "test_helper"

class PostValidationsTest < ActiveSupport::TestCase
  def setup
    # belongs_to requires a persisted author; an unsaved User fails "Author must exist".
    @author = User.create!(email: "author@example.com", clear_password: "secret")
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
