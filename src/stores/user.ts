import { defineStore } from "pinia";
import testData from "../testOptions/testData.json";
import type { RankedRun, Game, Category } from "src-ts/lib/types";
import type { FinalRun } from "@/types/types";

export interface UserState {
  apiKey: string;
  runs: FinalRun[];
}

const initialState: UserState = {
  //TODO: Change this!!
  apiKey: testData.apiKey,
  runs: [],
};

export const useUserStore = defineStore("user", {
  state: () => initialState,
  actions: {
    async fetchRuns() {
      const options = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "User-Agent": "VojtasRuns/1.0",
        },
      };
      try{
        this.runs = await fetch(
          "https://www.speedrun.com/api/v1/users/vojtas131/personal-bests",
          options
        ).then(async (response) => {
          const responseJson = (await response.json()).data as RankedRun[];
          console.log(responseJson);
          return await Promise.all(
            responseJson.map(async (x) => {
              return {
                id: x.run.id,
                game: await fetch(
                  "https://www.speedrun.com/api/v1/games/" + x.run.game,
                  options
                ).then((response) =>
                  response
                    .json()
                    .then((value) => (value.data as Game).names.international)
                ),
                category: await fetch(
                  "https://www.speedrun.com/api/v1/categories/" + x.run.category,
                  options
                ).then((response) =>
                  response.json().then((value) => (value.data as Category).name)
                ),
                link: x.run.videos?.links[0].uri,
                comment: x.run.comment,
                time: x.run.times.primary_t,
              };
            })
          );
        });
      } catch(e){
        console.log(e);
        return e;      
      }
    },
  },
  getters: {

  },
});
