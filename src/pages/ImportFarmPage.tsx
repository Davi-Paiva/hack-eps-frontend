// src/pages/ImportFarmPage.tsx
import NavBar from "../components/NavBar/NavBar";
import ImportFarm from "../components/ImportFarm/ImportFarm";

export default function ImportFarmPage() {
  // Replace with your backend endpoint URL
  const backendEndpoint = "http://localhost:5000/init-farm"; 

  return (
    <>
      <NavBar />
      <ImportFarm endpoint={backendEndpoint} />
    </>
  );
}
