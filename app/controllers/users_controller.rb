class UsersController < ApplicationController
  def me
    if @user = current_user
      render :me
    else
      head :no_content
    end
  end
end
