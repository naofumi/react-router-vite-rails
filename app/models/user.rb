class User < ApplicationRecord
  validates :email, :clear_password, presence: true
  has_many :posts, foreign_key: "author_id", dependent: :restrict_with_error

  class << self
    def authenticated_user(email:, clear_password:)
      find_by(email:, clear_password:)
    end
  end
end
