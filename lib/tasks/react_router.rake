namespace :react_router do
  # For convenience, npm packages do not have to be explicitly installed.
  # Installed will be automatically initiated by other tasks.
  desc "Install npm packages for the React Router app"
  task :npm_install do
    Dir.chdir("#{Dir.pwd}/frontend") do
      puts "Install npm packages ..."
      system("npm", "install")
    end
  end

  # Run bin/rails react_router:dev to start the dev server.
  #
  # If you are using the Foreman gem, you might want to put
  # this task into the Procfile.
  #
  # bin/rails react_router:dev
  desc "Start React Router Dev Server"
  task dev: [ :npm_install ] do
    Dir.chdir("#{Dir.pwd}/frontend") do
      system("npm", "run", "dev")
    end
  end

  # bin/rails react_router:typecheck
  desc "Check Typescript for the React Router App"
  task typecheck: [ :npm_install ] do
    Dir.chdir("#{Dir.pwd}/frontend") do
      system("npm", "run", "typecheck")
    end
  end

  # Run bin/rails react_router:build to build the production app.
  # The location of the build is defined in the
  # frontend/react-router.config.ts file, and should
  # point to a location within the public folder.
  # Running bin/rails assets:precompile will also run this task.
  #
  # bin/rails react_router:build
  desc "Build React Router App"
  task build: [ :npm_install ] do
    Dir.chdir("#{Dir.pwd}/frontend") do
      system("npm", "run", "build")
    end
  end

  # Run bin/rails react_router:clobber to remove the build files.
  # Running bin/rails assets:clobber will also run this task.
  task :clobber do
    FileUtils.rm_rf("#{Dir.pwd}/public/react-router")
  end
end

# The following adds the above tasks to the regular
# assets:precompile and assets:clobber tasks.
#
# This means that any normal Rails deployment script which
# contains rake assets:precompile will also build the
# React Router app automatically.
Rake::Task["assets:precompile"].enhance([ "react_router:build" ])
Rake::Task["assets:clobber"].enhance([ "react_router:clobber" ])
