class FixturesController < ApplicationController
  def create
    system "bin/rails db:fixtures:load RAILS_ENV=#{Rails.env}"

    redirect_back_or_to posts_path
  end
end
