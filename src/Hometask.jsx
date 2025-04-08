const tokenAbi = [
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",
    "function balanceOf(address owner) view returns (uint256)",
    "function transfer(address to, uint256 amount) returns (bool)"
];

import { useState, useEffect } from "react";
import { ethers } from "ethers";

const tokenAddress = "0xYourTokenAddress"; // Замените на адрес вашего токена

function TokenInteraction({ provider }) {
    const [tokenContract, setTokenContract] = useState();
    const [tokenName, setTokenName] = useState("");
    const [tokenSymbol, setTokenSymbol] = useState("");
    const [totalSupply, setTotalSupply] = useState(0);
    const [balance, setBalance] = useState(0);
    const [address, setAddress] = useState("");
    const [transferAmount, setTransferAmount] = useState("");

    useEffect(() => {
        if (provider) {
            const contract = new ethers.Contract(tokenAddress, tokenAbi, provider);
            setTokenContract(contract);
            fetchTokenData(contract);
        }
    }, [provider]);

    const fetchTokenData = async (contract) => {
        const name = await contract.name();
        const symbol = await contract.symbol();
        const supply = await contract.totalSupply();
        setTokenName(name);
        setTokenSymbol(symbol);
        setTotalSupply(supply.toString());
    };

    const fetchBalance = async () => {
        if (tokenContract && address) {
            const balance = await tokenContract.balanceOf(address);
            setBalance(balance.toString());
        }
    };

    const handleTransfer = async (evt) => {
        evt.preventDefault();
        if (tokenContract && address && transferAmount) {
            const tx = await tokenContract.transfer(address, ethers.utils.parseUnits(transferAmount, 18));
            await tx.wait();
            fetchBalance(); // Обновляем баланс после перевода
        }
    };

    return (
        <div>
            <h1>Token Interaction</h1>
            <div>
                <h2>Token Info</h2>
                <p>Name: {tokenName}</p>
                <p>Symbol: {tokenSymbol}</p>
                <p>Total Supply: {totalSupply}</p>
            </div>
            <div>
                <h2>Check Balance</h2>
                <input
                    type="text"
                    placeholder="Enter your address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <button onClick={fetchBalance}>Get Balance</button>
                <p>Balance: {balance}</p>
            </div>
            <div>
                <h2>Transfer Tokens</h2>
                <form onSubmit={handleTransfer}>
                    <input
                        type="text"
                        placeholder="Recipient address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                    <input
                        type="text"
                        placeholder="Amount"
                        value={transferAmount}
                        onChange={(e) => setTransferAmount(e.target.value)}
                    />
                    <button type="submit">Transfer</button>
                </form>
            </div>
        </div>
    );
}

export default TokenInteraction;