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

	def test_markdown
		post '/markdown', :input => <<-MARKDOWN
Title
======
Body

- List
MARKDOWN
		assert last_response.ok?
		assert_equal(<<-HTML, last_response.body)
<h1>Title</h1>

<p>Body</p>

<ul>
<li>List</li>
</ul>
HTML
	end

	def test_format_error
		post '/sass', :input => "[some error]"
		assert_equal 500, last_response.status
		assert_not_nil last_response.body
	end
end