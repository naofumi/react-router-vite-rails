require "test_helper"

class ReactControllerTest < ActionDispatch::IntegrationTest
  test "/react/ should render successfully" do
    get "/react/"
    assert_response :success
    assert_includes response.body, "<body"
  end

  test "/react/foo should render successfully" do
    get "/react/foo"
    assert_response :success
  end

  test "/react should redirect to /react/" do
    get "/react"
    assert_redirected_to "/react/"
  end

  test "should set X-CSRF-Token cookie" do
    get "/react/"
    assert response.headers["set-cookie"].any? { _1.include? "X-CSRF-Token" }
  end
end
