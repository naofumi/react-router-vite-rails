class SessionsController < ApplicationController
  # GET /users/new
  def new
  end

  # POST /users or /users.json
  def create
    @user = User.find_by(email: params[:email], clear_password: params[:clear_password])
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
