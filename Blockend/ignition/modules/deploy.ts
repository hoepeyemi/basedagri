import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ContractsModule = buildModule("BasearpsagricModule", (m) => {

  const name = "EcoToken";
  const symbol = "ETK";
  const initialSupply = 1000;

  const token = m.contract("Recylox", [name, symbol, initialSupply]);

  const contractAddr = m.contract("Recycle", [token]);



  return { token, contractAddr };
});

export default ContractsModule;
