import MeetUpList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";

import Head from "next/head";
// const Dummy_MEETUPS = [
//   {
//     id: "m1",
//     title: "A First Meet Up",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
//     address: "some address 5, 1234 city",
//     description: "this is a first meetup",
//   },
//   {
//     id: "m2",
//     title: "A Second Meet Up",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
//     address: "some address 5, 1234 city",
//     description: "this is a first meetup",
//   },
//   {
//     id: "m3",
//     title: "A Third Meet Up",
//     image:
//       "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
//     address: "some address 5, 1234 city",
//     description: "this is a first meetup",
//   },
// ];

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>React-Next-Meetups</title>
        <meta
          name="description"
          content="Browse a huge list of highly active React meetups"
        />
      </Head>
      <MeetUpList meetups={props.meetups} />
    </>
  );
};

export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://Sheynodeveloper7555:IuKzJypz9H8jmOKB@cluster0.ngfma5f.mongodb.net/meetups?retryWrites=true&w=majority"
  );
  //--------------------------------<< accessing to dataBase >>--------------------------------

  const db = client.db();
  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meet) => ({
        title: meet.title,
        image: meet.image,
        address: meet.address,
        id: meet._id.toString(),
        // description: meet.description,
      })),
    },
    revalidate: 1,
  };
}

// export async function getServerSideProps(context) {
//   const req = context.req;
//   const res = context.res;

//   return {
//     props: {
//       meetups: Dummy_MEETUPS,
//     },
//   };
// }
export default HomePage;
