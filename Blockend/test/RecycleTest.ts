import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre, { ethers } from "hardhat";

describe("Lock", function () {
  async function deployToken() {
    const [owner] = await hre.ethers.getSigners();

    const name = "EcoToken";
    const symbol = "ETK";
    const initialSupply = 1000;

    const Token = await hre.ethers.getContractFactory("Recylox");
    const token = await Token.deploy(name,symbol,initialSupply);

    return {token};
  }

  async function deployContract() {
    const [owner] = await hre.ethers.getSigners();

    const {token} = await loadFixture(deployToken);

    const Contract = await hre.ethers.getContractFactory("Recycle");
    const recycle = await Contract.deploy(token);

    return {recycle};
  }

  describe("registerCompany", function () {
    it("Should check if minWeightRequirement != 0", async () => {
      const [owner, acc1] = await ethers.getSigners();

      const recycle = await loadFixture(deployContract);
      const name = "CompanyA";
      const minWeightRequirement = 1;
      const maxPricePerKg = 10;
      const active = true;

      expect(await recycle.recycle.registerCompany(name,minWeightRequirement, maxPricePerKg,active)).to.be
      .revertedWith(
        "Recycle: Sorry you can't register twice edit your info if you wish to"
      );
    });

    it("Should check if nameLength != 0", async () => {
      const [owner, acc1] = await ethers.getSigners();

      const recycle = await loadFixture(deployContract);
      const name = "";
      const minWeightRequirement = 1;
      const maxPricePerKg = 10;
      const active = true;

      await expect(recycle.recycle.registerCompany(name,minWeightRequirement, maxPricePerKg,active)).to.be
      .revertedWith(
        "Recycle: Please enter a company name"
      );
    });

    it("Should check if maxPricePerKg > 0", async () => {
      const [owner, acc1] = await ethers.getSigners();

      const recycle = await loadFixture(deployContract);
      const name = "CompanyA";
      const minWeightRequirement = 1;
      const maxPricePerKg = 0;
      const active = true;

      await expect(recycle.recycle.registerCompany(name,minWeightRequirement, maxPricePerKg,active)).to.be
      .revertedWith(
        "Recycle: set price must be greater than zero"
      );
    });

    it("Should emit CompanyRegistered event", async () => {
      const [owner, acc1] = await ethers.getSigners();

      const recycle = await loadFixture(deployContract);
      const name = "CompanyA";
      const minWeightRequirement = 1;
      const maxPricePerKg = 10;
      const active = true;

      const tx = await recycle.recycle.registerCompany(name,minWeightRequirement, maxPricePerKg,active);

      await expect(tx).to.emit(recycle.recycle, "CompanyRegistered")
      .withArgs(owner.address, name, minWeightRequirement, maxPricePerKg, active);
    });
  });

  describe("Tests", function () {
    // it("Should get companies addresses", async () => {
    //   const [owner, acc1] = await ethers.getSigners();

    //   const recycle = await loadFixture(deployContract);
    //   const addresses = [];

    //   expect(await recycle.recycle.companyAddresses([])).length.to.be.equal(addresses.length);
    // });
  });
});
