<script setup lang="ts">

import { ref } from 'vue';
import { useWalletStore } from '../stores/wallet';
import { Contract, Provider, Web3Provider } from 'zksync-web3';
import * as Artifact from "../../../L2-zksync/artifacts-zk/contracts/Greeter.sol/Greeter.json";

const walletStore = useWalletStore();
let greet = ref("");

const GREETER_ADDRESS = "0xAf53230113dC96b9A22FF499C53dC1B4A6121640"; // this will need to be changed when I deploy my own contract

const btnUpdate = ref("Update greet");
const btnRead = ref("Read greet");
const newGreet = ref("");

const checkGreet = async () => {
  const provider = new Provider("https://zksync2-testnet.zksync.dev");
  // @ts-ignore
  const greeterContract = new Contract(GREETER_ADDRESS, Artifact.abi, provider);

  try {
    btnRead.value = "...";
    greet.value = await greeterContract.greet();
    btnRead.value = "Read greet";
  } catch (error) {
    console.error(error);
    btnRead.value = "Read greet";
  }
};

const setGreet = async () => {
  // @ts-ignore
  const greeterContract = new Contract(GREETER_ADDRESS, Artifact.abi, new Web3Provider(window.ethereum).getSigner());

  try {
    btnUpdate.value = "...";
    const tx = await greeterContract.setGreeting(newGreet.value);
    console.log("Transaction: ", tx);

    await tx.wait();
    btnUpdate.value = "Update Greet";

    checkGreet();
    newGreet.value = "";
  } catch (error) {
    console.error(error);
    btnUpdate.value = "Update Greet";
  }
};

</script>

<template>
  <div class="text-center pt-12 mx-auto max-w-xl">
    <h1 class="text-2xl mb-8">Interact with Greeter</h1>
    <div v-if="walletStore.address != ''" class="flex flex-col space-y-4">
      <p>Your wallet address is: {{ walletStore.address }}</p>
      <p>
        The message is:
        <span class="text-gray-900 font-medium">{{ greet }}</span>
      </p>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        @click="checkGreet"
      >
        {{ btnRead }}
      </button>
      <hr />
      <h2 class="text-xl font-bold">Updating the greeting</h2>
      <input
        class="border border-gray-200 px-4 py-2"
        type="text"
        placeholder="A new message"
        v-model="newGreet"
      />
      <button
        class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
        @click="setGreet"
      >
        {{ btnUpdate }}
      </button>
    </div>
    <p v-else class="text-red-600 font-medium">You've not connected your wallet yet</p>
  </div>
</template>
