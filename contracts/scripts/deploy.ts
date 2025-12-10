import hre from "hardhat"; // 1. Sửa dòng này: Import toàn bộ đối tượng hardhat

async function main() {
  console.log("---------------------------------------------");
  console.log("Dang ket noi mang IOTA EVM Testnet...");

  // 2. Sửa dòng này: Dùng hre.ethers thay vì ethers đứng một mình
  const attendance = await hre.ethers.deployContract("Attendance");

  console.log("Dang gui transaction deploy...");

  await attendance.waitForDeployment();

  const address = await attendance.getAddress();

  console.log("---------------------------------------------");
  console.log("✅ DEPLOY THANH CONG!");
  console.log(`👉 Dia chi Contract: ${address}`);
  console.log("---------------------------------------------");
  console.log("Hay copy dia chi tren vao file .env cua Frontend nhe!");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
