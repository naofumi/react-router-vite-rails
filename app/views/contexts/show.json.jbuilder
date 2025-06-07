json.key_format! camelize: :lower
json.deep_format_keys!

json.current_user do
  if current_user
    json.extract! current_user, :id, :email
  else
    json.null!
  end
end

json.feature_flags reset_data_feature: FeatureToggles.reset_data
json.theme "light-mode"
json.locale I18n.locale
json.environment Rails.env
