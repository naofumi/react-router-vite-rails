# This allows you to use Ruby on Rails' robust CSRF protection
# in your React Router app.
#
# Refer to `frontend-react-router/app/utilities/csrf.ts` to see
# how the client side is implemented.
module CsrfCookieEnabled
  extend ActiveSupport::Concern
  included do
    before_action :set_csrf_cookie
  end

  private

    def set_csrf_cookie
      cookies["X-CSRF-Token"] = form_authenticity_token
    end
end
