namespace :react_router do
  desc "Test React Router App"
  task :test do
    Dir.chdir("#{Dir.pwd}/frontend") do
      puts "Run tests ..."
      system("npm", "run", "test")
    end
  end
end
