# ERC20 Token Bridge

🚀 A cross-chain bridge enabling ERC20 token movement between **Sepolia** and **Curtis** by locking and minting wrapped tokens. Since direct ERC20 transfers between chains aren’t possible, this bridge offers a seamless workaround for cross-chain transactions.

## 🔹 How It Works?

1️⃣ **Lock** your ERC20 tokens on **Sepolia**.\
2️⃣ **Node.js** listens for the lock event, stores the log in **MongoDB**, and interacts with the contract on **Curtis**.\
3️⃣ Receive equivalent **W-Tokens (wrapped tokens)** on **Curtis**.\
4️⃣ Use **W-Tokens** on **Curtis** for transactions.\
5️⃣ **Burn** W-Tokens on **Curtis** when you want to retrieve your original tokens.\
6️⃣ **Node.js** listens for the burn event, stores the log, and interacts with the contract on **Sepolia**.\
7️⃣ **Unlock** your original tokens on **Sepolia**.

## 🔹 Tech Stack

- **Smart Contracts:** Solidity
- **Backend:** Node.js, MongoDB
- **Frontend:** React.js, Wagmi

## 💡 Role of Node.js

✅ **Event Listener:** Monitors lock & burn events on both blockchains.\
✅ **Database Management:** Stores logs in **MongoDB** for efficient tracking.\
✅ **Smart Contract Interaction:** Triggers smart contract functions based on stored logs.\
✅ **Cross-Chain Automation:** Ensures **secure & automated** token transfers between Sepolia & Curtis.

## 🛠 Setup Instructions

### 1. Backend Setup

#### Install dependencies:

```sh
npm install
```

#### Start the backend:

```sh
node index.js 
```

### 2. Frontend Setup

#### Install dependencies:

```sh
npm install
```

#### Run the frontend:

```sh
npm run dev
```

## ⚙️ Environment Variables

Ensure to configure your `.env` file with the required details before running the project.

---

🚀 **Seamless Cross-Chain Transactions Start Here!** 🔥

