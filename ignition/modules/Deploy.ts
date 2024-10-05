// Import Hardhat runtime environment explicitly here
const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("Deploy", (m) => {

  const deploy = m.contract("Bank");

  m.call(deploy, "getCustomerBalance", [])

  return { deploy };
  
});


// Sepolia: 0xc0f734462b6A24e8EE72D872cb8B714b569657b1
// ScrollTestnet: 0x9FFdD45cc3A9C3844405449A27E33519A8DF8c8a
// Mantatestnet: 0x9FFdD45cc3A9C3844405449A27E33519A8DF8c8a
