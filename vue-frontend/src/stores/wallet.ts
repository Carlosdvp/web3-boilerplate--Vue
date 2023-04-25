import { defineStore } from "pinia";

interface WalletData {
  address: string;
  short_addr: string;
  signer: object;
  provider: object;
}

export const useWalletStore = defineStore("wallet", {
  state: () => {
    return {
      address: " ",
      short_addr: "",
      provider: {},
      signer: {},
    }
  },

  actions: {
    // @ts-ignore
    saveWalletData(payload: WalletData) {
      this.address = payload.address;
      this.short_addr = `${payload.address.slice(0,2)}...${payload.address.slice(-4)}`;
      this.provider = payload.provider;
      this.signer = payload.signer;
    },
  },
});
