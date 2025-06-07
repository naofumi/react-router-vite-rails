json.key_format! camelize: :lower
json.deep_format_keys!

json.secret_information "This is the secret information."

# We send permissions to the server so that
# the client doesn't have to contain authorization logic.
json.permissions do
  json.can_see_private current_user.present?
end
