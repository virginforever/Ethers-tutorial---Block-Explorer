import { ethers } from "ethers";
import './App.css'
import BalanceReader from "./BalanceReader";
import BlockExplorer from "./BlockExplorer";
import VendingMachine from "./VendingMachine";

const providerUrl = 'http://77.51.210.148:48545/';
const provider = new ethers.JsonRpcProvider(providerUrl);
const network = await provider.getNetwork();

function App() {
  console.log(network);
  return (
  <VendingMachine
    provider={provider}/>
    
  )
}

export default App