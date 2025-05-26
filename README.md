# React-Router-Vite-Rails

This is an example web application that is built using the [react_router_rails_spa gem](https://rubygems.org/gems/react_router_rails_spa).

In addition to being very simple to set up, using an SPA framework like React Router has multiple UI/UX benefits.  

- [Jump to read how to build it](#how-it-is-built)
- [See this example app deployed using Kamal](https://rrrails.castle104.com)

## Development set up

These are the steps to get the current repository running on your machine.

* Download the GitHub respository.
* Install dependencies with `bundle install`
* Start the Ruby on Rails application with `bin/dev`
* Build the React application with `bin/rails react:preview`
* Access `http://localhost:3000`

If you want to use the React Router development server with HMR, instead of building the React application, run the development server with `bin/rails react:dev`.
Then access the page with `http://localhost:5173/react`.
Note that you will not be able to switch between ERB and React pages with the React Router development server.

## Deployment

Follow the steps
described in the [react_router_rails_spa gem README](https://github.com/naofumi/react_router_rails_spa).

Well, actually,
deployment builds on top of `bin/rails assets:precompile`
so there is nothing special to do here except maybe install Node in your CI/CD if you haven't already.

## Features

This demo application showcases some of the benefits
of integrating an SPA-framework like React Router, compared to the traditional way of integrating React with Rails
(with webpacker, esbuild, vite-rails, etc.)

### Integrated Client-side Routing

The [react_router_rails_spa gem](https://github.com/naofumi/react_router_rails_spa) uses React Router in [SPA framework mode](https://reactrouter.com/how-to/spa)
and integrates client-side routing (you do not have to install React Router yourself).

It also integrates loader-based fetching.
Loader-based fetching allows parallel loading of code-split fragments and page data,
ensuring that code-splitting does not cause decrease performance due to request waterfalls.
You can benefit from code-splitting without compromising on page-load performance.

It also eliminates fidgety and distracting flicker that is often seen in SPAs due to stepwise loading of multiple elements.

In short, embracing loader-based fetching will improve the UI/UX of your application.

### Automatic Code-splitting

When you build the React Router application using `bin/rails react:build`, the whole application is code-split and deployed inside the Rails' `public` folder. 
The table below shows the generated code-fragments.

Note that the code for each route has been split automatically, using information from the integrated router and without manual configuration.
This will ensure that even when your application grows to hundreds of pages, the initial page load will remain fast.

![Code Splitting](documentation/images/assets-compiled.png)

### Ease of Deployment

NPM package installation and the React Router build step are integrated into the `bin/rails assets:precompile` task.
Artifacts are stored inside the Ruby on Rails `public` folder.

This means that production server configuration and CD scripts do not need any special configuration.
The CI/CD build steps are described in the `Dockerfile`.

Please take a look and confirm that there are no additional steps compared to a regular Rails deployment.

### Integration with ERB views and Authentication

This demo includes ERB views and a simple authentication implementation.
Note how you can easily switch between ERB and React views and that they seamlessly share authentication status.

This is possible because the React application lives inside the Rails `public` folder
and shares the same domain and hence cookies. 

### SEO-optimized Pages with ERB

In dynamic React-based applications, you're often faced with two choices:
leveraging server-side rendering (SSR) for SEO optimization (e.g., with frameworks like Next.js)
or deploying a static SPA for the simplicity of serving static assets.
However, this dichotomy is false — you can, in fact, have your cake and eat it too.

As I mentioned above, you can easily integrate SEO-optimized, server-side rendered ERB pages with static React SPA pages.

For dynamic pages that need to be SEO-optimized, just use ERB and optionally use Hotwire for interactivity.
For other pages, you can use a React SPA that is hosted on the Rails `public` folder.

### Reduce flicker with loaders

Flickering is a common issue with React applications and in particular SPAs.

With React Router SPA framework mode, you can eliminate flicker by loading data in the loaders.
This demo provides two identical pages that differ by loading strategy only.
You can compare the UX of a flicker-less page using a loader,
and a flickering page built in the traditional way with useEffect.
