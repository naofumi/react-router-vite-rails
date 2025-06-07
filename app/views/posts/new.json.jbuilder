json.key_format! camelize: :lower
json.deep_format_keys!

json.current_user do
  json.extract! current_user, :email
end
