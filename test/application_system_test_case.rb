require "test_helper"
require "uri"
require "capybara/selenium/driver_specializations/chrome_driver"

# Chrome 158 rejects the wildcard origin Capybara 3.40 passes to
# Storage.clearDataForOrigin. Scope that cleanup to this test's app origin.
module Chrome158StorageReset
  def reset!
    uri = URI.parse(browser.current_url)
    @storage_reset_origin = "#{uri.scheme}://#{uri.host}"
    default_port = uri.scheme == "https" ? 443 : 80
    @storage_reset_origin += ":#{uri.port}" if uri.port && uri.port != default_port

    super
  ensure
    @storage_reset_origin = nil
  end

  def execute_cdp(command, params = {})
    if command == "Storage.clearDataForOrigin" && params[:origin] == "*" && @storage_reset_origin
      params = params.merge(origin: @storage_reset_origin)
    end

    super(command, params)
  end
end

Capybara::Selenium::ChromeDriver.prepend(Chrome158StorageReset)

class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  driven_by :selenium, using: :headless_chrome, screen_size: [ 1400, 1400 ]
end
