# Company Website

This repository contains the website [shiftcrypto.ch](https://shiftcrypto.ch), which is built with [Jekyll](https://jekyllrb.com).

## Setup

1. Install (or upgrade) [Ruby](https://www.ruby-lang.org) (`brew install ruby` with [Homebrew](https://brew.sh) on macOS).
2. Extend the `PATH` to include the gems directory (like `export PATH="/usr/local/opt/ruby/bin:/usr/local/lib/ruby/gems/2.6.0/bin:$PATH"` in your [bash initialization script](https://en.wikipedia.org/wiki/Unix_shell#Configuration_files)).
3. Install [Bundler](https://bundler.io) and replace a potentially existing installation: `gem install bundler`.
4. Install all Ruby dependencies in the root directory of this repository: `bundle install --path vendor/bundle`.
5. Serve the website from the root directory of this repository: `bundle exec jekyll serve --livereload`.
6. In case you just want to build the site to the `_site` folder (to check for errors): `bundle exec jekyll build`.
