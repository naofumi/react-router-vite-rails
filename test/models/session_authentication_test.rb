require "test_helper"

class SessionAuthenticationTest < ActiveSupport::TestCase
  test "#current_resource returns nil if session empty" do
    authenticator = SessionAuthentication.new(session: {})

    assert_nil authenticator.current_resource
  end

  test "current_resource returns nil if session has invalid resource_id" do
    authenticator = SessionAuthentication.new(session: {user_id: 999_999})

    assert_nil authenticator.current_resource
  end

  test "current_resource returns user if session has valid resource_id" do
    user = users(:sazae)
    authenticator = SessionAuthentication.new(session: {user_id: user.id})

    assert_equal user, authenticator.current_resource
  end
end
