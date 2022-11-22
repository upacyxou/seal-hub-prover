# Running SealHub Prover on Google Cloud Platform

1. Go to [Google Cloud Console (Compute Engine API)](https://console.cloud.google.com/compute/instances) and press the "ENABLE" button if it isn't yet enabled (it might ask you to also create and enable billing)
2. Press the "CREATE INSTANCE" button
3. Select the following options (keep others as default):
   | Option | Value |
   | --------------------------------------- | ------------- |
   | Machine Configuration -> Machine Family | e2-standard-2 |
   | Firewall -> Allow HTTPS | Checked (yes) |
4. Press the "CREATE" button
5. Press the "SSH" button on the created instance
6. Run the following script:

```bash
curl -o- https://raw.githubusercontent.com/BigWhaleLabs/seal-hub-prover/main/scripts/install.sh | bash
```

# TODO: how to get the URL of the prover now?

# TODO: how to set my own domain name?
