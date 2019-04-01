const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios');

const typeDefs = gql`
    type Beer {
        id: Int
        name: String
        description: String
    }

    type Query {
        beers(limit: Int): [Beer]
    }
`;
const resolvers = {
    Query: {
        beers: async (parent, args) => {
            const { data } = await axios(
                `https://api.punkapi.com/v2/beers?beer_name=dog&page=1&per_page=${args.limit || 3}`
            );
            return data;
        }
    }
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen(3030).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
