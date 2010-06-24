require 'rubygems'
require 'sinatra'
require 'rdoc/rdoc'
require 'rdoc/markup'
require 'rdoc/markup/to_html'
require 'haml'
require 'sass'
require 'bluecloth'

class FormatError < Exception
end

get '/' do
	haml :index
end

post '/rdoc' do
	h = RDoc::Markup::ToHtml.new
	h.convert(params[:input])
end

post '/sass' do
	begin
		sass(params[:input])
	rescue Sass::SyntaxError => err
		raise FormatError.new(err.message)
	end
end

post '/markdown' do
	BlueCloth::new(params[:input]).to_html
end

get '/*.css' do
	content_type 'text/css', :charset => 'utf-8'
	sass("/stylesheets/#{params[:splat].join}".to_sym)
end

error FormatError do
	env['sinatra.error'].message
end

set :show_exceptions, false