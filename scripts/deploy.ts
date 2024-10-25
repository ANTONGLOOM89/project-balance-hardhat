import { ethers } from "hardhat"

async function main() {
  const EtherSender = await ethers.getContractFactory("EtherSender")
  const etherSender = await EtherSender.deploy()
  await etherSender.waitForDeployment()

  const contractAddress = await etherSender.getAddress()

  console.log(`EtherSender deployed to: ${contractAddress}`)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
});


