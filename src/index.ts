import { ApolloServer } from "@apollo/server";
import {startStandaloneServer} from '@apollo/server/standalone'

const typeDefs = `#graphql
    type Book {
        title: String!
        author: Author
    }

    type Author {
        name: String!
        books: [Book] # A list of Books
    }

    type Query {
        books: [Book]
    }
`;

const books = [
    {
      title: 'The Awakening',
      author: () => Author,
    },
    {
      title: 'City of Glass',
      author: () => Author2,
    },
];

const Author = {
    name:'Kate Chopin',
    books: [
        {
            title: 'The Awakening',
        },
        {
            title: 'The Awakening 2',
        }
    ]
}

const Author2 = {
    name:'Paul Auster',
    books: [
        {
            title: 'City of Glass',
        },
        {
            title: 'City of Glass -1',
        }
    ]
}

const resolvers = {
    Query: {
        books: () => books,
    },
};


const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }, 
})

console.log(`server ready at: ${url}`)


