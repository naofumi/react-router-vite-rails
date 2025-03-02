class Post < ApplicationRecord
  validates :content, presence: true
end
