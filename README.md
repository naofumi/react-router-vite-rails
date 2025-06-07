# React-Router-Vite-Rails

This is an example web application built using the [react_router_rails_spa gem](https://rubygems.org/gems/react_router_rails_spa).
It demonstrates a typical structure of a React Router SPA mode application with Ruby on Rails integration.

Please read more about the [react_router_rails_spa gem](https://rubygems.org/gems/react_router_rails_spa)
to understand how the integration works.

In addition to having a simple setup procedure, using an SPA framework like React Router has multiple UI/UX benefits.  

- [See this example app deployed using Kamal](https://rrrails.castle104.com)

## Development set up

These are the steps to get the current repository running on your machine.

* Download the GitHub respository.
* Install dependencies with `bundle install`
* Start the Ruby on Rails application with `bin/dev`
* Build the React application with `bin/rails react_router:preview`
* Access `http://localhost:3000`

If you want to use the React Router development server with HMR, instead of building the React application, run the development server with `bin/rails react_router:dev`.
Then access the page with ``http://localhost:5173/react`.
Note that you will not be able to switch between ERB and React pages with the React Router development server.

## Deployment

Follow the steps
described in the [react_router_rails_spa gem README](https://github.com/naofumi/react_router_rails_spa).

Well, actually,
deployment builds on top of `bin/rails assets:precompile`
so there is nothing special to do here except maybe install Node in your CI/CD if you have not already.

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

It also eliminates fidgety and distracting flicker often seen in SPAs due to stepwise loading of multiple elements.

In short, embracing loader-based fetching will improve the UI/UX of your application.

### Automatic Code-splitting

When you build the React Router application using `bin/rails react_router:build`, the whole application is code-split and deployed inside the Rails' `public` folder. 
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
(This works on preview or production builds)

This is possible because the React application lives inside the Rails `public` folder
and shares the same domain and hence cookies. 

### SEO-optimized Pages with ERB

In dynamic React-based applications, you are often faced with two choices:

- Leveraging server-side rendering (SSR) for SEO optimization (e.g., with frameworks like Next.js)
- Deploying a simple static SPA

However, this is a false dichotomy — you can have your cake and eat it too.

The solution is to use traditional server-side rendered pages for SEO pages (i.e., ERB).
For other pages, you can use a React SPA.

### Reduce flicker with loaders

Flickering is a common issue with React applications and in particular SPAs.

With React Router SPA framework mode, you can eliminate flicker by loading data in the loaders.
This demo provides two identical pages that differ by loading strategy only.
You can compare the UX of a flicker-less page using a loader,
and a flickering page built in the traditional way with useEffect.

### Layouts for global state management

SPA applications often store information in global state.
For example, you might store information about the logged-in user (typically from a `/me` endpoint),
theme, locale, feature toggles
(flags) etc.

However, React Router SPA framework mode's layout feature offers a simpler alternative.
React Router's `useRouteLoaderData()` gives you access to any active layout's loader data, 
which makes it available to any component using that layout.
You can use it as a layout-scoped global state manager.

Furthermore, loader data is automatically requested, cached, and revalidated, simplifying life cycle management.
