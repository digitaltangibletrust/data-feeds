server "162.209.59.235", :app, :web, :db, :primary => true
set :deploy_to, "/var/www/data-feeds"
set :branch, "staging"
set :node_env, "production"
