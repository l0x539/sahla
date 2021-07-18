module.exports = {
    apps : [
        {
          name: "sahla",
          script: "yarn start",
          watch: true,
          increment_var : 'PORT',
          env: {
              "PORT": 3000,
              "NODE_ENV": "production",
              "MAIN_URL": "https://rixeld.com",
                "NODE_ENV": "production",
          }
        }
    ]
  }
