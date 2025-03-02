require "test_helper"

class UserAuthenticationTest < ActiveSupport::TestCase
  def setup
    @sazae = users(:sazae)
  end

  test "authenticated_user authenticates with @sazae" do
    assert_equal @sazae,
                 User.authenticated_user(email: @sazae.email, clear_password: @sazae.clear_password)
  end

  test "authenticated_user fails to authenticate with non-existing password" do
    assert_nil User.authenticated_user(email: @sazae.email, clear_password: "bad_password")
  end

  test "authenticated_user fails to authenticate with non-existing user" do
    assert_nil User.authenticated_user(email: "bad@email.com", clear_password: @sazae.clear_password)
  end
end
