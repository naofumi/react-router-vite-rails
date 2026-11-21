ENV["RAILS_ENV"] ||= "test"
require_relative "../config/environment"
require "rails/test_help"

# ReactController serves the built SPA shell. Tests only need that file to exist;
# the frontend build is covered separately by typecheck.
react_index = Rails.public_path.join("react/react-router-rails-spa-index.html")
unless react_index.exist?
  react_index.dirname.mkpath
  react_index.write("<!DOCTYPE html><html><body></body></html>\n")
end
# Mocking/Stubbing support
require "minitest/mock"
require "ostruct"

module ActiveSupport
  class TestCase
    # Run tests in parallel with specified workers
    parallelize(workers: :number_of_processors)

    # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
    fixtures :all

    # Add more helper methods to be used by all tests here...
    def login_as(user, &block)
      SessionAuthentication.stub :new, ->(*) { OpenStruct.new(current_resource: user) } do
        block.call
      end
    end
  end
end
