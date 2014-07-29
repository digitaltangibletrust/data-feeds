server "23.253.39.180", :app, :web, :db, :primary => true
set :deploy_to, "/var/www/data-feeds"
set :branch, "master"
set :node_env, "production"
