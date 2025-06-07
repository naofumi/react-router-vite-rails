require "test_helper"

class ContextControllerApiTest < ActionDispatch::IntegrationTest
  test "#show when not logged in" do
    get context_url, as: :json

    assert_response :success
    assert_equal %w[currentUser environment featureFlags locale theme].sort,
                 response.parsed_body.keys.sort
    assert_nil response.parsed_body[:currentUser]
  end

  test "#show when logged in" do
    login_as(users(:sazae)) do
      get context_url, as: :json
    end

    assert_response :success
    assert_equal %w[currentUser environment featureFlags locale theme].sort,
                 response.parsed_body.keys.sort
    assert_equal "sazae@example.com", response.parsed_body.dig(:currentUser, :email)
  end
end
