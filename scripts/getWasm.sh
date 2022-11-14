mkdir zkp
curl https://bwl-zk.s3.amazonaws.com/ECDSAChecker.wasm -o zkp/ECDSAChecker.wasm
curl https://bwl-zk.s3.amazonaws.com/ECDSAChecker_final.zkey -o zkp/ECDSAChecker_final.zkey
curl https://bwl-zk.s3.amazonaws.com/ECDSAChecker_verification_key.json -o zkp/ECDSAChecker_verification_key.json