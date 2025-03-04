module ButtonsHelper
  # I like to use View helpers instead of partials to create simple components like buttons.
  # View helpers can become cumbersome for complex components but are a great fit
  # for Atom- or Molecule-level components, as defined in the Atomic Design methodology.
  #
  # Sending in the `user` attributes (with a default value of `current_user`) is my
  # preferred way of making the view helpers easy to test even without mocks.
  # I typically test authorization-dependent view logic like this.
  #
  # See `test/helpers/buttons_helper_test.rb` for a testing example.
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
