require "application_system_test_case"

class UserFacingSmokeTest < ApplicationSystemTestCase
  test "visitor can browse posts in ERB and React Router" do
    visit root_path

    assert_text "React Router SPA/Framework mode"
    click_link "See the Demo"
    assert_current_path posts_path
    assert_text "This is post number 16"

    click_link "to React"
    assert_current_path "/react/posts"
    assert_text "This is post number 16"

    click_link "to ERB"
    assert_current_path posts_path
    assert_text "This is post number 16"
  end

  test "guest can sign in, create a post, and share the session across renderers" do
    visit "/react/posts/new"
    assert_current_path "/react/sessions/new"
    assert_text "Login"

    fill_in "email", with: "sazae@example.com"
    fill_in "clear_password", with: "hogehoge"
    click_button "Login"

    assert_current_path "/react/posts"
    assert_text "sazae@example.com"

    click_link "to ERB"
    assert_current_path posts_path
    click_link "New Post"
    fill_in "Post Content", with: "Smoke test post shared across renderers"
    click_button "Submit"

    assert_current_path posts_path
    assert_text "Smoke test post shared across renderers"
    assert_text "sazae@example.com"

    click_link "to React"
    assert_current_path "/react/posts"
    assert_text "Smoke test post shared across renderers"
    assert_text "sazae@example.com"

    click_button "Logout"
    visit "/react/posts/new"
    assert_current_path "/react/sessions/new"
  end
end
