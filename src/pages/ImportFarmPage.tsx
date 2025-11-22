// src/pages/ImportFarmPage.tsx
import NavBar from "../components/NavBar/NavBar";
import ImportFarm from "../components/ImportFarm/ImportFarm";

export default function ImportFarmPage() {
  // Replace with your backend endpoint URL
  const backendEndpoint = "http://localhost:8000/api/farms/init-farm"; 

  return (
    <>
      <NavBar />
      <ImportFarm endpoint={backendEndpoint} />
    </>
  );
}
