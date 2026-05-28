export {};

declare global {
  interface Window {
    electronAPI: {
      getAnimeList: (
        query: string,
        type: string
      ) => Promise<any>;
    };
  }
}