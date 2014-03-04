class HomeController < ApplicationController
  def index
    response.headers['Access-Control-Allow-Origin'] = '*'
  end
end
