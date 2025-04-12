# React-Router-Vite-Rails

This is an example web application that is built using the react_router_rails_spa gem.

- [Jump to read how to build it](#how-it-is-built)
- [See this example app deployed using Kamal](https://rrrails.castle104.com)

## How to Use

* Download the GitHub respository.
* Install dependencies with `bundle install`
* Start the Ruby on Rails application with `bin/dev`
* Build the React application with `bin/rails react:preview`
* Access `http://localhost:3000`

If you want to use the React Router development server with HMR, instead of building the React application, run the development server with `bin/rails react:dev`.
Then access the page with ``http://localhost:5173/react`.
Note that you will not be able to switch between ERB and React pages with the React Router development server.

## Features

### Integrated Client-side Routing

The react_router_rails_spa gem uses React Router in SPA framework mode and includes client-side routing.
It also integrates loader-based fetching.
Loader-based fetching allows parallel loading of code-split fragments and page data, ensuring that code-splitting does not cause decrease performance due to request waterfalls.

### Automatic Code-splitting

When you build the React Router application using `bin/rails react:build`, you can see how the whole application is deployed inside the Rails' `public` folder. 
You can also see how the application has been split into multiple files.
Note that each route has been automatically code-split, using information from the integrated router and without manual configuration.
This will ensure that even when you application grows to hundreds of pages, the initial page load will remain fast.

### Ease of Deployment

NPM package installation and the React Router build step are integrated into the `bin/rails assets:precompile` task.
Artifacts are stored inside the Ruby on Rails `public` folder.

This means that production server configuration and CD scripts do not need any special configuration.
We deploy using Kamal and you can confirm that there are not special build steps in the `Dockerfile`.

### Integration with ERB views

This demo includes ERB views and a simple authentication implementation.
Note how you can easily switch between ERB and React views and that they share authentication.

### SEO-optimized Pages with ERB

ALthough you may not need SEO for the React pages, you still may want your landing page and some marketing pages to be SEO-friendly.

In this application, I have create the top page with ERB so that it will render HTML server-side and can be optimized for SEO.
