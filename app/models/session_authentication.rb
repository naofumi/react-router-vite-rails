class SessionAuthentication
  def initialize(session:, resource_class: User, resource_id: :user_id)
    @session = session
    @resource_class = resource_class
    @resource_id = resource_id
  end

  def current_resource
    @current_resource = if defined?(@current_resource)
      @current_resource
    else
      @resource_class.find_by(id: @session[@resource_id])
    end
  end
end
