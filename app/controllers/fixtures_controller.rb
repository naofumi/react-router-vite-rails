class FixturesController < ApplicationController
  def create
    system "bin/rails db:fixtures:load RAILS_ENV=#{Rails.env}"

    respond_to do |format|
      format.html { redirect_to posts_path }
      format.json { head :no_content, status: :created }
    end
  end
end
