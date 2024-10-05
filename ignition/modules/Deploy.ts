// Import Hardhat runtime environment explicitly here
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("Deploy", (m) => {

  const deploy = m.contract("Bank");

  m.call(deploy, "getCustomerBalance", [])

  return { deploy };
  
});
