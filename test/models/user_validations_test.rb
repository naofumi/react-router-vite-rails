require "test_helper"

class UserValidationsTest < ActiveSupport::TestCase
  def setup
    @user = User.new(email: "hoge@example.com", clear_password: "hogepass")
  end

  test "base user should be valid" do
    assert @user.valid?
  end

  test "user without email should be invalid" do
    @user.email = ""

    assert_not @user.valid?
  end

  test "user without clear_password should be invalid" do
    @user.clear_password = ""

    assert_not @user.valid?
  end
end
