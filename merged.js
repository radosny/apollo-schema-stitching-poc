const { ApolloServer } = require('apollo-server');
const fetch = require('node-fetch');
const { HttpLink } = require('apollo-link-http');
const {
    introspectSchema,
    makeRemoteExecutableSchema,
    mergeSchemas,
    transformSchema,
    RenameTypes,
    RenameRootFields
} = require('graphql-tools');

const beerLink = new HttpLink({ uri: 'http://localhost:3030/', fetch });
const breweryLink = new HttpLink({ uri: 'http://localhost:3040/', fetch });

(async () => {
    const beerRemoteSchema = await introspectSchema(beerLink);
    const breweryRemoteSchema = await introspectSchema(breweryLink);

    const beerSchema = makeRemoteExecutableSchema({
        schema: beerRemoteSchema,
        link: beerLink
    });
    const brewerySchema = makeRemoteExecutableSchema({
        schema: breweryRemoteSchema,
        link: breweryLink
    });
    const transformedBrewerySchema = transformSchema(brewerySchema, [
        new RenameTypes(name => {
            if (name.includes('Beer')) {
                return name.replace('Beer', 'Brewery');
            }
            return name;
        }),
        new RenameRootFields((operation, fieldName) => {
            if (fieldName.includes('beer')) {
                return fieldName.replace('beer', 'brewery');
            }
            return fieldName;
        })
    ]);

    const schema = mergeSchemas({
        schemas: [beerSchema, transformedBrewerySchema]
    });

    const server = new ApolloServer({
        schema
    });

    const { url } = await server.listen(3000);
    console.log(`🚀  Server ready at ${url}`);
})();
