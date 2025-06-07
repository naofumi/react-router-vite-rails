module ButtonsHelper
  def profile_button(user = current_user)
    if user
      form_with url: session_path(user.id), method: :delete do |f|
        tag.div class: "top_nav__profile" do
          safe_join [
            tag.div(user.email, class: "top_nav__email"),
            f.button(class: "button button--primary font-bold",
                     data: { controller: "loaderable", action: "click->loaderable#activate" }) {
              safe_join [ tag.span(class: "size-4 button-loader"), "Logout" ]
            }
          ]
        end
      end
    else
      link_to_with_loader "Login", new_session_path, class: "button button--primary font-bold"
    end
  end

  def new_post_button(user = current_user)
    if user
      link_to_with_loader "New Post", new_post_path, class: "button button--primary"
    else
      link_to_with_loader "Login to create new Post", new_session_path, class: "button button--primary"
    end
  end

  def link_to_with_loader(label, url, **args)
    link_to(url, **args, data: { controller: "loaderable", action: "click->loaderable#activate" }) do
      safe_join [ tag.span(class: "size-4 button-loader"), label ]
    end
  end
end
