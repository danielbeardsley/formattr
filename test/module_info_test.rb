require 'main'
require 'test/unit'
require 'rack/test'

set :environment, :test

class HelloWorldTest < Test::Unit::TestCase
  include Rack::Test::Methods

  def app
    Sinatra::Application
  end

  def test_rdoc_on_single_word
    post '/rdoc', :input => "one_word"
    assert last_response.ok?
    assert_equal "<p>\none_word\n</p>\n", last_response.body
  end
end