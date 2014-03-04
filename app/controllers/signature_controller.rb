class SignatureController < ApplicationController
  def signature
    params_to_sign = params.except(:action, :controller).merge(timestamp: Time.now.to_i)

    render json: {
      timestamp: params_to_sign[:timestamp],
      api_key: Cloudinary.config.api_key,
      signature: Cloudinary::Utils.api_sign_request(params_to_sign, Cloudinary.config.api_secret)
    }
  end
end
