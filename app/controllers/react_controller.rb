class ReactController < ApplicationController
  layout false

  # This is the catch-all action for React Router. This will render the index.html file
  # for all React Router requests.
  #
  # Unlike typical webpack or esbuild setups, we do not render ERB files which use
  # `javascript_include_tag` (propshaft, sprockets) or `javascript_pack_tag` (webpack)
  # to load the React app.
  # Instead, we render the index.html file that was generated by the React Router build
  # and renamed to "react-router-index.html".
  #
  # This setup allows us to better benefit from the optimizations that React Router includes
  # in its build.
  #
  # The response will also send cookies and other headers set in the controller.
  def show
    render file: Rails.root.join("public", "react-router", "react-router-index.html")
  end
end
