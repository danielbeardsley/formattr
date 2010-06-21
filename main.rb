require 'rubygems'
require 'sinatra'
require 'rdoc/rdoc'
require 'rdoc/markup'
require 'rdoc/markup/to_html'
require 'haml'
require 'sass'

get '/' do
	haml :index
end

post '/rdoc' do
	h = RDoc::Markup::ToHtml.new
	h.convert(params[:input])
end

get '/*.css' do
	content_type 'text/css', :charset => 'utf-8'
	sass("/stylesheets/#{params[:splat].join}".to_sym)
end

