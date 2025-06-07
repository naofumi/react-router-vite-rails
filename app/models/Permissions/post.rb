class Permissions::Post
  class << self
    def can_edit?(user, post)
      post.author == user
    end

    def can_create?(user)
      user.present?
    end
  end
end
