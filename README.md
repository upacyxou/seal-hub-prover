# SealHub Prover code

Proof generator for SealHub.

## Installation and local launch

1. Clone this repo: `git clone https://github.com/BigWhaleLabs/seal-hub-prover`
2. Launch the [mongo database](https://www.mongodb.com/) locally
3. Create `.env` with the environment variables listed below
4. Run `yarn` in the root folder
5. Run `yarn download-zk-files` for all ZK files
6. Run `yarn start`

## Using docker

1. Create `.env` with the environment variables listed below
2. Run `yarn docker-start-development` or `yarn docker-start-production`

And you should be good to go! Feel free to fork and submit pull requests.

## Environment variables

| Name     | Description                                                                  |
| -------- | ---------------------------------------------------------------------------- |
| `MONGO`  | _(Optional)_ URL of the mongo database (defaults to mongodb://mongodb:27017) |
| `PORT`   | _(Optional)_ Port to run server on (defaults to 1337)                        |
| `DOMAIN` | _(Optional)_ Your domain for docker                                          |

Also, please, consider looking at `.env.sample`.
