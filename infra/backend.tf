#terraform {
# backend "s3"{

#  bucket = "my-s3-bucket-johnny-books-archive"
#  region = "us-east-1"
#  key = "books-archive/terraform.tfsate"
#  encrypt = true
#
#  }
#}

resource "aws_s3_bucket" "bucket" {

  bucket = "my-s3-bucket-johnny-books-archive"

}
