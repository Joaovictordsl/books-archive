resource "aws_s3_bucket" "bucket" {
  bucket = "my-s3-bucket-books-archive"
  region = "us-east-1"

  tags = {
    Name = "S3 bucket"
    Provisioned = "Terraform"
  }
}
