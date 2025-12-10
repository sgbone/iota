import { ethers } from "hardhat";

async function main() {
  console.log("Dang deploy contract len IOTA EVM Testnet...");

  const attendance = await ethers.deployContract("Attendance");
  await attendance.waitForDeployment();

  const address = await attendance.getAddress();
  console.log(`Attendance Contract da deploy tai: ${address}`);

  // Lưu ý: Copy địa chỉ này dán vào file cấu hình frontend
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
