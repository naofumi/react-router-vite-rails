require "test_helper"

class ButtonsHelperTest < ActionView::TestCase
  include ApplicationHelper

  test "profile_button should render Login unless logged in" do
    result = profile_button(nil)
    assert result.include?("Login")
  end

  test "profile_button should render Logout if logged in" do
    result = profile_button(users(:sazae))
    assert result.include?("Logout")
  end

  test "new_post_button should render Login unless logged in" do
    result = new_post_button(nil)
    assert result.include?("Login")
  end

  test "new_post_button should render New Post if logged in" do
    result = new_post_button(users(:sazae))
    assert result.include?("New Post")
  end
end
