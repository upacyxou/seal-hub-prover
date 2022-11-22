# SealHub Prover code

The centralized prover that is used to generate ZK proofs for SealHub

## Deploying to cloud

[![Deploy to DO](https://www.deploytodo.com/do-btn-blue.svg)](https://cloud.digitalocean.com/apps/new?repo=https://github.com/BigWhaleLabs/seal-hub-prover/tree/main)

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/BigWhaleLabs/seal-hub-prover/tree/main)

## Google Cloud

Visit [this tutorial](./docs/gcp.md) for Google Cloud installation

## Amazon AWS

Visit [this tutorial](./docs/aws.md) for Amazon AWS installation

## Any VPS with `apt` package manager

> ⚠️ Make sure your machine has at least 8GB of RAM

1. Make the `1337` port on the VPS accessible to the internet
2. Run the following command to download and launch the prover:

```bash
curl -o- https://raw.githubusercontent.com/BigWhaleLabs/seal-hub-prover/scripts/install.sh | bash
```

## Local launch

### Without Docker

1. Clone this repo: `git clone https://github.com/BigWhaleLabs/seal-hub-prover`
2. Launch the [mongo database](https://www.mongodb.com/) locally
3. Create `.env` with the environment variables listed below
4. Run `yarn` in the root folder
5. Run `yarn download-zk-files` for all ZK files
6. Run `yarn start`

### Using Docker

1. Clone this repo: `git clone https://github.com/BigWhaleLabs/seal-hub-prover`
2. Create `.env` with the environment variables listed below
3. Run `yarn docker-start-development` or `yarn docker-start-production`

## Environment variables

| Name     | Optional | Description                                                       |
| -------- | :------: | ----------------------------------------------------------------- |
| `MONGO`  |    ✅    | URL of the mongo database (defaults to `mongodb://mongodb:27017`) |
| `PORT`   |    ✅    | Port to run server on (defaults to `1337`)                        |
| `DOMAIN` |    ✅    | The domain for Docker (must point at the VPS)                     |

Also, please, consider looking at `.env.sample`
