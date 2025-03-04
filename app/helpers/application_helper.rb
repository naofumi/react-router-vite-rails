module ApplicationHelper
  # I often use the `safe_join` technique to write slightly complex
  # HTML from View Helpers.
  # This helper allows me to make the `safe_join` syntax a bit more pleasant.
  def sj(*args)
    safe_join([ args.flatten ])
  end
end
