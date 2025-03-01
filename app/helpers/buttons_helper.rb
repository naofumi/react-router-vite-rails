module ButtonsHelper
  def profile_button(user = current_user)
    if user
      form_with url: session_path(user.id), method: :delete do |f|
        tag.div class: "top_nav__profile" do
          sj tag.div(user.email, class: "top_nav__email"),
             f.button("Logout", class: "button button--primary font-bold")
        end
      end
    else
      link_to "Login", new_session_path, class: "button button--primary font-bold"
    end
  end

  def new_post_button(user = current_user)
    if user
      link_to "New Post", new_post_path, class: "button button--primary"
    else
      link_to "Login", new_session_path, class: "button button--primary"
    end
  end
end
