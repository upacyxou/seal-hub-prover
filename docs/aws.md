# Running SealHub Prover on Amazon Web Services

1. Go to [AWS EC2 console](https://us-east-1.console.aws.amazon.com/ec2/)
2. Press the "Launch instance" button and select "Launch instance"
3. Select the following options (keep others as default):
   | Option | Value |
   | ------------------- | -------------------- |
   | Application and OS images | Ubuntu |
   | Instance type | `t2.large` or better |
   | Network settings -> "Allow HTTPS traffic from the internet" | Checked |
   | Key pair (login) | "Proceed without a key pair" |
4. Wait until instance loads and press the "Connect to instance" button
5. Make sure that "EC2 Instance Connect" is selected and press the "Connect" button (you might need to wait for the instance to start, otherwise you will see an error)
6. Run the following script:

```bash
curl -o- https://raw.githubusercontent.com/BigWhaleLabs/seal-hub-prover/main/scripts/install.sh | bash
```

7. Note the prover URL that will be displayed in the end, this is the URL you will use at [SealHub](https://hub.sealc.red)

> ⚠️ Don't forget to terminate the instance after you generated the ZK proof so that you don't get a surprise bill from AWS.
