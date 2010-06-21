require 'main'
require 'test/unit'
require 'rack/test'

set :environment, :test

class FormattingTest < Test::Unit::TestCase
  include Rack::Test::Methods

  def app
    Sinatra::Application
  end

  def test_rdoc_on_single_word
    post '/rdoc', :input => "one_word"
    assert last_response.ok?
    assert_equal "<p>\none_word\n</p>\n", last_response.body
  end

  def test_sass_on_single_word
    post '/sass', :input => <<-SASS
.class
	border:
		color: blue
SASS
    assert last_response.ok?
    assert_equal(<<-CSS, last_response.body)
.class {
  border-color: blue; }
CSS
  end
end