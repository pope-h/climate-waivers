import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const ClimateWaiverModule = buildModule("ClimateWaiverModule", (m) => {
  const disaXta = m.contract("DisaXta");
  const climateWaiverEscrow = m.contract("ClimateWaiverEscrow", [disaXta]);

  return { disaXta, climateWaiverEscrow };
});

export default ClimateWaiverModule;
