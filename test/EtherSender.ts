import { loadFixture } from "@nomicfoundation/hardhat-network-helpers"
import { ethers } from "hardhat"
import { expect } from "chai"
import "@nomicfoundation/hardhat-chai-matchers"

describe("EtherSender", () => {
  const deploy = async () => {
    const [owner, addr1] = await ethers.getSigners()
    const EtherSender = await ethers.getContractFactory("EtherSender")
    const etherSender = await EtherSender.deploy()
    await etherSender.waitForDeployment()
    return { owner, addr1, etherSender}
  }

  it("should return the correct balance of the owner", async () => {

    const {owner, etherSender} = await loadFixture(deploy) 

    const ownerAddress = await owner.getAddress()
    const ownerBalance = await ethers.provider.getBalance(ownerAddress)
    const balance = await etherSender.balanceOf()
    expect(balance.toString()).to.equal(ownerBalance.toString())

  })

  it("Should revert if the sender tries to send more Ether than they have", async () => {

    const {owner, etherSender} = await loadFixture(deploy) 

    const ownerAddress = await owner.getAddress()
    const ownerBalance = await ethers.provider.getBalance(ownerAddress)

    // Пробуем отправить больше, чем у отправителя на балансе

    const excessiveAmount = ownerBalance.toString();
    const excessiveAmountPlusOne = (BigInt(excessiveAmount) + BigInt(1)).toString()

    await expect(
      etherSender.transferEther(ownerAddress, excessiveAmountPlusOne)
    ).to.be.revertedWithCustomError(etherSender, "WithdrawalAmountExceedsBalance")

  })

  it("Should send ether correctly", async () => {

    const {owner, addr1, etherSender} = await loadFixture(deploy) 

    const recipientAddress = await addr1.getAddress()
    const recipientBalance = await ethers.provider.getBalance(recipientAddress)

    const sendAmount = BigInt(1)

    await etherSender.connect(owner).transferEther(recipientAddress, sendAmount.toString(), { value: sendAmount.toString() })

    const finalRecipientBalance = await ethers.provider.getBalance(recipientAddress)
    expect(BigInt(finalRecipientBalance.toString())).to.equal(BigInt(recipientBalance.toString()) + sendAmount)

  })

})