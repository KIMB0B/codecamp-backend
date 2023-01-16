import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

const port=3000

const typeDefs = `#graphql
  type BoardReturn {
    number: Int
    writer: String
    title: String
    contents: String
  }
  input CreateBoardInput{
    number: Int
    writer: String
    title: String
    contents: String
  }
  type Query {
    # fetchBoards: BoardReturn => 객체 1개를 의미
    fetchBoards: [BoardReturn] # => 배열로 된 객체 여러개를 의미
  }
  type Mutation {
    createBoard(writer: String, title: String, contents: String): String
    createBoard2(createBoardInput: CreateBoardInput): String
  }
`;

const resolvers = {
  Query: {
    fetchBoards: () => {
      // 1. 데이터를 조회하는 로직 => DB에 접속해서 데이터 꺼내오기
      const result = [
        { number: 1, writer: "철수", title: "철수 제목입니다~~", contents: "철수 내용@@" },
        { number: 1, writer: "영희", title: "영희 제목입니다~~", contents: "영희 내용@@" },
        { number: 1, writer: "훈이", title: "훈이 제목입니다~~", contents: "훈이 내용@@" },
      ]
      // 2. 꺼내온 결과 응답 주기
      return result
    }
  },

  Mutation: {
    createBoard: (_, args) => {
      // 1. 데이터를 등록하는 로직 => DB에 접속해서 데이터 저장하기
      console.log(args)

      // 2. 저장결과 알려주기!!
      return "등록에 성공하였습니다!!"
    },
    createBoard2: (_, args) => {
      // 1. 데이터를 등록하는 로깆 => DB에 접속해서 데이터 저장하기
      console.log(args)
  
      // 2. 저장결과 알려주기!!
      return "등록에 성공하였습니다!!"
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, { listen: { port: port } });
console.log(`🚀 Server ready at ${url}`);
