class User < ApplicationRecord
  validates :email, :clear_password, presence: true

  class << self
    def authenticated_user(email:, clear_password:)
      find_by(email:, clear_password:)
    end
  end
end
