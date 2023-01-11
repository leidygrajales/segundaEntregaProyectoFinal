const configs = {
    mongodb: {
        connectionString: 'mongodb://127.0.0.1:27017/ecommerce'
    },
    mysql: {
        client: 'mysql',
        connection: {
            host: '127.0.0.1',
            user: 'root',
            port: 3306,
            database: 'ecommerce'
        }
    },
    sqlite3: {
        client: 'sqlite3',
        connection: {
            filename: './src/DB/ecommerce.sqlite'
        }
    },
    fylesystem: {
        path: ''
    },
    firebase: {
        type: 'service_account',
        project_id: 'ecommerce-3001',
        private_key_id: 'f10cfe81c9ee1a799586428f9fdb3ac85e7e4fbd',
        private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC3O+ezRZi5R1pp\nzDeT2PaH1r6WD0n7eJQSCUGGf1vN6Q9v5JKcAEnAKcDxIuTxmEj65xkJJTc3m56K\nJ3w3MoloREkvAyuAIM37NMYLhVcjYEXkoWYu99BfJ3Z+Ohd/fsC+EWxcyjq5sbzl\n3j4pmfNc+rwJwj+VOQfMuJWVmVS9q8P8VOkcSPkzuNxrdWDWMOgSYKx5RUIc8EYF\nGL0kRkeuO8Ld1csEzscz0qUrAgWkgtIdtdBYISmfXI1O0c99y7McEG5CYpibHDMT\nwvFQZ1pVRL8++F1NSaI1L5c8ZSI7w3/tLwNVROSJJiTNkjiAW/LD/DCI7M1YeHme\n/zXoILBLAgMBAAECggEASBBgZQpXMW9VqMxvg09OTkhv9naW4zceDSXkxm/qfEZQ\nEvKzknUujEwfnPbbUgVRlpQzLXychdtHdBBpcxAGKKLKoZm+jwrX2Bd+WGOdzMT9\nWBj+JjTCl9neaXCRc0w3o8kYdDn49LVplIJesl/g7c2TDMd/2EFwxtxFwGtof5uW\nmh6H5fpaUBSsUn9rSLW0YTfMIqAhSJAEpPgZ1UI4R57OJRna+6k6bN2FFMw/h0oq\njbkoFYjH00ws7xZaDg08TNuoQABfDjJaT7mWP3kMYDGD1GSgm33Sdc4ufPW0SS35\n0mJXEoCk/NM2yGRZri7td/bm8DN9a/5UAk6v9Vn3uQKBgQDoAfym2Cs+P1IwZ9s3\nxkZCIG9qOX2RoKDM9dI72yA+5kUZcHBipBAWl3VPdLvxBBV9YvRgqj+X2UXgvEjx\nrP1sQ6BnGx5YCVobuETP5UCpeAxMhtXcHkh+e7S1S5LtKvfwVqrM5xXXxujlpoSo\nIoO249d2Txidz2A0zc+tvvSu1wKBgQDKLrcmZsbU1+fvLFsu3wVdXK5VL3qT0xgb\n+eJaBUMZqEd92ypuF/rtX95iGByUvEyyFRxgYwi88qdnBnMLUg8t9vCEvQG8gad3\n2NY9Dxt9LNFF77NLesMk0h188x0QKLgQbHPPZ/+37xSod3EupjQ1aSxL8t6gyVkb\nBsW7gmmfrQKBgCunLA2MgN5udZ1r/SBKay/IAI6hEJJVAcxuuEbQ3QlYtEmsEUlO\nC0Tk7IqtsSsRFKYJ92c0wVBl7jLx2lu2q9wyAT1FKflwkQbELhZb0UXRs6a2fAi1\nnfhGeGLgPF3phssu02ZIWKDH6UxEf5NPIy9HQWQeT8hpm3V0AA517n3zAoGBALC2\nbgwZbpXf8+8/BJ+N/EFi3VjFO8zyhzMEkIt/5+sIAxyEr6w0N3S8A0IXsvtpLVvF\nSd0REjUbnadVor31RiE1oXlTPa5GYFpG4tHRX4Rj5LHM1RgWv3NyVqW8U92oyWBJ\neluAmahpRdQNOZa9XAqG11m2eFFuSvxtSewfCzStAoGAEbaQSa6CXpQtieZ3bntS\nA/TKJF3xbGCM1zeKbW7aPTk4KTIXwwx6qXneaV2KXODbQtWNPi+Mp5J/FafgFK6C\nIrz+QOyJj91CQpsr1XLmbfW7Sc/SrxL+g+5bTxplXsF2rkKp5WDB1oIzCZeNK8Jg\nv0Ips69YYh5tyZnEhb3MbJA=\n-----END PRIVATE KEY-----\n',
        client_email: 'firebase-adminsdk-7hltg@ecommerce-3001.iam.gserviceaccount.com',
        client_id: '109942821649994718665',
        auth_uri: 'https://accounts.google.com/o/oauth2/auth',
        token_uri: 'https://oauth2.googleapis.com/token',
        auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
        client_x509_cert_url: 'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-7hltg%40ecommerce-3001.iam.gserviceaccount.com'
    },
}

export default configs