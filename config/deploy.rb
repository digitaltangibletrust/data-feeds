require "bundler/capistrano"
require "capistrano/ext/multistage"

set :application, "data-feeds"
set :scm, "git"
set :repository, "git@github.com:digitaltangibletrust/data-feeds.git"
set :branch, "staging"
set :deploy_to, "/var/www/data-feeds"
set :deploy_via, :copy
set :copy_strategy, :checkout
set :keep_releases, 5
set :use_sudo, false
set :copy_compression, :gzip
set :normalize_asset_timestamps, false
set :document_root, "/var/www/data-feeds"
set :ssh_options, {:forward_agent => true}
set :user, "bitcoin"
set :stages, ["staging", "production"]
set :default_stage, "staging"

namespace :deploy do
    task :start, :roles => :app do
        run "cd #{current_path} && NODE_ENV=#{node_env} pm2 startOrRestart pm2_run.json"
    end

    task :stop, :roles => :app do
        run "cd #{current_path} && NODE_ENV=#{node_env} pm2 stop pm2_run.json"
    end

    task :restart, :roles => :app do
        start
    end

    task :npm_install, :roles => :app do
        run "cd #{release_path} && node -v && NODE_ENV='' npm cache clean && NODE_ENV='' npm install"
    end
end

after "deploy:update", "deploy:cleanup"
after "deploy:update_code", "deploy:npm_install"

