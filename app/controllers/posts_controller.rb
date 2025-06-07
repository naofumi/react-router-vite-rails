class PostsController < ApplicationController
  before_action :authenticate_user!, except: [ :index ]
  # GET /posts or /posts.json
  def index
    @posts = Post.includes(:author).order(created_at: :desc).page(params[:page]).per(10)
  end

  # GET /posts/new
  def new
    @post = current_user.posts.build

    respond_to do |format|
      format.html
      format.json { head :ok }
    end
  end

  # POST /posts or /posts.json
  def create
    @post = current_user.posts.build(post_params)

    respond_to do |format|
      if @post.save
        format.html { redirect_to posts_path, notice: "Post was successfully created." }
        format.json { render :show, status: :created, location: @post }
      else
        format.html { render :new, status: :unprocessable_entity }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  private
    # Only allow a list of trusted parameters through.
    def post_params
      params.expect!(post: [ :content ])
    end
end
