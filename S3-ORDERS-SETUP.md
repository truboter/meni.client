# S3 CORS Configuration for data.meni bucket

To allow the client to save orders to the `data.meni` S3 bucket, you need to configure CORS policy.

## CORS Configuration

Add this CORS configuration to the `data.meni` S3 bucket:

```json
[
  {
    "AllowedHeaders": ["*"],
    "AllowedMethods": ["GET", "PUT"],
    "AllowedOrigins": [
      "https://demo.meni.ge",
      "https://*.meni.ge",
      "http://localhost:*"
    ],
    "ExposeHeaders": ["ETag"],
    "MaxAgeSeconds": 3600
  }
]
```

## S3 Bucket Policy (Optional - for public write access to orders/)

If you want to allow public write access to the `orders/` folder without authentication:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::data.meni/*"
    },
    {
      "Sid": "PublicWriteOrders",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:PutObject",
      "Resource": "arn:aws:s3:::data.meni/orders/*"
    }
  ]
}
```

## AWS CLI Commands

```bash
# Set CORS configuration
aws s3api put-bucket-cors \
  --bucket data.meni \
  --cors-configuration file://cors-config.json

# Set bucket policy
aws s3api put-bucket-policy \
  --bucket data.meni \
  --policy file://bucket-policy.json
```

## Security Notes

- Orders can only be written to `orders/` folder
- Users can read any order if they know the exact orderId
- Users cannot list all orders (no ListBucket permission)
- Each order is identified by unique UID, making it hard to guess
