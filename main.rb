require 'rdoc/rdoc'
require 'rubygems'
require 'sinatra'

require 'rdoc/markup/to_html'

post '/rdoc' do
	h = RDoc::Markup::ToHtml.new
  h.convert(params[:input])
end