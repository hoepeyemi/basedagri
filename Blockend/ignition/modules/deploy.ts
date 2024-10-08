import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const LockModule = buildModule("LockModule", (m) => {

  const name = "EcoToken";
  const symbol = "ETK";
  const initialSupply = 1000;

  const token = m.contract("Recylox", [name, symbol, initialSupply]);

  const contractAddr = m.contract("Recycle", [name, symbol, initialSupply]);



  return { token, contractAddr };
});

export default LockModule;
