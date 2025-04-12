Rails.application.routes.draw do
  resources :users do
    get :me, on: :collection
  end
  resources :posts
  resources :sessions, only: [ :new, :create, :destroy ]
  resources :fixtures, only: [ :create ]
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Defines the root path route ("/")
  # root "posts#index"
  root "statics#landing_page"

  # When we use React Router inside a subdirectory, it works better if we
  # use a trailing slash for the root path.
  # This redirects from "/react-router" to "/react-router/".
  get "react-router", to: redirect("/react-router/"), constraints: ->(req) {
    req.original_url.last != "/"
  }
  # All requests to `/react-router/*` are handled by ReactController#show.
  #
  # Note that we DO NOT serve the `index.html` file directly using Rails' static server middleware.
  # There are a few reasons for this:
  #
  # * Rails assets typically use an aggressive cache-control header (default: 1 year),
  #   which makes sense because they have cache-busting digests.
  #   The `index.html` file does not have digests, however, so the cache-control
  #   must be different.
  #   In most cases, browser caching is avoided or short-lived for HTML responses.
  #
  # * We use cookies for CSRF protection.
  #   Sending the index.html file through the Controller allows us to send
  #   the cookies on the first load.
  #   Otherwise, if the index.html file was served statically, you would need a
  #   separate request just to get the CSRF token.
  match "react-router", to: "react#show", via: :all
  match "react-router/*path", to: "react#show", via: :all
end
