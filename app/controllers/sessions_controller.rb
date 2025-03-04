# We have implemented a very simply but mostly sufficient login system to
# illustrate how easy it is to add authentication when done on Rails,
# thanks to the robust session framework that it provides.
#
# To focus on the simplicity of authentication, I have opted to use passwords in clear text.
# This is a bad idea for production, but it emphasizes that authentication is merely checking
# the provided credentials and then handing them the keys (via the session).
#
# To use this in production, use the `has_secure_password` method that ActiveRecord provides
# to check the validity of the email - password combination.
#
class SessionsController < ApplicationController
  # GET /users/new
  def new
  end

  # POST /users or /users.json
  def create
    @user = User.authenticated_user(email: params[:email], clear_password: params[:clear_password])
    respond_to do |format|
      if @user
        session.clear
        session[:user_id] = @user.id

        format.html { redirect_to posts_path, notice: "Successfully logged in!" }
        format.json { render status: :created }
      else
        flash.now[:alert] = "Invalid email or password."
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: { error: "Invalid email or password" }, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /users/1 or /users/1.json
  def destroy
    session.clear
    respond_to do |format|
      format.html { redirect_to posts_path }
      format.json { head :no_content }
    end
  end

  private

    # Only allow a list of trusted parameters through.
    def session_params
      params.expect(session: [ :email, :clear_password ])
    end
end
