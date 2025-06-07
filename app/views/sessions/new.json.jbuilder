json.key_format! camelize: :lower
json.deep_format_keys!

json.is_already_authenticated current_user ? true : false
