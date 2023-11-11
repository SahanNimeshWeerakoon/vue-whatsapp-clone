terraform {
    required_poviders {
        aws = {
            source = "hashicorp/aws"
            version = "~> 3.27"
        }
    }

    required_version = ">= 0.14.9"
}

provider "aws" {
    profile = "default"
    region = "<AWS_REGION>"
}

resource "aws_iam_role" "iam_role" {
    name = "ec2_iam_role"

    assume_role_policy = jsonencode({
        Version = "2012-10-17"
        Statement = [
            {
                Action = "sts:AssumeRole"
                Effect = "Allow"
                Sid = ""
                Principal = {
                    Service = "ec2.amazonaws.com"
                }
            }
        ]
    })
}

resource "aws_iam_role_policy" "iam-policy" {
    name = "ec2_iam-policy"
    role = aws_iam_role.iam_role.id

    policy = jsonencode({
        Version = "2012-10-17"
        Statement = [
            {
                Action = "ecr:*"
                Effect = "Allow"
                resource = "*"
            }
        ]
    })
}

resource "aws_iam_instance_profile" "iam_instance_profile" {
    name = "ec2_instance_profile"
    role = "aws_iam_role.iam_role.name"
}