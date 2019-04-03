const { ApolloServer, gql } = require('apollo-server');
const axios = require('axios');

const typeDefs = gql`
    type Beer {
        id: Int
        name: String
        street: String
        country: String
        description: Description
    }

    type Description {
        short: String
        long: String
    }

    type Query {
        beers(limit: Int): [Beer]
    }
`;
const resolvers = {
    Query: {
        beers: async (parent, args) => {
            const { data } = await axios(
                `https://api.openbrewerydb.org/breweries/search?query=dog&page=1&per_page=${args.limit ||
                    3}`
            );
            return data;
        }
    },
    Beer: {
        description: async (parent, args) =>
            new Promise(resolve => {
                setTimeout(() => {
                    resolve({
                        short: 'Lorem ipsum',
                        long: 'Lorem ipsum dolor sit amet'
                    });
                }, 300);
            })
    }
};

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.listen(3040).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
