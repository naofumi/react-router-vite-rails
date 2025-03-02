require "test_helper"

class FlashPartialTest < ActionView::TestCase
  test "renders flash notice" do
    flash[:notice] = "foo_notice"
    render "application/flash"

    assert_select ".flash__notice", text: "foo_notice"
  end

  test "renders flash alert" do
    flash[:alert] = "foo_alert"
    render "application/flash"

    assert_select ".flash__alert", text: "foo_alert"
  end
end
