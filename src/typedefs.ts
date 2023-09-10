export const typedefs = `
    type Query {
        heroes: [Hero]!
        weapons: [Weapon]
    }

    type Hero {
        id: Int!
        name: String!
        strength: String!
        weaponId: Int
        weaponDetails: Weapon
    }

    type Weapon {
        id: Int!
        name: String!
        damage: String!
    }

    type Mutation {
        addHero(name: String!, strength: String!, weaponId: Int): [Hero]
        updateHero(id: Int!, name: String!, strength: String!, weaponId: Int): [Hero]
        deleteHero(id: Int!): Hero

        addWeapon(name: String!, damage: String!): [Weapon]
        updateWeapon(id: Int!, name: String!, damage: String!): [Weapon]
        deleteWeapon(id: Int!): Weapon
    }
`;
