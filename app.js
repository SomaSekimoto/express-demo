require("dotenv").config();
const express = require("express");
const ethers = require("ethers");
const Contract = ethers.Contract;
const dappstakngAbi = require("./dappsstaking-abi.json");
const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  let provider = new ethers.providers.JsonRpcProvider("https://evm.astar.network/");
  let privateKey = process.env.PRIVATE_KEY;
  let wallet = new ethers.Wallet(privateKey);
  let walletAddress = wallet.address;
  let signer = provider.getSigner(walletAddress);
  const dappstakingAddress = "0x0000000000000000000000000000000000005001";
  const dappStakingContract = new Contract(dappstakingAddress, dappstakngAbi, provider).connect(signer);
  await dappStakingContract
    .read_era_reward("30")
    .then((res) => {
      console.log("response");
      console.log(res);
    })
    .catch((err) => {
      console.log("err occurred");
      console.log(err);
    });
  await dappStakingContract
    .read_current_era()
    .then((res) => {
      console.log("response");
      console.log(res);
    })
    .catch((err) => {
      console.log("err occurred");
      console.log(err);
    });
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
