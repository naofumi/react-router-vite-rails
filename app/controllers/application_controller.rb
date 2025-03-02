class ApplicationController < ActionController::Base
  include CsrfCookieEnabled
  helper_method :current_user
  before_action :simulate_slow_site

  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  private

    def current_user
      @current_user = defined?(@current_user) ? @current_user : User.find_by(id: session[:user_id])
    end

    def simulate_slow_site
      sleep 2
    end
end
