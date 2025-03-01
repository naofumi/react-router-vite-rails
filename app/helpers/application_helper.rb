module ApplicationHelper
  def sj(*args)
    safe_join([ args.flatten ])
  end
end
