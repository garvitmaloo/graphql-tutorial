import axios from "axios";

interface IAddHeroArgs {
  name: string;
  strength: string;
  weaponId?: number;
}

interface IAddWeapon {
  name: string;
  damage: string;
}

export const resolvers = {
  Query: {
    heroes: async () => {
      const { data } = await axios.get("http://localhost:3000/heroes");
      return data;
    },

    weapons: async () => {
      const { data } = await axios.get("http://localhost:3000/weapons");
      return data;
    },
  },

  Hero: {
    weaponDetails: async (parentValue: { weaponId: number }) => {
      const { data } = await axios.get(
        `http://localhost:3000/weapons/${parentValue.weaponId}`
      );
      return data;
    },
  },

  Mutation: {
    addHero: async (_: any, args: IAddHeroArgs) => {
      await axios.post("http://localhost:3000/heroes", {
        name: args.name,
        strength: args.strength,
        weaponId: args.weaponId ? args.weaponId : null,
      });

      const { data } = await axios.get("http://localhost:3000/heroes");

      return data;
    },

    updateHero: async (_: any, args: IAddHeroArgs & { id: number }) => {
      const { data } = await axios.get(
        `http://localhost:3000/heroes/${args.id}`
      );

      if (!data) return null;

      await axios.put(`http://localhost:3000/heroes/${args.id}`, {
        name: args.name,
        strength: args.strength,
        weaponId: args.weaponId ? args.weaponId : null,
      });

      const { data: allHeroes } = await axios.get(
        "http://localhost:3000/heroes"
      );

      return allHeroes;
    },

    deleteHero: async (_: any, args: { id: number }) => {
      const { data } = await axios.get(
        `http://localhost:3000/heroes/${args.id}`
      );

      // If no hero exists with given id -
      if (!data) return null;

      // Delete the data record
      await axios.delete(`http://localhost:3000/heroes/${args.id}`);

      // Once deleted, return the data record
      return data;
    },

    addWeapon: async (parentValue: any, args: IAddWeapon) => {
      await axios.post("http://localhost:3000/weapons", {
        name: args.name,
        damage: args.damage,
      });

      const { data: allWeapons } = await axios.get(
        "http://localhost:3000/weapons"
      );

      return allWeapons;
    },

    updateWeapon: async (
      parentValue: any,
      args: IAddWeapon & { id: number }
    ) => {
      const { data } = await axios.get(
        `http://localhost:3000/weapons/${args.id}`
      );

      if (!data) {
        return null;
      }

      const { data: allWeapons } = await axios.get(
        "http://localhost:3000/weapons"
      );

      return allWeapons;
    },

    deleteWeapon: async (parentValue: any, args: { id: number }) => {
      const { data } = await axios.get(
        `http://localhost:3000/weapons/${args.id}`
      );

      if (!data) return null;

      await axios.delete(`http://localhost:3000/weapons/${args.id}`);

      return data;
    },
  },
};
