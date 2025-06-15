# We are generating page-oriented JSON APIs that contain all necessary data to render a page.
# We have also removed fields that are not needed for that page.
# (For example, Author ids are not included)
#
# The Rails default JSON serializer – `jbuilder`, is ideal for this.

json.key_format! camelize: :lower
json.deep_format_keys!

json.posts do
  json.array! @posts do |post| # , partial: "posts/post", as: :post
    json.extract! post, :id, :content
    json.author do
      json.extract! post.author, :email
    end
    json.highlighted Permissions::Post.can_edit?(current_user, post)
    # We send permissions to the server so that
    # the client doesn't have to contain any authorization logic.
    json.can_edit_post Permissions::Post.can_edit?(current_user, post)
    json.created_at post.created_at.iso8601
  end
end

json.pagination do
  json.next_page @posts.next_page
  json.prev_page @posts.prev_page
end
# We send permissions to the server so that
# the client doesn't have to contain any authorization logic.
json.permissions do
  json.can_create_post Permissions::Post.can_create?(current_user)
end
