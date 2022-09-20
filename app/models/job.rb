class Job < ApplicationRecord
  has_many :job_applications, dependent: :destroy

  validates :title, uniqueness: true
  validates :title, :status, :description, presence: true

  enum status: { open: 0, closed: 1, draft: 2 }

  before_validation :generate_slug

  def generate_slug
    self.slug = title
  end
end
