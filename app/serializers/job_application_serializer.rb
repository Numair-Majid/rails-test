# frozen_string_literal: true

class JobApplicationSerializer < ActiveModel::Serializer
  attributes :id, :status

  belongs_to :job
  belongs_to :user
end
