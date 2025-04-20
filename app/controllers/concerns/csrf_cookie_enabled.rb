# This concern sets the CSRF token inside the "X-CSRF-Token" cookie,
# allowing you to easily use the robust CSRF protection that Ruby on Rails provides
# inside your React Router app.
#
# Refer to `frontend/app/utilities/csrf.ts` to see
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
