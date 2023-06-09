<script lang="ts">

import { defineComponent, ref } from 'vue';
import { Provider, Web3Provider } from 'zksync-web3';
import { useWalletStore } from '../stores/wallet';

const zkSyncTestnet = "https://zksync2-testnet.zksync.dev";
const zkSyncLocal = "http://localhost:3050";

export default defineComponent({
  async mounted() {
    await this.checkNetwork();
  },
  computed: {},
  setup() {
    const walletStore = useWalletStore();
    // const targetNetwork = "zkSync Era testnet";
    const targetNetwork = import.meta.env.VITE_BLOCKCHAIN_NETWORK_NAME;
    // const targetNetworkId = "0x118";
    const targetNetworkId = import.meta.env.VITE_BLOCKCHAIN_NETWORK_ID;
    const network_ok = ref<boolean>(false);

    // checks if the current chain matches the target network
    const checkNetwork = async () => {
      // @ts-expect-error window.ethereum not typed
      if (window.ethereum) {
        // @ts-expect-error window.ethereum not typed
        const currentChainId = await window.ethereum.request({
          method: "eth_chainId",
        });

        if (currentChainId === targetNetworkId) network_ok.value = true;
      }
    };

    // switches network to the target network if on a different one
    const switchNetwork = async () => {
      // @ts-expect-error window.ethereum not typed
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: targetNetworkId }],
      });

      window.location.reload();
    };

    // checks network and connects Wallet
    const connectWallet = async () => {
      if (!network_ok.value) await switchNetwork();

      try {
        // @ts-expect-error window.ethereum not typed
        const data = await window.ethereum.request({
          method: "eth_requestAccounts",
        });

        console.log('data: ', data);

        const provider = new Provider(zkSyncLocal);
        // @ts-ignore
        const signer = new Web3Provider(window.ethereum).getSigner();
        walletStore.saveWalletData({ address: data[0], provider, signer, short_addr: 'test' });

        console.log('Dapp connected to your wallet: ', signer);

      } catch (error) {
        console.log('Error connecting to your wallet');
        console.log(error);
      }
    };

    return {
      connectWallet,
      walletStore,
      checkNetwork,
      switchNetwork,
      network_ok,
      targetNetwork,
    };
  },
});

</script>

<template>
  <button
    v-if="!network_ok"
    @click="switchNetwork()"
    class="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-pink-700"
  >Wrong network. Switch to {{ targetNetwork }}</button>

  <button
    v-else
    type="button"
    :disabled="walletStore.address != ''"
    :class="walletStore.address == '' ? 'hover:bg-indigo-600' : ''"
    @click="connectWallet()"
    class="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5 mr-2"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fill-rule="evenodd"
        d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z"
        clip-rule="evenodd"
      />
    </svg>
    <span class="">{{
      walletStore.address != ""
        ? `Connected Acc ${walletStore.address}`
        : `Connect Wallet`
    }}</span>
  </button>
</template>