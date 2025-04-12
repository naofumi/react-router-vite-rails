# React-Router-Vite-Rails

This is an example web application that is built using the react_router_rails_spa gem.

- [Jump to read how to build it](#how-it-is-built)
- [See this example app deployed using Kamal](https://rrrails.castle104.com)

## Features

### Artificial delay for all server routes

The example application simulates a slow server by adding a 2-second delay to all server routes.
This gives us a more realistic experience similar to what users might see in the real world.
Note that routes that don't need server connections will be instantaneous.

With a fast server and a fast network, even very poorly built applications will give you a very smooth and snappy application.
To understand the benefits of using an SPA framework, you need to simulate real-world conditions with a slower network and server.
This is why we built in the delay.

### Authentication

Running React as a static asset on a Ruby on Rails application makes it possible to share cookies,
and this greatly simplifies authentication.
To illustrate this,
I have provided a simple session-based authentication system in Rails and have used it from the React application.

* The ERB and the React pages share the same authentication. Logging in on one side automatically authenticates you on the other.
* This makes it particularly easy to have both ERB and React pages seemlessly co-exist on the same site.

### CSRF protection

Ruby on Rails provides robust CSRF protection using tokens.
This is very important when using session cookies for authentication.

The example application uses the [Cookie-to-header token](https://en.wikipedia.org/wiki/Cross-site_request_forgery#Cookie-to-header_token) approach.
The server sends the CSRF token in a cookie, which can be added to the header of any non-GET request.

Note that because we serve the bootstrap HTML template from a controller action,
the React application is guaranteed to have access to the CSRF token from the first load onwards.
This is convenient when the first loaded page contains a form
and needs a valid CSRF token from the onset to allow immediate submission.

### Deployment

NPM package installation and the React Router build step are integrated into the `bin/rails assets:precompile` task.
Artifacts are stored inside the Ruby on Rails `public` folder.

Since we tap into the asset pipeline commands,
your CI/CD setup will not need any additional configuration.

Note that if your CI/CD setup does not install Node, you need to add this.
