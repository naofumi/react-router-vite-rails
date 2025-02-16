module ApplicationHelper
  def profile_button(user = current_user)
    if user
      form_with url: session_path(user.id), method: :delete do |f|
        tag.div do
          safe_join(
            [
              tag.span(user.email, class: "top_nav__email"),
              f.button("Logout", class: "top_nav__logout_button")
            ]
          )
        end
      end
    else
      link_to "Login", new_session_path, class: "top_nav__login_button"
    end
  end
end
