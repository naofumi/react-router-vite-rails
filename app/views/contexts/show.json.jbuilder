json.key_format! camelize: :lower
json.deep_format_keys!

json.current_user do
  if current_user
    json.extract! current_user, :id, :email
  else
    json.null!
  end
end

# We often see feature toggle definitions scattered throughout the codebase.
# They should be put in a central location – here we use FeatureToggles.
json.feature_flags reset_data_feature: FeatureToggles.reset_data?
json.theme "light-mode"
json.locale I18n.locale
json.environment Rails.env
