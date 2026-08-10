import { liveDarshans } from "@/data/products";
import type { LiveDarshan } from "@/types/products";

export const LiveDarshanService = {
  getStreams: (): LiveDarshan[] => {
    return liveDarshans;
  },

  getStreamById: (id: string): LiveDarshan | undefined => {
    return liveDarshans.find((ld) => ld.id === id);
  }
};
