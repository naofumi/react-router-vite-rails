class ApplicationController < ActionController::Base
  include CsrfCookieEnabled
  helper_method :current_user
  before_action :simulate_slow_site

  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  private

    def current_user
      @session_authenticator ||= SessionAuthentication.new(session:)
      @session_authenticator.current_resource
    end

    def authenticate_user!
      return if current_user

      respond_to do |format|
        format.html { redirect_to new_session_path, notice: "Please login to complete action" }
        format.json { head :unauthorized }
      end
    end

    def simulate_slow_site
      sleep rand(0.5...1.5) unless Rails.env.test?
    end
end
