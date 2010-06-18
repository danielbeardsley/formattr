require 'rubygems'
require 'sinatra'
require 'rdoc/rdoc'
require 'rdoc/markup/to_html'
require 'haml'

get '/' do
	haml :index
end

post '/rdoc' do
	h = RDoc::Markup::ToHtml.new
	h.convert(params[:input])
end