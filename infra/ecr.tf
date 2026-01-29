resource "aws_ecr_repository" "ecr" {
  name                 = "ecr-repo"
  image_tag_mutability = "MUTABLE"

  tags = {
    Name        = "books-archive-terraform"
    Provisioned = "Terraform"
  }
}
